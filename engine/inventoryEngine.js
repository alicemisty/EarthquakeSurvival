// engine/inventoryEngine.js
// ES Module — ใช้ร่วมกับ main.js, renderScenario.js ได้ 100%

export class InventoryEngine {

  constructor(maxCarryWeight) {
    this.maxCarryWeight = maxCarryWeight;

    // ไอเทมที่อยู่ในกระเป๋า (หน้า Bag)
    this.items = [];

    // ไอเทมที่ถูกเลือกในหน้า Gameplay
    this.selectedItem = null;
  }

  // -------------------------------------------------
  // น้ำหนักสูงสุด
  getMaxWeight() {
    return this.maxCarryWeight;
  }

  // -------------------------------------------------
  // น้ำหนักปัจจุบัน
  getCurrentWeight() {
    return parseFloat(
      this.items.reduce((sum, item) => sum + (item.weight || 0), 0).toFixed(1)
    );
  }

  // -------------------------------------------------
  getRemainingWeight() {
    return parseFloat(
      (this.getMaxWeight() - this.getCurrentWeight()).toFixed(1)
    );
  }

  // -------------------------------------------------
  canAddItem(itemData) {
    return this.getCurrentWeight() + (itemData.weight || 0) <= this.getMaxWeight();
  }

  // -------------------------------------------------
  // toggle add/remove (ใช้ในหน้า Bag)
  toggleItem(itemData) {
    const idx = this.items.findIndex(i => i.id === itemData.id);

    // REMOVE
    if (idx > -1) {
      this.items.splice(idx, 1);

      // ถ้าไอเทมที่ถูกลบคือไอเทมที่เลือกอยู่ → ยกเลิก selection
      if (this.selectedItem && this.selectedItem.id === itemData.id) {
        this.selectedItem = null;
      }

      return { action: "removed", success: true };
    }

    // ADD
    if (!this.canAddItem(itemData)) {
      return { action: "none", success: false, message: "❌ น้ำหนักกระเป๋าเกิน!" };
    }

    this.items.push({ ...itemData });
    return { action: "added", success: true };
  }

  // -------------------------------------------------
  hasItem(itemId) {
    return this.items.some(i => i.id === itemId);
  }

  // -------------------------------------------------
  getItem(itemId) {
    return this.items.find(i => i.id === itemId) || null;
  }

  // -------------------------------------------------
  getAllItems() {
    return [...this.items];
  }

  // -------------------------------------------------
  // ⭐⭐ ระบบเลือกไอเทมในหน้า Gameplay ⭐⭐
  selectItem(itemId) {
    const found = this.items.find(i => i.id === itemId);
    if (!found) return null;

    this.selectedItem = found;
    return found;
  }

  clearSelection() {
    this.selectedItem = null;
  }

  getSelectedItem() {
    return this.selectedItem;
  }

  // -------------------------------------------------
  // คะแนนความพร้อมก่อนเริ่มเกม
  calculatePreparednessScore() {
    let score = 0;
    const checkedTags = new Set();

    this.items.forEach(item => {
      const w = item.weight || 0;

      if (item.tags) {
        item.tags.forEach(tag => {
          if (!checkedTags.has(tag)) {
            if (tag === "direct")  score += 10;
            if (tag === "social")  score += 10;
            if (tag === "combo")   score += 10;
            if (tag === "clean")   score += 10;
            if (tag === "mental")  score += 10;
            checkedTags.add(tag);
          }
        });
      }

      // ของหนักเกิน 1.0 kg → หักคะแนน
      if (w > 1.0) score -= 3;
    });

    return Math.max(0, score);
  }

  // -------------------------------------------------
  // Pocket mode — คืนเฉพาะของเบามาก
  getPocketItems() {
    return this.items.filter(i => (i.weight || 0) <= 0.1);
  }
}
