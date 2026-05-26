// main.js  — ES Module entry point
// [FIX] ไฟล์เดิมที่อัพโหลดมาชื่อ main.js แต่เนื้อหาเป็น HTML
//       ไฟล์นี้คือ JavaScript controller จริงๆ

import { characterClasses }   from "./data/characters.js";
import { itemsData }           from "./data/items.js";
import { buildTimeline }       from "./engine/scenarioEngine.js";
import { InventoryEngine }     from "./engine/inventoryEngine.js";
import { PassiveEngine }       from "./engine/passiveEngine.js";
import { initScenarioRenderer, renderScenario } from "./ui/renderScenario.js";
import { switchScreen, updateStatusBar, updatePassiveBox } from "./ui/effects.js";

// ==========================================
// GLOBAL PLAYER STATE
// ==========================================
const player = {
  name:       "Hero",
  gender:     "male",
  age:        25,
  weight:     60,
  exercise:   "normal",
  job:        "fighter",
  hp:         100,
  maxHp:      100,
  mana:       100,
  maxMana:    100,
  thinkTime:  12,
  hintCharges: 0,
  passiveLeft: 1,
  score:      0,
  maxCarryWeight: 12,
  phoneBattery:   50,
  inventory:  [],       // array ของ itemData objects
  placement:  "",
  logs:       []
};

// ==========================================
// ENGINE INSTANCES
// ==========================================
let inventoryEngine = null;
let passiveEngine   = null;
let timeline        = [];
let currentStep     = 0;
let isGameOver      = false;

// ==========================================
// SCREEN 1 : LOGIN
// ==========================================

// class-card selection
document.querySelectorAll(".class-card").forEach(card => {
  card.addEventListener("click", () => {
    document.querySelectorAll(".class-card").forEach(c => c.classList.remove("selected"));
    card.classList.add("selected");
    player.job = card.dataset.class;
  });
});

document.getElementById("startBtn").addEventListener("click", () => {
  const nameVal = document.getElementById("playerName").value.trim();
  player.name     = nameVal || "Hero";
  player.gender   = document.getElementById("playerGender").value;
  player.age      = Number(document.getElementById("playerAge").value)    || 25;
  player.weight   = Number(document.getElementById("playerWeight").value) || 60;
  player.exercise = document.getElementById("exerciseLevel").value;

  // 🧮 สูตรคำนวณฐาน HP และ Mana ตามสรีรวิทยาและพฤติกรรม
  let baseHp = 100;
  let baseMana = 100;

  // 1. ส่งผลจาก พฤติกรรมการออกกำลังกาย (ส่งผลต่อความอึด HP ชัดเจนที่สุด)
  if (player.exercise === "athlete")   baseHp += 20; // นักกีฬา อึดพิเศษ
  if (player.exercise === "active")    baseHp += 10; // ออกกำลังกายสม่ำเสมอ
  if (player.exercise === "sedentary") baseHp -= 15; // ไม่ค่อยออกกำลังกาย ร่างกายอ่อนแอง่าย

  // 2. ส่งผลจาก อายุ (วัยรุ่น/ผู้ใหญ่ตอนต้นถึกทน, เด็กหรือผู้สูงอายุ HP น้อยลง แต่ผู้ใหญ่อาจมีสติ/Mana นิ่งกว่า)
  if (player.age < 15) {
    baseHp -= 10;
    baseMana -= 10; // เด็กเล็กอาจตื่นตระหนกง่าย
  } else if (player.age > 50) {
    baseHp -= 20;   // ผู้สูงอายุความจำกัดด้านร่างกาย
    baseMana += 15; // แต่มีวุฒิภาวะ/สติควบคุมอารมณ์ได้ดีกว่า
  }

  // 3. ส่งผลจาก เพศ (ดีไซน์ตามค่าเฉลี่ยสรีรวิทยาเชิงกายภาพและความไวต่อความเครียด)
  if (player.gender === "male") {
    baseHp += 5;    // มวลกล้ามเนื้อเฉลี่ย
  } else if (player.gender === "female") {
    baseMana += 5;  // เพศหญิงมีความละเอียดรอบคอบในการจัดการความเครียด
  }

  // นำค่าที่คำนวณได้ไปกำหนดให้ตัวละคร (ทั้งค่าปัจจุบันและค่าสูงสุด)
  player.maxHp   = baseHp;
  player.hp      = baseHp;
  player.maxMana = baseMana;
  player.mana    = baseMana;

  // Apply stats via PassiveEngine
  passiveEngine = new PassiveEngine(player);
  passiveEngine.applyStartingPassive();

  // Init inventory engine
  inventoryEngine = new InventoryEngine(player.maxCarryWeight);

  switchScreen("loginScreen", "statusScreen");
  renderStatusScreen();
});

// ==========================================
// SCREEN 2 : STATUS
// ==========================================
function renderStatusScreen() {
  const jobNames = { fighter: "นักมวย 🥊", boxer: "นักมวย 🥊", speaker: "นักพูด 📢", genius: "อัจฉริยะ 🧠" };
  document.getElementById("statusOutput").innerHTML = `
    <table style="width:100%; border-collapse:collapse; font-size:14px; line-height:2;">
      <tr><td>👤 ชื่อ</td><td><strong>${player.name}</strong></td></tr>
      <tr><td>⚔️ อาชีพ</td><td><strong>${jobNames[player.job] || player.job}</strong></td></tr>
      <tr><td>❤️ HP เริ่มต้น</td><td><strong>${player.hp} / ${player.maxHp}</strong></td></tr>
      <tr><td>🔮 Mana เริ่มต้น</td><td><strong>${player.mana} / ${player.maxMana}</strong></td></tr>
      <tr><td>🧠 genius root</td><td><strong>${player.job === "genius" ? `${player.hintCharges}/3 ครั้ง (genius root)` : "ไม่มี - เฉพาะอัจฉริยะเท่านั้น"}</strong></td></tr>
      <tr><td>🎒 แบกได้สูงสุด</td><td><strong>${player.maxCarryWeight} kg</strong></td></tr>
      <tr><td>📱 มือถือ</td><td><strong>ติดตัวเสมอ (🔋${player.phoneBattery}%)</strong></td></tr>
    </table>
  `;
}

document.getElementById("goBagBtn").addEventListener("click", () => {
  switchScreen("statusScreen", "bagScreen");
  renderBagScreen();
});

// ==========================================
// SCREEN 3 : BAG PACKING
// ==========================================
function renderBagScreen() {
  document.getElementById("maxWeight").textContent    = player.maxCarryWeight;
  document.getElementById("currentWeight").textContent = "0";
  renderItemGrid("all");
  renderInventoryList();
}

function renderItemGrid(category) {
  const grid = document.getElementById("itemGrid");
  grid.innerHTML = "";

  const items = Object.entries(itemsData)
    .filter(([, v]) => category === "all" || v.category === category)
    .map(([id, v]) => ({ id, ...v }));

  items.forEach(item => {
    const inBag = inventoryEngine.hasItem(item.id);
    const card  = document.createElement("div");
    card.className = `item-card ${inBag ? "added" : ""}`;
    card.innerHTML = `
      <h3>${item.emoji} ${item.nameJp}</h3>
      <p style="font-size:11px;margin:4px 0;color:#eee;line-height:1.3;">${item.nameTh}</p>
      <p class="weight-tag">⚖️ ${item.weight} kg</p>
      <p class="item-use-tag">${getItemUseLabel(item)}</p>
      <button>${inBag ? "REMOVE" : "ADD"}</button>
    `;
    card.querySelector("button").addEventListener("click", () => toggleBagItem(item));
    grid.appendChild(card);
  });
}

function getItemUseLabel(item) {
  const type = item.useType || "adapt";
  const labels = {
    direct: "ใช้ตรงสถานการณ์ / 直接使用",
    adapt: "ใช้ประยุกต์ / 応用",
    both: "ใช้ตรงหรือประยุกต์ / 直接・応用"
  };
  return labels[type] || labels.adapt;
}

function toggleBagItem(item) {
  const result = inventoryEngine.toggleItem(item);
  if (!result.success) { alert(result.message); return; }

  player.inventory = inventoryEngine.getAllItems();
  updateBagWeight();
  renderInventoryList();
  renderItemGrid(document.querySelector(".tab-btn.active").dataset.category);
}

function updateBagWeight() {
  const current = inventoryEngine.getCurrentWeight();
  const max     = player.maxCarryWeight;
  const display = document.getElementById("currentWeight");
  display.textContent  = current;
  display.style.color  = current > max ? "var(--danger)" : "var(--success)";

  const fill = document.getElementById("weightBarFill");
  if (fill) {
    const pct = Math.min(100, (current / max) * 100);
    fill.style.width           = `${pct}%`;
    fill.style.backgroundColor = current > max ? "var(--danger)" : "var(--success)";
  }
}

function renderInventoryList() {
  const list = document.getElementById("inventoryList");
  list.innerHTML = "";
  inventoryEngine.getAllItems().forEach(item => {
    const li = document.createElement("li");
    li.className = "inventory-item";
    li.innerHTML = `<span>${item.emoji} ${item.nameTh}</span><strong>${item.weight} kg</strong>`;
    li.addEventListener("click", () => toggleBagItem(item));
    list.appendChild(li);
  });
}

// Tab buttons
document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderItemGrid(btn.dataset.category);
  });
});

document.getElementById("finishBagBtn").addEventListener("click", () => {
  if (inventoryEngine.getAllItems().length === 0) {
    alert("❌ ใส่ของในเป้อย่างน้อย 1 ชิ้น!");
    return;
  }
  switchScreen("bagScreen", "placementScreen");
  renderPlacementScreen();
});

// ==========================================
// SCREEN 4 : PLACEMENT
// ==========================================
function renderPlacementScreen() {
  const container = document.getElementById("shuffledPlacementGrid");
  container.innerHTML = "";

  const choices = [
    { id: "door",     label: " ใกล้ประตูทางออกหลัก (Exit Door)",           bonus: 30, manaLoss: 0,  pocket: false },
    { id: "bedside",  label: " ข้างหัวเตียง / โต๊ะทำงาน (Bedside Area)",  bonus: 15, manaLoss: 15, pocket: false },
    { id: "underbed", label: " ใต้เตียงส่วนลึก / หลังตู้ (Under Bed)",    bonus: 0,  manaLoss: 20,  pocket: true  },
    { id: "closet",   label: " ในตู้เก็บของชั้นในสุด (Storage Closet)",    bonus: 0,  manaLoss: 25,  pocket: true  }
  ].sort(() => Math.random() - 0.5);

  choices.forEach(c => {
    const btn = document.createElement("button");
    btn.className = "choice-btn text-left";
    btn.textContent = c.label;
    btn.addEventListener("click", () => selectPlacement(c));
    container.appendChild(btn);
  });
}

function selectPlacement(choice) {
  player.placement = choice.id;
  player.score    += choice.bonus;

  if (choice.bonus > 0) {
    player.logs.push(`🏠 วางเป้ [${choice.id}] ถูกต้อง +${choice.bonus} คะแนน`);
  }

  if (choice.manaLoss > 0) {
    player.mana = Math.max(5, player.mana - choice.manaLoss);
    player.logs.push(`🏠 วางเป้ [${choice.id}] Mana -${choice.manaLoss}`);
  }

  if (choice.pocket) {
    // Pocket mode — เหลือแค่ของเล็ก
    const pocketItems = inventoryEngine.getPocketItems();
    player.inventory = pocketItems;
    player.logs.push("⚠️ เป้หลักโดนทับ — เข้า Pocket Mode เหลือของเล็ก" + (pocketItems.length ? ": " + pocketItems.map(i => i.nameTh).join(", ") : " (ไม่มีเลย)"));
  }

  // Build timeline
  timeline    = buildTimeline();
  currentStep = 0;
  isGameOver  = false;

  // Init renderer
  initScenarioRenderer(player, passiveEngine);

  switchScreen("placementScreen", "storyQuizScreen");
  startGameplay();
}

// ==========================================
// SCREEN 6 : GAMEPLAY
// ==========================================
function startGameplay() {
  nextStep();
}

function nextStep() {
  if (isGameOver || currentStep >= timeline.length) {
    finishGame();
    return;
  }

  const scenario = timeline[currentStep];
  document.getElementById("stepBadge").textContent = `${currentStep + 1} / ${timeline.length}`;

  // Weight penalty slab ต่อ step
  const current = inventoryEngine.getCurrentWeight();
  const over    = current - player.maxCarryWeight;
  if (over > 0 && !["underbed","closet"].includes(player.placement)) {
    const penalty = Math.ceil(over * 2);
    player.hp = Math.max(1, player.hp - penalty);
  }

  renderScenario(scenario, onScenarioDone);
}

function onScenarioDone(updatedPlayer, log, result) {
  player.logs.push(log);
  Object.assign(player, updatedPlayer);

  // Game over check
  if (player.hp <= 0 || player.mana <= 0) {
    isGameOver = true;
    finishGame();
    return;
  }

  currentStep++;
  nextStep();
}

// ==========================================
// SCREEN 7 : RESULT
// ==========================================
function finishGame() {
  switchScreen("storyQuizScreen", "resultScreen");

  // Bonus / penalties
  const hasWater = player.inventory.some(i => i.id === "water");
  const hasFood  = player.inventory.some(i => i.id === "high_cal" || i.id === "ready_eat");
  if (!hasWater) { player.score -= 25; player.logs.push("❌ ขาดน้ำดื่ม -25 คะแนน"); }
  if (!hasFood)  { player.score -= 15; player.logs.push("❌ ขาดอาหารฉุกเฉิน -15 คะแนน"); }
  if (["underbed","closet"].includes(player.placement)) {
    player.score -= 30;
    player.logs.push("❌ วางเป้ผิดตำแหน่ง -30 คะแนน");
  }

  // Rating
  let rating = "🏆 Survivor Master — รอดชีวิตอย่างยอดเยี่ยม!";
  let rColor  = "#2ed573";
  if (player.score < 300) { rating = "⚠️ Barely Survived — รอดแบบฉิวเฉียด"; rColor = "#ffa502"; }
  if (player.score < 100 || player.hp <= 0) { rating = "💀 Eliminated — ไม่รอด"; rColor = "#ff4757"; }

  document.getElementById("resultOutput").innerHTML = `
    <h3 style="color:${rColor}; font-size:20px; margin-bottom:10px;">${rating}</h3>
    <p style="color:#ccc;">คะแนนรวม: <strong style="color:#fff;">${player.score}</strong> คะแนน</p>
    <hr style="border-color:#333; margin:15px 0;">
    <p>
      👤 <strong>${player.name}</strong> &nbsp;|&nbsp;
      ❤️ HP: <strong>${player.hp}</strong> &nbsp;|&nbsp;
      🔮 Mana: <strong>${player.mana}</strong> &nbsp;|&nbsp;
      📱 Battery: <strong>${player.phoneBattery}%</strong>
    </p>
    <br>
    <h4 style="color:var(--accent);">📋 บันทึกเหตุการณ์</h4>
    <ul class="result-list" style="text-align:left; font-size:13px; line-height:1.7; color:#ddd; margin-top:10px;">
      ${player.logs.map(l => `<li>${l}</li>`).join("")}
    </ul>
  `;
}
