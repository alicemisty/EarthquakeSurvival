// engine/inventoryEngine.js
// [FIX] ใช้ export class (ES Module) — ไม่มี module.exports
// [FIX] getCurrentWeight() และ addItem() คำนวณจาก weight ตรงๆ (inventory เก็บเป็น object จาก itemsData)

export class InventoryEngine {

  constructor(maxCarryWeight) {
    // [FIX] รับ maxCarryWeight ตรงๆ แทนการรับ player object เพื่อลด coupling
    this.maxCarryWeight = maxCarryWeight;
    // items = [{ id, nameTh, nameJp, category, weight, emoji, tags }]
    this.items = [];
  }

  // ------------------------------------------
  getMaxWeight() {
    return this.maxCarryWeight;
  }

  // ------------------------------------------
  getCurrentWeight() {
    return parseFloat(
      this.items.reduce((sum, item) => sum + (item.weight || 0), 0).toFixed(1)
    );
  }

  // ------------------------------------------
  getRemainingWeight() {
    return parseFloat(
      (this.getMaxWeight() - this.getCurrentWeight()).toFixed(1)
    );
  }

  // ------------------------------------------
  canAddItem(itemData) {
    return this.getCurrentWeight() + (itemData.weight || 0) <= this.getMaxWeight();
  }

  // ------------------------------------------
  // [FIX] toggle-style: เรียกครั้งเดียวเพื่อ add หรือ remove
  toggleItem(itemData) {
    const idx = this.items.findIndex(i => i.id === itemData.id);
    if (idx > -1) {
      this.items.splice(idx, 1);
      return { action: "removed", success: true };
    }
    if (!this.canAddItem(itemData)) {
      return { action: "none", success: false, message: "❌ น้ำหนักกระเป๋าเกิน!" };
    }
    this.items.push({ ...itemData });
    return { action: "added", success: true };
  }

  // ------------------------------------------
  hasItem(itemId) {
    return this.items.some(i => i.id === itemId);
  }

  // ------------------------------------------
  getItem(itemId) {
    return this.items.find(i => i.id === itemId) || null;
  }

  // ------------------------------------------
  getAllItems() {
    return [...this.items];
  }

  // ------------------------------------------
  // คะแนนความพร้อมก่อนเริ่มเกม
  calculatePreparednessScore() {
    let score = 0;
    this.items.forEach(item => {
      const w = item.weight || 0;
      if (item.tags?.includes("direct"))  score += 12;
      if (item.tags?.includes("social"))  score += 8;
      if (item.tags?.includes("combo"))   score += 6;
      if (item.tags?.includes("clean"))   score += 5;
      if (item.tags?.includes("mental"))  score += 4;
      // ลดคะแนนถ้าของหนักมาก
      if (w > 1.0) score -= 3;
    });
    return Math.max(0, score);
  }

  // ------------------------------------------
  // Pocket mode: คืนเฉพาะไอเทมน้ำหนักน้อยมาก
  getPocketItems() {
    return this.items.filter(i => (i.weight || 0) <= 0.1);
  }
}
