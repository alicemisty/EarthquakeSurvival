// engine/passiveEngine.js
// [FIX] export class (ES Module)
// [FIX] applyPassiveGlow() รับ scenario + inventory + job แล้วคืน itemIds ที่ควร glow
//       ไม่ตั้งใจ mutate DOM โดยตรง — ปล่อยให้ renderInventory.js จัดการ DOM

import { getGlowItems } from "./comboEngine.js";

export class PassiveEngine {

  constructor(player) {
    this.player = player;
  }

  // ==========================================
  // ใช้ passive ตอนเริ่มเกม (modify player object in-place)
  // ==========================================
  applyStartingPassive() {
    const p = this.player;

    switch (p.job) {

      case "fighter":
      case "boxer":
        p.maxHp            = 140;
        p.hp               = 140;
        p.maxMana          = 80;
        p.mana             = 80;
        p.thinkTime        = 12;
        p.hintCharges      = 0;
        p.damageReduction  = 0.15;
        p.stressResistance = 0.20;
        p.comboBonus       = 0;
        p.socialBonus      = 0;
        break;

      case "speaker":
        p.maxHp            = 100;
        p.hp               = 100;
        p.maxMana          = 140;
        p.mana             = 140;
        p.thinkTime        = 15;
        p.hintCharges      = 0;
        p.damageReduction  = 0;
        p.manaReduction    = 0.25;
        p.socialBonus      = 10;
        p.comboBonus       = 0;
        break;

      case "genius":
        p.maxHp               = 75;
        p.hp                  = 75;
        p.maxMana             = 100;
        p.mana                = 100;
        p.thinkTime           = 18;
        p.hintCharges         = 3;
        p.damageReduction     = 0;
        p.comboBonus          = 15;
        p.comboDetectChance   = 1;
        p.socialBonus         = 0;
        break;

      default:
        p.maxHp       = 100;
        p.hp          = 100;
        p.maxMana     = 100;
        p.mana        = 100;
        p.thinkTime   = 12;
        p.hintCharges = 0;
    }

    // แก้ตาม fitness
    if (p.exercise === "high") {
      p.hp     = Math.round(p.hp     * 1.20);
      p.maxHp  = Math.round(p.maxHp  * 1.20);
    } else if (p.exercise === "low") {
      p.hp     = Math.round(p.hp     * 0.80);
      p.maxHp  = Math.round(p.maxHp  * 0.80);
    }

    // แก้ตามอายุ
    if (p.age > 55) {
      p.hp    -= Math.round((p.age - 55) * 0.7);
      p.mana  += 15;
    } else if (p.age < 15) {
      p.hp   -= 15;
      p.mana -= 20;
    }

    // clamp
    p.hp    = Math.max(30, p.hp);
    p.mana  = Math.max(20, p.mana);
    p.maxHp = Math.max(30, p.maxHp);

    // carry weight = 20% of body weight
    p.maxCarryWeight = parseFloat((p.weight * 0.20).toFixed(1));
    p.phoneBattery   = 50;
    p.score          = 0;
    p.passiveLeft    = p.hintCharges;
  }

  // ==========================================
  // ลด HP damage ตาม passive
  // ==========================================
  reduceDamage(damage) {
    const r = this.player.damageReduction || 0;
    return Math.max(0, Math.floor(damage * (1 - r)));
  }

  // ==========================================
  // ลด Mana damage
  // ==========================================
  reduceManaDamage(manaDamage) {
    const r = this.player.manaReduction || 0;
    return Math.max(0, Math.floor(manaDamage * (1 - r)));
  }

  // ==========================================
  // [FIX] applyPassiveGlow — คืน array ของ itemId ที่ควรเรืองแสง
  // ==========================================
  getGlowItemIds(scenario, inventory = []) {
    const p = this.player;
    if (p.job !== "genius") return [];

    const ids = inventory.map(i => (typeof i === "string" ? i : i.id));
    const glowSet = new Set();

    // Genius Root should only reveal complete combo/adaptation recipes
    // that are valid for the current scenario and already possible with the bag.
    (scenario?.comboItems || []).forEach(recipe => {
      const canUseRecipe = recipe.every(id => ids.includes(id));
      if (canUseRecipe) recipe.forEach(id => glowSet.add(id));
    });

    return [...glowSet];
  }

  // ==========================================
  // ควรแสดง hint ไหม (เวลาน้อยกว่า 7 วิ)
  // ==========================================
  shouldShowHint() {
    return this.player.job === "genius" && this.player.hintCharges > 0;
  }

  consumeHint() {
    if (this.player.job !== "genius" || this.player.hintCharges <= 0) return false;
    this.player.hintCharges--;
    this.player.passiveLeft = this.player.hintCharges;
    return true;
  }

  // ==========================================
  // ฟื้น stat หลังช่วยคน
  // ==========================================
  rewardHelpingPeople() {
    const p = this.player;
    switch (p.job) {
      case "speaker": p.mana += 15; break;
      case "genius":  p.mana += 5;  break;
      case "fighter":
      case "boxer":   p.hp   += 5;  break;
    }
    p.hp   = Math.min(p.hp,   p.maxHp);
    p.mana = Math.min(p.mana, p.maxMana);
  }

  // ==========================================
  // stress / panic damage
  // ==========================================
  applyStressDamage(stressDamage) {
    const finalDmg = this.reduceManaDamage(stressDamage);
    this.player.mana -= finalDmg;
    this.player.mana  = Math.max(0, this.player.mana);
    return finalDmg;
  }

  // ==========================================
  // clamp HP & Mana
  // ==========================================
  clampStats() {
    const p = this.player;
    p.hp   = Math.max(0, Math.min(p.hp,   p.maxHp));
    p.mana = Math.max(0, Math.min(p.mana, p.maxMana));
  }
}
