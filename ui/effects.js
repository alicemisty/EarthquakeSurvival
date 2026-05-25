// ui/effects.js
// [FIX] ไฟล์เดิมว่างเปล่า — เพิ่ม functions ที่ renderScenario.js / main.js เรียกใช้

// ==========================================
// Screen Transition
// ==========================================
export function switchScreen(hideId, showId) {
  const hide = document.getElementById(hideId);
  const show = document.getElementById(showId);
  if (hide) hide.classList.remove("active");
  if (show) show.classList.add("active");
}

// ==========================================
// Image Shake Effect
// ==========================================
export function shakeImage(imgElementId = "pixelImageContainer") {
  const el = document.getElementById(imgElementId);
  if (!el) return;
  el.classList.add("image-shake-effect");
  setTimeout(() => el.classList.remove("image-shake-effect"), 600);
}

// ==========================================
// Flash overlay (screen flicker)
// ==========================================
export function flashScreen(color = "rgba(255,71,87,0.25)", durationMs = 300) {
  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position:fixed; top:0; left:0; width:100%; height:100%;
    background:${color}; pointer-events:none; z-index:9999;
    animation:none; transition:opacity ${durationMs}ms ease;
  `;
  document.body.appendChild(overlay);
  requestAnimationFrame(() => {
    overlay.style.opacity = "0";
    setTimeout(() => overlay.remove(), durationMs + 50);
  });
}

// ==========================================
// Update live status bar
// ==========================================
export function updateStatusBar(player) {
  const bar = document.getElementById("liveStatusBar");
  if (!bar) return;
  const hpColor   = player.hp   < 30 ? "#ff4757" : "#2ed573";
  const manaColor = player.mana < 30 ? "#ff9f43" : "#54a0ff";
  bar.innerHTML = `
    <span style="color:${hpColor}">❤️ HP: ${player.hp}/${player.maxHp}</span>
    &nbsp;|&nbsp;
    <span style="color:${manaColor}">🔮 Mana: ${player.mana}/${player.maxMana}</span>
    ${player.job === "genius" ? `&nbsp;|&nbsp; ✨ Genius Root: ${player.hintCharges}` : ""}
  `;
}

// ==========================================
// Update passive info box
// ==========================================
export function updatePassiveBox(player) {
  const box = document.getElementById("passiveInfo");
  if (!box) return;
  const jobLabel = { fighter: "🥊 นักมวย", boxer: "🥊 นักมวย", speaker: "📢 นักพูด", genius: "🧠 อัจฉริยะ" };
  box.textContent = player.job === "genius" ? `✨ ${jobLabel[player.job] || player.job} — genius root เหลือ ${player.hintCharges}/3` : `${jobLabel[player.job] || player.job} — ไม่มี genius root`;
}

// ==========================================
// Glow items in backpack grid
// ==========================================
export function applyGlowToItems(glowIds = []) {
  document.querySelectorAll(".bag-item.recommended-item, .bag-item.genius-root-item")
    .forEach(el => el.classList.remove("recommended-item", "genius-root-item"));

  glowIds.forEach(id => {
    const el = document.querySelector(`[data-id="${id}"]`);
    if (el) el.classList.add("genius-root-item");
  });
}

// ==========================================
// Show combo preview
// ==========================================
export function showComboPreview(combo) {
  const box = document.getElementById("comboPreview");
  if (!box) return;
  if (!combo || !combo.success) {
    box.textContent = "⚡ COMBO WAITING...";
    box.style.color = "";
    return;
  }
  box.innerHTML = `⚡ COMBO: <strong>${combo.resultName}</strong> (+${combo.scoreBonus} คะแนน)`;
  box.style.color = "#54a0ff";
}

// ==========================================
// Sound (graceful — no crash if file missing)
// ==========================================
export function playSound(src, volume = 0.3) {
  try {
    const a = new Audio(src);
    a.volume = volume;
    a.play().catch(() => {});
  } catch (_) {}
}
