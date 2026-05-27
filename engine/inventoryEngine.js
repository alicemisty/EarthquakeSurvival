// engine/inventoryEngine.js
// ES Module — เวอร์ชันซ่อมแซมบัก ID Mismatch และระบบ Selection สมบูรณ์แบบ

export class InventoryEngine {
  constructor(maxCarryWeight) {
    this.maxCarryWeight = maxCarryWeight;
    this.items = [];
    this.selectedItem = null; // 🛠️ คืนค่าระบบจดจำไอเทมที่เลือก
  }

  getMaxWeight()     { return this.maxCarryWeight; }
  getCurrentWeight() {
    return parseFloat(this.items.reduce((s, i) => s + (i.weight || 0), 0).toFixed(1));
  }
  getRemainingWeight() {
    return parseFloat((this.getMaxWeight() - this.getCurrentWeight()).toFixed(1));
  }
  canAddItem(itemData) {
    return this.getCurrentWeight() + (itemData.weight || 0) <= this.getMaxWeight();
  }

  // toggle: add ถ้าไม่มี, remove ถ้ามีอยู่แล้ว
  toggleItem(itemData, itemKey) {
    const actualId = String(itemData.id || itemKey || "");
    const idx = this.items.findIndex(i => String(i.id) === actualId);
    
    // REMOVE
    if (idx > -1) {
      this.items.splice(idx, 1);
      // 🛠️ คืนค่าระบบเซฟตี้: ถ้าไอเทมที่ลบตรงกับที่เลือกอยู่ ให้ล้างสถานะเลือกด้วย
      if (this.selectedItem && String(this.selectedItem.id) === actualId) {
        this.selectedItem = null;
      }
      return { action: "removed", success: true };
    }
    
    // ADD
    if (!this.canAddItem(itemData)) {
      return { action: "none", success: false, message: "❌ น้ำหนักกระเป๋าเกิน!" };
    }
    this.items.push({ ...itemData, id: actualId });
    return { action: "added", success: true };
  }

  hasItem(itemId)  { return this.items.some(i => String(i.id) === String(itemId)); }
  getItem(itemId)  { return this.items.find(i => String(i.id) === String(itemId)) || null; }
  getAllItems()     { return [...this.items]; }
  getPocketItems() { return this.items.filter(i => (i.weight || 0) <= 0.1); }

  // 🛠️ คืนค่าและปรับปรุงระบบเลือกไอเทมให้เสถียร 100% ด้วย String()
  selectItem(itemId) {
    if (!itemId) return null;
    const found = this.items.find(i => String(i.id) === String(itemId));
    if (!found) return null;
    this.selectedItem = found;
    return found;
  }

  clearSelection()   { this.selectedItem = null; }
  getSelectedItem()  { return this.selectedItem; }

  calculatePreparednessScore() {
    let score = 0;
    const seen = new Set();
    this.items.forEach(item => {
      (item.tags || []).forEach(tag => {
        if (!seen.has(tag)) {
          seen.add(tag);
          if (["direct","social","combo","clean","mental"].includes(tag)) score += 10;
        }
      });
      if ((item.weight || 0) > 1.0) score -= 3;
    });
    return Math.max(0, score);
  }
}
