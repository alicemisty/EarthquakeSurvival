// ui/renderScenario.js
// [FIX] import paths ทั้งหมดถูกต้อง
// [FIX] applyPassiveGlow → passiveEngine.getGlowItemIds แล้ว effects.applyGlowToItems
// [FIX] ไม่ import useItem จาก inventoryEngine (ไอเทมไม่ถูก consume ระหว่างเกม)
// [FIX] checkCombo import จาก comboEngine ถูก path
// [BUG FIX] renderScenario รับ onSelectionChange callback ที่ 3 และส่งต่อให้ renderInventory
// [BUG FIX] ลบ setTimeout block ที่ใช้ .backpack-item-btn (ไม่มีอยู่จริง) ออก

import { calculateItemResult, calculateQuizResult, applyResultToPlayer, checkGameOver } from "../engine/scenarioEngine.js";
import { checkCombo, getBestCombo } from "../engine/comboEngine.js";
import {
  updateStatusBar, updatePassiveBox,
  applyGlowToItems, showComboPreview, flashScreen, shakeImage,
  showFeedbackPopup
} from "./effects.js";
import { renderInventory, getSelectedItems, clearSelectedItems } from "./renderInventory.js";

// ==========================================
// STATE
// ==========================================
let _player         = null;
let _passiveEngine  = null;
let _currentScenario = null;
let _onScenarioDone = null;   // callback(player, log)

// ==========================================
// INIT — เรียกครั้งเดียวก่อนเริ่ม gameplay
// ==========================================
export function initScenarioRenderer(player, passiveEngine) {
  _player        = player;
  _passiveEngine = passiveEngine;
}

// ==========================================
// Render scenario
// onDone(player, resultLog) = callback เมื่อ scenario จบ
// onSelectionChange(selectedItems) = callback เมื่อผู้เล่นเลือกไอเทม [BUG FIX: รับ argument ที่ 3]
// ==========================================
export function renderScenario(scenario, onDone, onSelectionChange) {
  _currentScenario = scenario;
  _onScenarioDone  = onDone;

  clearSelectedItems();
  // Text
  document.getElementById("storyTextJp").textContent = [scenario.jp, scenario.explainJp].filter(Boolean).join("\n\n");
  document.getElementById("storyTextTh").textContent = [scenario.th, scenario.explainTh].filter(Boolean).join("\n\n");
  document.getElementById("scenarioPhaseTag").textContent = `Phase ${scenario.phase}`;
  document.getElementById("atmosphereText").textContent = scenario.atmosphere || "⚠️ DANGER";

  // Image
  const img = document.getElementById("situationImage");
  if (img) img.src = scenario.image || "https://placehold.co/600x400/111/fff?text=Scene";

  // Shake ถ้า Phase 2
  if (scenario.phase === 2) shakeImage("pixelImageContainer");

  // Status
  updateStatusBar(_player);
  updatePassiveBox(_player);

  // [BUG FIX] ส่ง onSelectionChange callback ที่รับมาจาก main.js เข้าไปใน renderInventory
  // แทนที่จะส่ง no-op function เหมือนเดิม
  renderInventory(
    _player.inventory || [],
    scenario,
    (selected) => {
      // อัปเดต combo preview แบบ real-time
      const combo = scenario ? checkCombo(scenario, selected) : { success: false };
      showComboPreview(combo);

      // [BUG FIX] ส่งค่ากลับไปที่ main.js ผ่าน callback ถ้ามี
      if (typeof onSelectionChange === "function") {
        onSelectionChange(selected);
      }
    }
  );

  // Actions
  renderActions(scenario);

  // Clear old Genius Root glow. The skill is manual, never automatic.
  applyGlowToItems([]);
}

// ==========================================
// Render choices
// ==========================================
function renderActions(scenario) {
  const box = document.getElementById("actionChoices");
  if (!box) return;
  box.innerHTML = "";

  if (scenario.type === "quiz") {
    // Quiz choices
    (scenario.choices || []).forEach(choice => {
      const btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.textContent = [choice.text || choice.label || "", choice.textJp || ""].filter(Boolean).join(" / ");
      btn.addEventListener("click", () => handleQuizChoice(choice));
      box.appendChild(btn);
    });

  } else {
    if (_player.job === "genius") {
      const rootBtn = document.createElement("button");
      rootBtn.className = "genius-root-btn";
      rootBtn.type = "button";
      rootBtn.textContent = `🧠 genius root — เปิดคอมโบ (${_player.hintCharges}/3 ครั้ง)`;
      rootBtn.disabled = !_player.hintCharges || !(_currentScenario.comboItems || []).length;
      rootBtn.addEventListener("click", () => handleGeniusRoot(rootBtn));
      box.appendChild(rootBtn);
    }

    // Item-use: confirm button
    const confirmBtn = document.createElement("button");
    confirmBtn.className = "success-btn";
    confirmBtn.textContent = "⚡ ยืนยันการใช้ไอเทม / アイテムを使う";
    confirmBtn.addEventListener("click", () => handleItemConfirm());
    box.appendChild(confirmBtn);

    // Instruction
    const inst = document.getElementById("backpackInstruction");
    if (inst) inst.textContent = "โจทย์นี้ต้องเลือกไอเทมจากเป้: ไอเทมบางชิ้นใช้ตรงสถานการณ์ บางชิ้นใช้ประยุกต์ได้ / この問題は持ち物を選びます";
  }
}

// ==========================================
// Manual Genius Root skill
// ==========================================
function handleGeniusRoot(button) {
  if (!_player || _player.job !== "genius" || !_passiveEngine.shouldShowHint()) return;

  const glowIds = _passiveEngine.getGlowItemIds(_currentScenario, _player.inventory || []);
  if (!glowIds.length) {
    button.textContent = "🧠 genius root — ไม่มีคอมโบในกระเป๋า";
    button.disabled = true;
    return;
  }

  if (_passiveEngine.consumeHint()) {
    applyGlowToItems(glowIds);
    updateStatusBar(_player);
    updatePassiveBox(_player);
    button.textContent = `🧠 genius root — ไฮไลต์แล้ว (เหลือ ${_player.hintCharges}/3)`;
    button.disabled = true;
  }
}

// ==========================================
// Handle quiz choice
// ==========================================
function handleQuizChoice(choice) {
  const result = calculateQuizResult(choice);
  applyResultToPlayer(_player, result);
  _passiveEngine.clampStats();
  updateStatusBar(_player);
  updatePassiveBox(_player);

  const log = `[Phase ${_currentScenario.phase}] ${choice.text || ""} → ${result.result} (+${result.score} คะแนน) | ${result.explanationTh || ""} ${result.explanationJp || ""}`;

  const isCorrect = result.result !== "bad";
  if (!isCorrect) flashScreen("rgba(255,71,87,0.3)");

  const popupConfig = isCorrect
    ? {
        icon: "✅",
        title: "ถูกต้อง!",
        titleColor: "#4ade80",
        bodyTh: result.explanationTh || "การตัดสินใจถูกต้องและเหมาะสมกับสถานการณ์",
        bodyJp: result.explanationJp || "",
        score: result.score, hp: result.hp, mana: result.mana
      }
    : {
        icon: "❌",
        title: "ตอบผิด...",
        titleColor: "#fb7185",
        bodyTh: result.explanationTh || "การเลือกนี้ส่งผลเสียต่อสถานการณ์ ควรระวังในสถานการณ์จริง",
        bodyJp: result.explanationJp || "",
        score: result.score, hp: result.hp, mana: result.mana
      };

  showFeedbackPopup(popupConfig, () => {
    clearSelectedItems();
    showComboPreview(null);
    _onScenarioDone?.(_player, log, result);
  });
}

// ==========================================
// Handle item confirm
// ==========================================
function handleItemConfirm() {
  const selected    = getSelectedItems();
  const selectedIds = selected.map(i => i.id);
  const result      = calculateItemResult(_currentScenario, selectedIds);
  applyResultToPlayer(_player, result);
  _passiveEngine.clampStats();
  updateStatusBar(_player);
  updatePassiveBox(_player);

  const itemLabel = Array.isArray(result.item) ? result.item.join("+") : (result.item || "ไม่ได้เลือก");
  const log = `[Phase ${_currentScenario.phase}] ใช้: ${itemLabel} → ${result.tier} (${result.useType || "unknown"}) (+${result.score} คะแนน) | ${result.explanationTh || ""} ${result.explanationJp || ""}`;

  const comboInfo = result.tier === "combo" ? getBestCombo(selectedIds) : null;
  const popupConfig = _buildItemPopupConfig(result, comboInfo);

  if (!result.success) flashScreen("rgba(255,71,87,0.3)");
  else if (result.tier === "combo") flashScreen("rgba(84,160,255,0.3)");

  showFeedbackPopup(popupConfig, () => {
    clearSelectedItems();
    showComboPreview(null);
    _onScenarioDone?.(_player, log, result);
  });
}

function _buildItemPopupConfig(result, comboInfo) {
  if (result.tier === "combo") {
    const comboName = comboInfo?.resultName || "Combination";
    return {
      icon: "⚡",
      title: `COMBO! ${comboName}`,
      titleColor: "#60a5fa",
      bodyTh: comboInfo?.explanationTh || (comboInfo?.description ? `${comboInfo.description} — ` : "") + (result.explanationTh || "การผสมอุปกรณ์ร่วมกันให้ผลลัพธ์ดีกว่าใช้ชิ้นเดียว"),
      bodyJp: comboInfo?.explanationJp || result.explanationJp || "アイテムを組み合わせてより効果的に対応しました。",
      score: result.score, hp: result.hp, mana: result.mana
    };
  }
  if (result.tier === "perfect" && result.useType === "direct") {
    return {
      icon: "🎯",
      title: "ไอเทมตรงสถานการณ์!",
      titleColor: "#4ade80",
      bodyTh: result.explanationTh || "เลือกอุปกรณ์ที่ตรงกับสถานการณ์ได้อย่างถูกต้อง",
      bodyJp: result.explanationJp || "状況にぴったりの道具を正しく選びました。",
      score: result.score, hp: result.hp, mana: result.mana
    };
  }
  if (result.tier === "perfect") {
    return {
      icon: "✅",
      title: "ใช้ได้ดีมาก!",
      titleColor: "#4ade80",
      bodyTh: result.explanationTh || "เลือกและใช้ไอเทมได้อย่างมีประสิทธิภาพในสถานการณ์นี้",
      bodyJp: result.explanationJp || "この状況でアイテムを上手く活用しました。",
      score: result.score, hp: result.hp, mana: result.mana
    };
  }
  if (result.tier === "substitute") {
    return {
      icon: "👍",
      title: "ใช้แทนได้! (ไอเทมรอง)",
      titleColor: "#facc15",
      bodyTh: result.explanationTh || "ไอเทมนี้ใช้แทนของตรงได้ แต่มีความเสี่ยงหรือประสิทธิภาพน้อยกว่าเล็กน้อย",
      bodyJp: result.explanationJp || "代用品として使えますが、正規品より効果がやや劣ります。",
      score: result.score, hp: result.hp, mana: result.mana
    };
  }
  return {
    icon: "❌",
    title: "ไม่ถูกต้อง",
    titleColor: "#fb7185",
    bodyTh: result.explanationTh || "ไม่ได้ใช้ไอเทมที่เหมาะสมกับสถานการณ์ ยังมีความเสี่ยงอยู่",
    bodyJp: result.explanationJp || "状況に合ったアイテムを選んでいないため危険が残ります。",
    score: result.score, hp: result.hp, mana: result.mana
  };
}
