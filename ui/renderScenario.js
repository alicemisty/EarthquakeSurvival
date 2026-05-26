// ui/renderScenario.js
// [FIX] import paths ทั้งหมดถูกต้อง
// [FIX] applyPassiveGlow → passiveEngine.getGlowItemIds แล้ว effects.applyGlowToItems
// [FIX] ไม่ import useItem จาก inventoryEngine (ไอเทมไม่ถูก consume ระหว่างเกม)
// [FIX] checkCombo import จาก comboEngine ถูก path

import { calculateItemResult, calculateQuizResult, applyResultToPlayer, checkGameOver } from "../engine/scenarioEngine.js";
import { checkCombo }     from "../engine/comboEngine.js";
import {
  updateStatusBar, updatePassiveBox,
  applyGlowToItems, showComboPreview, flashScreen, shakeImage
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
// ==========================================
export function renderScenario(scenario, onDone) {
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

  // Render ของในเป้
  renderInventory(
    _player.inventory || [],
    scenario,
    (selected) => { /* real-time combo preview handled inside renderInventory */ }
  );
// ==========================================
// NEW: Enable item selection in gameplay
// ==========================================
setTimeout(() => {
  const buttons = document.querySelectorAll(".backpack-item-btn");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const itemId = btn.dataset.itemId;

      // 1) เลือกไอเทมใน inventoryEngine
      const selected = _player.inventoryEngine?.selectItem(itemId);

      // 2) ล้างสถานะเก่า
      buttons.forEach(b => b.classList.remove("selected-item"));

      // 3) ใส่สถานะใหม่
      btn.classList.add("selected-item");

      // 4) แสดงคอมโบแบบเรียลไทม์
      showComboPreview(selected);
    });
  });
}, 50);

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
      rootBtn.textContent = `🧠 genius root ใช้ดูคอมโบประยุกต์ (เหลือ ${_player.hintCharges}/3)`;
      rootBtn.disabled = !_player.hintCharges || !(scenario.comboItems || []).length;
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
    button.textContent = "🧠 genius root: ยังไม่มีชุดคอมโบที่ทำได้ในกระเป๋า";
    button.disabled = true;
    return;
  }

  if (_passiveEngine.consumeHint()) {
    applyGlowToItems(glowIds);
    updateStatusBar(_player);
    updatePassiveBox(_player);
    button.textContent = `🧠 genius root เปิดคอมโบแล้ว (เหลือ ${_player.hintCharges}/3)`;
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

  const log = `[Phase ${_currentScenario.phase}] ${choice.text || ""} → ${result.result} (+${result.score} คะแนน) | ${result.explanationTh || ""} ${result.explanationJp || ""}`;

  if (result.result === "bad") {
    flashScreen("rgba(255,71,87,0.3)");
  }

  finishStep(result, log);
}

// ==========================================
// Handle item confirm
// ==========================================
function handleItemConfirm() {
    const selected     = getSelectedItems();
  const selectedIds  = selected.map(i => i.id);
  const result       = calculateItemResult(_currentScenario, selectedIds);
  applyResultToPlayer(_player, result);
  _passiveEngine.clampStats();

  const itemLabel = Array.isArray(result.item) ? result.item.join("+") : (result.item || "ไม่ได้เลือก");
  const log = `[Phase ${_currentScenario.phase}] ใช้: ${itemLabel} → ${result.tier} (${result.useType || "unknown"}) (+${result.score} คะแนน) | ${result.explanationTh || ""} ${result.explanationJp || ""}`;

  if (!result.success) {
    flashScreen("rgba(255,71,87,0.3)");
  } else if (result.tier === "combo") {
    flashScreen("rgba(84,160,255,0.3)");
  }

  finishStep(result, log);
}

// ==========================================
// Finish step
// ==========================================
function finishStep(result, log) {
  updateStatusBar(_player);
  updatePassiveBox(_player);
  clearSelectedItems();
  showComboPreview(null);

  setTimeout(() => {
    if (_onScenarioDone) _onScenarioDone(_player, log, result);
  }, 800);
}

