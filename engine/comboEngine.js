// engine/comboEngine.js
// [FIX] ลบไอเทม abstract ที่ไม่มีใน itemsData (2_people, pipe, chair, jacket, board, cloth, toy, talk)
// [FIX] ใช้ export function ทุกตัว (ES Module)
// [FIX] checkCombo() เพิ่มเพื่อให้ renderScenario.js เรียกได้โดยตรง

// ==========================================
// COMBO DATABASE — item IDs ต้องตรงกับ itemsData
// ==========================================
export const comboDatabase = [

  // AIR / DUST / SMOKE
  { id: "wet_towel_mask",   items: ["towel",    "water"],       tags: ["dust","smoke","gas"],  scoreBonus: 10, resultName: "Wet Towel Mask",        description: "ผ้าชุบน้ำปิดปาก" },
  { id: "wet_clothes_mask", items: ["clothes",  "water"],       tags: ["dust","smoke"],        scoreBonus: 6,  resultName: "Cloth Mask",             description: "เสื้อชุบน้ำกรองฝุ่น" },
  { id: "foil_dust_seal",   items: ["blanket",  "tape"],        tags: ["dust"],                scoreBonus: 7,  resultName: "Foil Dust Seal",         description: "ผ้าห่มฟอยล์+เทป" },
  { id: "tissue_filter",    items: ["tissues",  "water"],       tags: ["dust","smoke"],        scoreBonus: 4,  resultName: "Tissue Filter",          description: "ทิชชู่เปียกกรองฝุ่น" },

  // FIRST AID
  { id: "towel_bandage",    items: ["towel",    "tape"],        tags: ["injury","medical"],    scoreBonus: 12, resultName: "Emergency Bandage",      description: "ผ้าขนหนู+เทป" },
  { id: "clothes_sling",    items: ["clothes",  "rope"],        tags: ["injury","medical"],    scoreBonus: 8,  resultName: "Arm Sling",              description: "เสื้อ+เชือกพยุง" },
  { id: "book_splint",      items: ["book",     "tape"],        tags: ["injury","medical"],    scoreBonus: 14, resultName: "Book Splint",            description: "หนังสือหนา+เทป" },
  { id: "textbook_splint",      items: ["japanese_textbook",     "tape"],        tags: ["injury","medical"],    scoreBonus: 14, resultName: "Book Splint2",            description: "หนังสือเรียน+เทป" },
  { id: "map_leg_support",  items: ["paper_map","rope"],        tags: ["injury","medical"],    scoreBonus: 10, resultName: "Map Leg Support",        description: "ม้วนแผนที่+เชือก" },
  { id: "book_splint2",  items: ["book","towel"],        tags: ["injury","medical"],    scoreBonus: 14, resultName: "Improvised Splint",        description: "เฝือกชั่วคราว" },

  // LIGHT
  { id: "phone_powerbank",  items: ["powerbank","flashlight"],  tags: ["dark","blackout"],     scoreBonus: 15, resultName: "Extended Flashlight",    description: "พาวเวอร์แบงก์+ไฟ" },
  { id: "lantern_diy",      items: ["flashlight","water"],      tags: ["dark","blackout"],     scoreBonus: 8,  resultName: "DIY Lantern",            description: "ขวดน้ำกระจายแสง" },
  { id: "lantern_diy2",    items: ["flashlight","water_bottle"],      tags: ["dark","blackout"],     scoreBonus: 8,  resultName: "DIY Lantern2",            description: "ขวดน้ำกระจายแสง2" },
  { id: "reflector_spotlight",  items: ["flashlight","foil"],      tags: ["dark","blackout"],     scoreBonus: 8,  resultName: "Reflector Spotlight",     description: "โคมสะท้อนแสง" },
  { id: "tissue_torch",     items: ["lighter",  "tissues"],     tags: ["dark"],                scoreBonus: 3,  resultName: "Tissue Torch",           description: "คบเพลิงทิชชู่" },

  // WEATHER
  { id: "trashbag_rain",    items: ["trash_bag","tape"],        tags: ["rain","cold"],         scoreBonus: 14, resultName: "DIY Raincoat",           description: "ถุงขยะ+เทปทำเสื้อ" },
  { id: "foil_body_wrap",   items: ["blanket",  "rope"],        tags: ["cold"],                scoreBonus: 10, resultName: "Foil Body Wrap",         description: "ผ้าห่มฟอยล์มัด" },
  { id: "paper_insulation", items: ["paper_map","tape"],        tags: ["cold"],                scoreBonus: 6,  resultName: "Paper Insulation",       description: "กระดาษบุชั้น" },

  // RESCUE / CLEARING
  { id: "rope_crowbar_pull",items: ["rope",     "crowbar"],     tags: ["heavy_object","rescue"],scoreBonus: 18, resultName: "Lever & Rope Rescue",   description: "เชือก+ชะแลงงัด" },
  { id: "crowbar_pliers",   items: ["crowbar",  "pliers"],      tags: ["heavy_object","rescue"],scoreBonus: 16, resultName: "Lever System",          description: "ชะแลง+คีมเบ็ด" },
  { id: "rope_heavy_pull",  items: ["rope",     "extinguisher"],tags: ["heavy_object"],        scoreBonus: 8,  resultName: "Weight & Rope Pull",     description: "เชือก+ถังหนัก" },

  // CROWD / SIGNAL
  { id: "flashlight_wipes", items: ["flashlight","wipes"],      tags: ["crowd","signal"],      scoreBonus: 9,  resultName: "Signal Baton",           description: "ผ้าคลุมไฟฉายส่ง" },
  { id: "cash_flashlight",  items: ["cash",     "ready_eat"],  tags: ["crowd","signal"],      scoreBonus: 6,  resultName: "Noise Maker",            description: "กระป๋องเหรียญ" },
  { id: "cash_flashlight2",  items: ["cash",     "water_bottle"],  tags: ["crowd","signal"],      scoreBonus: 6,  resultName: "Noise Maker",            description: "ขวดมีเหรียญ" },
  { id: "notepad_docs",     items: ["notepad",  "docs"],        tags: ["crowd","signal"],      scoreBonus: 8, resultName: "Emergency Sign Board",   description: "สมุด+เอกสาร" },
  { id: "sos_signal",     items: ["whistle",  "flashlight"],        tags: ["crowd","signal"],      scoreBonus: 12, resultName: "SOS Signal Duo",   description: "ส่งสัญญาณทั้ง" },
  { id: "notepad_docs2",     items: ["marker_pen",  "notepad"],        tags: ["crowd","signal"],      scoreBonus: 10, resultName: "Emergency Sign Board",   description: "เขียนข้อความ" },
  
  // HYGIENE / WATER
  { id: "water_towel_filter",items: ["water",   "towel"],       tags: ["hygiene","water"],     scoreBonus: 7,  resultName: "Water Filter",           description: "ผ้าขนหนูกรอง" },
  { id: "gel_towel_hygiene", items: ["hand_gel","towel"],       tags: ["hygiene"],             scoreBonus: 9,  resultName: "Body Hygiene Kit",       description: "เจลแอลกอฮอล์+" },
  { id: "bag_wrap_collector",items: ["trash_bag","wrap"],       tags: ["water","hygiene"],     scoreBonus: 10, resultName: "Rain Collector",         description: "ถุงขยะ+พลาสติก" },

  // MENTAL
  { id: "blanket_comfort",  items: ["blanket",  "candy"],       tags: ["panic","stress","mental"],scoreBonus: 12, resultName: "Comfort Kit",         description: "ผ้าห่มอบอุ่น" },
  { id: "calming_kit",  items: ["common_med",  "candy"],       tags: ["panic","stress","mental"],scoreBonus: 12, resultName: "Calming Kit",         description: "ชุดลดความตื่น" },
  { id: "booster_pack",  items: ["coffee",  "ready_eat"],       tags: ["panic","stress","mental"],scoreBonus: 15, resultName: "Booster Pack",         description: "ชุดเสบียงบำรุง" },
  { id: "notepad_family",   items: ["notepad",  "family_photo"],tags: ["mental","stress"],     scoreBonus: 14, resultName: "Memory Support",         description: "เขียนสมุด+ดูรูป" },
  { id: "easter_eggs",   items: ["sensei_photo",  "japanese_textbook"],tags: ["mental","stress"],     scoreBonus: 20, resultName: "The Sensei Easter Eggs",         description: "สองเซนเซส" }
];

// ==========================================
// ค้นหา combo ที่ match กับ selectedItems
// selectedItems = array ของ item id (string)
// ==========================================
export function findMatchingCombos(selectedItems = []) {
  return comboDatabase.filter(combo =>
    combo.items.every(id => selectedItems.includes(id))
  );
}

// ==========================================
// หา combo ดีที่สุด (scoreBonus สูงสุด)
// ==========================================
export function getBestCombo(selectedItems = []) {
  const matched = findMatchingCombos(selectedItems);
  if (!matched.length) return null;
  return matched.sort((a, b) => b.scoreBonus - a.scoreBonus)[0];
}

// ==========================================
// [FIX] checkCombo — renderScenario.js เรียก checkCombo(scenario, selectedItemObjects)
// selectedItemObjects = [{id, ...}, ...]
// ==========================================
export function checkCombo(scenario, selectedItemObjects = []) {
  const ids = selectedItemObjects.map(i => i.id);

  // ตรวจ combo ตาม comboDatabase
  const best = getBestCombo(ids);
  if (best) return { success: true, ...best };

  // ตรวจ comboItems ของ scenario เอง
  if (scenario?.comboItems) {
    for (const recipe of scenario.comboItems) {
      if (recipe.every(id => ids.includes(id))) {
        return { success: true, scoreBonus: 20, hp: 0, mana: 5, resultName: "Scenario Combo" };
      }
    }
  }

  return { success: false };
}

// ==========================================
// Passive glow hints
// ==========================================
export function getGlowItems(scenario, inventory = [], playerJob = "") {
  const ids = inventory.map(i => (typeof i === "string" ? i : i.id));
  const glowSet = new Set();

  comboDatabase.forEach(combo => {
    const related = combo.tags.some(tag =>
      (scenario?.title || "").toLowerCase().includes(tag)
    );
    if (!related) return;
    combo.items.forEach(id => {
      if (ids.includes(id)) glowSet.add(id);
    });
  });

  // Direct / social items ตาม job
  if (scenario?.coreItems) {
    scenario.coreItems.forEach(id => {
      if (ids.includes(id)) glowSet.add(id);
    });
  }

  return [...glowSet];
}

export function canItemCombo(itemId) {
  return comboDatabase.some(c => c.items.includes(itemId));
}
