// ui/renderInventory.js
// [FIX] ไม่ import player จาก data/player.js (ไฟล์นั้นไม่มี)
//       รับ inventory array และ scenario เป็น parameter แทน
// [FIX] showComboPreview และ applyGlowToItems เรียกจาก effects.js

import { showComboPreview, playSound } from "./effects.js";
import { checkCombo }                 from "../engine/comboEngine.js";

let _selectedItems = [];   // [{ id, ... }]
let _currentScenario = null;
let _onSelectionChange = null; // callback เมื่อ selection เปลี่ยน

// ==========================================
// เริ่มต้น render
// inventory = array ของ itemData objects
// scenario  = scenario object ปัจจุบัน (ใช้เช็ค glow)
// onSelectionChange = callback(selectedItems)
// ==========================================
export function renderInventory(inventory = [], scenario = null, onSelectionChange = null) {
  _currentScenario   = scenario;
  _onSelectionChange = onSelectionChange;
  _selectedItems     = [];

  const grid = document.getElementById("interactiveBagGrid");
  if (!grid) return;
  grid.innerHTML = "";

  updateWeightLabel(inventory);

  // Phone button (always present)
  const phoneBtn = createPhoneButton();
  grid.appendChild(phoneBtn);

  // Item buttons
  inventory.forEach(item => {
    const btn = createItemButton(item, scenario);
    grid.appendChild(btn);
  });
}

// ==========================================
// Phone button
// ==========================================
function createPhoneButton() {
  const btn = document.createElement("div");
  btn.className = "bag-item phone-special-btn";
  btn.dataset.id = "__phone__";
  btn.innerHTML = `
    <div class="bag-icon">📱</div>
    <div class="bag-name" style="color:#54a0ff;font-size:8px;">มือถือ</div>\n    <div class="bag-item-weight" style="font-size:8px;color:#9fd;">ประยุกต์</div>
  `;
  btn.addEventListener("click", () => toggleItemSelect({ id: "__phone__", nameTh: "มือถือ", weight: 0, tags: [] }, btn));
  return btn;
}

// ==========================================
// Item button
// ==========================================
function getUseTypeLabel(item) {
  const labels = { direct: "ใช้ตรง", adapt: "ประยุกต์", both: "ตรง/ประยุกต์" };
  return labels[item.useType] || "ประยุกต์";
}

function createItemButton(item, scenario) {
  const btn = document.createElement("div");
  btn.className = "bag-item";
  btn.dataset.id = item.id;

  btn.innerHTML = `
    <div class="bag-icon">${item.emoji || "🎒"}</div>
    <div class="bag-name">${item.nameTh || item.id}</div>
    <div class="bag-item-weight" style="font-size:8px;color:#888;">${item.weight}kg · ${getUseTypeLabel(item)}</div>
  `;


  btn.addEventListener("click", () => toggleItemSelect(item, btn));
  return btn;
}

// ==========================================
// Toggle select
// ==========================================
function toggleItemSelect(item, element) {
  const idx = _selectedItems.findIndex(s => s.id === item.id);

  if (idx > -1) {
    _selectedItems.splice(idx, 1);
    element.classList.remove("selected-item");
    playSound("./assets/sounds/unselect.mp3", 0.2);
  } else {
    _selectedItems.push(item);
    element.classList.add("selected-item");
    playSound("./assets/sounds/select.mp3", 0.2);
  }

  // ลบ combo-success เก่า
  document.querySelectorAll(".bag-item.combo-success").forEach(el => el.classList.remove("combo-success"));

  // เช็ค combo
  const combo = _currentScenario ? checkCombo(_currentScenario, _selectedItems) : { success: false };
  if (combo.success) {
    _selectedItems.forEach(si => {
    const el = document.querySelector(`[data-id="${CSS.escape(si.id)}"]`);
      if (el) el.classList.add("combo-success");
    });
  }
  showComboPreview(combo);

  if (_onSelectionChange) _onSelectionChange([..._selectedItems]);
}

// ==========================================
// Getters
// ==========================================
export function getSelectedItems() {
  return [..._selectedItems];
}

export function clearSelectedItems() {
  _selectedItems = [];
  document.querySelectorAll(".bag-item.selected-item, .bag-item.combo-success")
    .forEach(el => el.classList.remove("selected-item", "combo-success"));
  showComboPreview(null);
}

// ==========================================
// Update weight label
// ==========================================
function updateWeightLabel(inventory) {
  const total = inventory.reduce((s, i) => s + (i.weight || 0), 0);
  const lbl = document.getElementById("backWeightLabel");
  if (lbl) lbl.textContent = total.toFixed(1);
}
