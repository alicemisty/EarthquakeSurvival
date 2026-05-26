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
 // คะแนนความพร้อมก่อนเริ่มเกม (นับตามความหลากหลายของหมวดหมู่)
  calculatePreparednessScore() {
    let score = 0;
    
    // ใช้ Set เพื่อล็อกว่าแท็กแต่ละหมวดหมู่จะให้คะแนนแค่ "ครั้งแรกครั้งเดียว"
    const checkedTags = new Set();

    this.items.forEach(item => {
      const w = item.weight || 0;
      
      if (item.tags) {
        item.tags.forEach(tag => {
          // ถ้าเป็นแท็กหมวดหมู่ที่นักเรียนยังไม่เคยหยิบเลย ให้คะแนนทันที
          if (!checkedTags.has(tag)) {
            if (tag === "direct")  score += 10; // มีอุปกรณ์หลัก (เช่น ไฟฉาย/นกหวีด) เอาไป 10 คะแนน
            if (tag === "social")  score += 10; // มีอุปกรณ์ช่วยผู้อื่น/ปฐมพยาบาล เอาไป 10 คะแนน
            if (tag === "combo")   score += 10; // มีอุปกรณ์สายประยุกต์ เอาไป 10 คะแนน
            if (tag === "clean")   score += 10; // มีอุปกรณ์สุขอนามัย เอาไป 10 คะแนน
            if (tag === "mental")  score += 10; // มีอาหาร/ของบำรุงขวัญ เอาไป 10 คะแนน
            
            // บันทึกไว้ว่าได้คะแนนจากหมวดนี้ไปแล้ว ชิ้นต่อไปในหมวดเดิมจะไม่บวกเพิ่มอีก
            checkedTags.add(tag); 
          }
        });
      }

      // 🎒 บทลงโทษส่วนตัว: ถ้าหยิบของชิ้นใหญ่เกิน 1.0 kg มา (เช่น ถังน้ำใหญ่) จะโดนหักความคล่องตัว ชิ้นละ 3 คะแนน
      if (w > 1.0) score -= 3;
    });

    // คะแนนเต็มสูงสุดจะเป็น 50 คะแนนพอดี (5 หมวดหมู่ x 10 คะแนน) และไม่ต่ำกว่า 0
    return Math.max(0, score);
  }

  // ------------------------------------------
  // Pocket mode: คืนเฉพาะไอเทมน้ำหนักน้อยมาก
  getPocketItems() {
    return this.items.filter(i => (i.weight || 0) <= 0.1);
  }
}


