// engine/scenarioEngine.js
// [FIX] import path "../data/scenarios.js" (relative ถูกต้อง)
// [FIX] isGameOver → checkGameOver เพื่อไม่ชนกับ global variable ชื่อเดิม
// [FIX] applyResultToPlayer clamps ด้วย maxHp / maxMana

import { scenarios } from "../data/scenarios.js";

// ==========================================
// STATE
// ==========================================
let usedScenarioIds = [];

// ==========================================
// ดึง scenario ตาม phase
// ==========================================
export function getScenariosByPhase(phase) {
  return scenarios.filter(s => s.phase === phase);
}

// ==========================================
// สุ่ม scenario ไม่ซ้ำ
// ==========================================
export function getRandomScenario(phase) {
  const phaseScenarios = getScenariosByPhase(phase);
  let available = phaseScenarios.filter(s => !usedScenarioIds.includes(s.id));

  if (!available.length) {
    resetUsedScenarios();
    available = phaseScenarios;
  }

  const selected = available[Math.floor(Math.random() * available.length)];
  usedScenarioIds.push(selected.id);
  return selected;
}

export function resetUsedScenarios() {
  usedScenarioIds = [];
}

// ==========================================
// สร้าง timeline 10 scenarios (Phase 2–5)
// ==========================================
export function buildTimeline() {
  resetUsedScenarios();
  const p2 = pickRandom(getScenariosByPhase(2), 3);
  const p3 = pickRandom(getScenariosByPhase(3), 3);
  const p4 = pickRandom(getScenariosByPhase(4), 2);
  const p5 = pickRandom(getScenariosByPhase(5), 2);
  return [...p2, ...p3, ...p4, ...p5];
}

function pickRandom(arr, n) {
  return [...arr].sort(() => Math.random() - 0.5).slice(0, Math.min(n, arr.length));
}

// ==========================================
// คำนวณผลลัพธ์การใช้ไอเทม
// selectedItemIds = [string, ...]
// ==========================================
export function calculateItemResult(scenario, selectedItemIds = []) {

  if (!selectedItemIds.length) return getDefaultPenalty("timeout");

  // Perfect item
  if (scenario.scoring) {
    for (const id of selectedItemIds) {
      if (scenario.scoring[id]) {
        return { success: true, tier: "perfect", item: id, useType: scenario.scoring[id].useType || "direct", explanationTh: scenario.scoring[id].explanationTh || scenario.explainTh || "", explanationJp: scenario.scoring[id].explanationJp || scenario.explainJp || "", ...scenario.scoring[id] };
      }
    }
  }

  // Core item (ไม่มี scoring แต่มี coreItems)
  if (scenario.coreItems) {
    for (const id of selectedItemIds) {
      if (scenario.coreItems.includes(id)) {
        return { success: true, tier: "perfect", item: id, score: 35, hp: 0, mana: 5, useType: "direct", explanationTh: scenario.explainTh || "เลือกอุปกรณ์ตรงกับสถานการณ์", explanationJp: scenario.explainJp || "状況に合う道具を選びました。" };
      }
    }
  }

  // Combo
  if (scenario.comboItems) {
    for (const recipe of scenario.comboItems) {
      if (recipe.every(id => selectedItemIds.includes(id))) {
        return { success: true, tier: "combo", item: recipe, score: 28, hp: 0, mana: 8, combo: true, useType: "adapt", explanationTh: scenario.explainTh || "ประยุกต์ไอเทมร่วมกันได้เหมาะสม", explanationJp: scenario.explainJp || "道具を組み合わせて応用しました。" };
      }
    }
  }

  // Substitute
  if (scenario.substituteItems) {
    for (const id of selectedItemIds) {
      if (scenario.substituteItems.includes(id)) {
        return { success: true, tier: "substitute", item: id, score: 18, hp: -5, mana: 0, useType: "adapt", explanationTh: scenario.explainTh || "ใช้ไอเทมแทนได้ แต่ยังมีความเสี่ยงกว่าของตรง", explanationJp: scenario.explainJp || "代用品なので少しリスクがあります。" };
      }
    }
  }

  return getDefaultPenalty("wrong_item");
}

// ==========================================
// Quiz result
// ==========================================
export function calculateQuizResult(choice) {
  return {
    score: choice.score || 0,
    hp:    choice.hp    || 0,
    mana:  choice.mana  || 0,
    result: choice.result || "bad",
    explanationTh: choice.explanationTh || "",
    explanationJp: choice.explanationJp || ""
  };
}

// ==========================================
// Default penalty
// ==========================================
function getDefaultPenalty(reason = "fail") {
  return { success: false, tier: "fail", reason, score: 0, hp: -15, mana: -10, useType: "wrong", explanationTh: "เลือกไอเทมไม่ตรงสถานการณ์หรือไม่ได้เลือกไอเทม จึงยังมีความเสี่ยง", explanationJp: "状況に合わない、または未選択のため危険が残ります。" };
}

// ==========================================
// Hint system
// ==========================================
export function getEmergencyHint(scenario, hintCharges) {
  if (hintCharges <= 0) return [];
  const hints = new Set();
  if (scenario.coreItems)      scenario.coreItems.forEach(id => hints.add(id));
  if (scenario.substituteItems) scenario.substituteItems.forEach(id => hints.add(id));
  if (scenario.comboItems)      scenario.comboItems.forEach(r => r.forEach(id => hints.add(id)));
  return [...hints];
}

// ==========================================
// Timer / think time
// ==========================================
export function getThinkingTime(job) {
  return { fighter: 12, boxer: 12, speaker: 15, genius: 18 }[job] || 12;
}

// ==========================================
// Weight helpers
// ==========================================
export function getMaxCarryWeight(weightKg) {
  return parseFloat((weightKg * 0.20).toFixed(1));
}

export function isOverweight(current, max) {
  return current > max;
}

// ==========================================
// Apply result to player (with clamp)
// ==========================================
export function applyResultToPlayer(player, result) {
  player.hp    += result.hp    || 0;
  player.mana  += result.mana  || 0;
  player.score += result.score || 0;

  // [FIX] clamp ต้องใช้ maxHp / maxMana ไม่ใช่ค่า hardcode 100
  player.hp   = Math.max(0, Math.min(player.hp,   player.maxHp   || 100));
  player.mana = Math.max(0, Math.min(player.mana, player.maxMana || 100));

  return player;
}

// ==========================================
// [FIX] checkGameOver แทน isGameOver เพื่อหลีกเลี่ยงชื่อชนกับ main.js
// ==========================================
export function checkGameOver(player) {
  return player.hp <= 0 || player.mana <= 0;
}
