// engine/inventoryEngine.js
// ES Module — เวอร์ชันซ่อมแซมบัก ID Mismatch เรียบร้อยครับคุณครู

export class InventoryEngine {

  constructor(maxCarryWeight) {
    this.maxCarryWeight = maxCarryWeight;
    this.items = [];
    this.selectedItem = null;
  }

  getMaxWeight() { return this.maxCarryWeight; }

  getCurrentWeight() {
    return parseFloat(
      this.items.reduce((sum, item) => sum + (item.weight || 0), 0).toFixed(1)
    );
  }

  getRemainingWeight() {
    return parseFloat(
      (this.getMaxWeight() - this.getCurrentWeight()).toFixed(1)
    );
  }

  canAddItem(itemData) {
    return this.getCurrentWeight() + (itemData.weight || 0) <= this.getMaxWeight();
  }

  // -------------------------------------------------
  // 🛠️ แก้ไขจุดนี้: ให้รองรับการตรวจสอบกรณี item ไม่มี property .id ตรงๆ
  toggleItem(itemData, itemKey) {
    // ใช้ itemKey (คีย์หลักจาก items.js เช่น 'amulet') เป็น ID สำรองถ้าไม่มี itemData.id
    const actualId = itemData.id || itemKey; 
    
    const idx = this.items.findIndex(i => i.id === actualId);

    // REMOVE
    if (idx > -1) {
      this.items.splice(idx, 1);
      if (this.selectedItem && this.selectedItem.id === actualId) {
        this.selectedItem = null;
      }
      return { action: "removed", success: true };
    }

    // ADD
    if (!this.canAddItem(itemData)) {
      return { action: "none", success: false, message: "❌ น้ำหนักกระเป๋าเกิน!" };
    }

    // แอบฝัง id ลงไปในแอบเจกต์ตอนเซฟเข้ากระเป๋าเพื่อป้องกันบั๊กระยะยาว
    this.items.push({ ...itemData, id: actualId });
    return { action: "added", success: true };
  }

  // -------------------------------------------------
  // 🛠️ แก้ไขจุดนี้: เช็คได้ทั้งจาก ID และคีย์ธรรมดา
  hasItem(itemId) {
    return this.items.some(i => i.id === itemId);
  }

  getItem(itemId) {
    return this.items.find(i => i.id === itemId) || null;
  }

  getAllItems() {
    return [...this.items];
  }

  selectItem(itemId) {
    const found = this.items.find(i => i.id === itemId);
    if (!found) return null;

    this.selectedItem = found;
    return found;
  }

  clearSelection() { this.selectedItem = null; }
  getSelectedItem() { return this.selectedItem; }

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
      if (w > 1.0) score -= 3;
    });

    return Math.max(0, score);
  }

  getPocketItems() {
    return this.items.filter(i => (i.weight || 0) <= 0.1);
  }
}
