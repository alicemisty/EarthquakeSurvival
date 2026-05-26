// engine/comboEngine.js
// [FIX] ลบไอเทม abstract ที่ไม่มีใน itemsData (2_people, pipe, chair, jacket, board, cloth, toy, talk)
// [FIX] ใช้ export function ทุกตัว (ES Module)
// [FIX] checkCombo() เพิ่มเพื่อให้ renderScenario.js เรียกได้โดยตรง

// ==========================================
// COMBO DATABASE — item IDs ต้องตรงกับ itemsData
// ==========================================
export const comboDatabase = [

  // AIR / DUST / SMOKE
  { id: "wet_towel_mask",   items: ["towel",    "water"],       tags: ["dust","smoke","gas"],  scoreBonus: 10, resultName: "Wet Towel Mask",        description: "ผ้าชุบน้ำปิดจมูกแทนหน้ากาก" },
  { id: "wet_clothes_mask", items: ["clothes",  "water"],       tags: ["dust","smoke"],        scoreBonus: 6,  resultName: "Cloth Mask",             description: "เสื้อชุบน้ำกรองฝุ่น" },
  { id: "foil_dust_seal",   items: ["blanket",  "tape"],        tags: ["dust"],                scoreBonus: 7,  resultName: "Foil Dust Seal",         description: "ผ้าห่มฟอยล์+เทปซีลช่องลม" },
  { id: "tissue_filter",    items: ["tissues",  "water"],       tags: ["dust","smoke"],        scoreBonus: 4,  resultName: "Tissue Filter",          description: "ทิชชู่เปียกกรองอากาศ" },

  // FIRST AID
  { id: "towel_bandage",    items: ["towel",    "tape"],        tags: ["injury","medical"],    scoreBonus: 12, resultName: "Emergency Bandage",      description: "ผ้าขนหนู+เทปห้ามเลือด" },
  { id: "clothes_sling",    items: ["clothes",  "rope"],        tags: ["injury","medical"],    scoreBonus: 8,  resultName: "Arm Sling",              description: "เสื้อ+เชือกพยุงแขน" },
  { id: "book_splint",      items: ["book",     "tape"],        tags: ["injury","medical"],    scoreBonus: 14, resultName: "Book Splint",            description: "หนังสือหนา+เทปดามขา/แขน" },
  { id: "textbook_splint",      items: ["japanese_textbook",     "tape"],        tags: ["injury","medical"],    scoreBonus: 14, resultName: "Book Splint2",            description: "หนังสือหนา+เทปดามขา/แขน" },
  { id: "map_leg_support",  items: ["paper_map","rope"],        tags: ["injury","medical"],    scoreBonus: 10, resultName: "Map Leg Support",        description: "ม้วนแผนที่+เชือกด้ามขา" },
  { id: "book_splint2",  items: ["book","towel"],        tags: ["injury","medical"],    scoreBonus: 14, resultName: "Improvised Splint",        description: "เฝือกชั่วคราว" },

  // LIGHT
  { id: "phone_powerbank",  items: ["powerbank","flashlight"],  tags: ["dark","blackout"],     scoreBonus: 15, resultName: "Extended Flashlight",    description: "พาวเวอร์แบงก์ต่อไฟฉายยาวนานขึ้น" },
  { id: "lantern_diy",      items: ["flashlight","water"],      tags: ["dark","blackout"],     scoreBonus: 8,  resultName: "DIY Lantern",            description: "ขวดน้ำกระจายแสงไฟฉาย" },
   { id: "lantern_diy2",    items: ["flashlight","water_bottle"],      tags: ["dark","blackout"],     scoreBonus: 8,  resultName: "DIY Lantern2",            description: "ขวดน้ำกระจายแสงไฟฉาย2" },
  { id: "reflector_spotlight",  items: ["flashlight","foil"],      tags: ["dark","blackout"],     scoreBonus: 8,  resultName: "Reflector Spotlight",     description: "โคมสะท้อนแสงเพิ่มความสว่าง" },
  { id: "tissue_torch",     items: ["lighter",  "tissues"],     tags: ["dark"],                scoreBonus: 3,  resultName: "Tissue Torch",           description: "คบเพลิงทิชชู่ (เสี่ยงไฟ)" },

  // WEATHER
  { id: "trashbag_rain",    items: ["trash_bag","tape"],        tags: ["rain","cold"],         scoreBonus: 14, resultName: "DIY Raincoat",           description: "ถุงขยะ+เทปทำเสื้อกันฝน" },
  { id: "foil_body_wrap",   items: ["blanket",  "rope"],        tags: ["cold"],                scoreBonus: 10, resultName: "Foil Body Wrap",         description: "ผ้าห่มฟอยล์มัดกันหนาว" },
  { id: "paper_insulation", items: ["paper_map","tape"],        tags: ["cold"],                scoreBonus: 6,  resultName: "Paper Insulation",       description: "กระดาษบุชั้นในกันลม" },

  // RESCUE / CLEARING
  { id: "rope_crowbar_pull",items: ["rope",     "crowbar"],     tags: ["heavy_object","rescue"],scoreBonus: 18, resultName: "Lever & Rope Rescue",   description: "เชือก+ชะแลงงัดของหนัก" },
  { id: "crowbar_pliers",   items: ["crowbar",  "pliers"],      tags: ["heavy_object","rescue"],scoreBonus: 16, resultName: "Lever System",          description: "ชะแลง+คีมเป็นจุดหมุน" },
  { id: "rope_heavy_pull",  items: ["rope",     "extinguisher"],tags: ["heavy_object"],        scoreBonus: 8,  resultName: "Weight & Rope Pull",     description: "เชือก+ถังหนักช่วยดึงซาก" },

  // CROWD / SIGNAL
  { id: "flashlight_wipes", items: ["flashlight","wipes"],      tags: ["crowd","signal"],      scoreBonus: 9,  resultName: "Signal Baton",           description: "ผ้าคลุมไฟฉายทำสัญญาณ" },
  { id: "cash_flashlight",  items: ["cash",     "ready_eat"],  tags: ["crowd","signal"],      scoreBonus: 6,  resultName: "Noise Maker",            description: "กระป๋องเหรียญส่งเสียง" },
  { id: "cash_flashlight2",  items: ["cash",     "water_bottle"],  tags: ["crowd","signal"],      scoreBonus: 6,  resultName: "Noise Maker",            description: "ขวดมีเหรียญส่งเสียง" },
  { id: "notepad_docs",     items: ["notepad",  "docs"],        tags: ["crowd","signal"],      scoreBonus: 8, resultName: "Emergency Sign Board",   description: "สมุด+เอกสารเขียนป้ายนำทาง" },
  { id: "sos_signal",     items: ["whistle",  "flashlight"],        tags: ["crowd","signal"],      scoreBonus: 12, resultName: "SOS Signal Duo",   description: "ส่งสัญญาณทั้งแสงและเสียงพร้อมกัน" },
 { id: "notepad_docs2",     items: ["marker_pen",  "notepad"],        tags: ["crowd","signal"],      scoreBonus: 10, resultName: "Emergency Sign Board",   description: "เขียนข้อความระบุทิศทางการอพยพ จำนวนผู้รอดชีวิต หรือเขียนกรุ๊ปเลือด" },
  
  // HYGIENE / WATER
  { id: "water_towel_filter",items: ["water",   "towel"],       tags: ["hygiene","water"],     scoreBonus: 7,  resultName: "Water Filter",           description: "ผ้าขนหนูกรองตะกอนน้ำดิบ" },
  { id: "gel_towel_hygiene", items: ["hand_gel","towel"],       tags: ["hygiene"],             scoreBonus: 9,  resultName: "Body Hygiene Kit",       description: "เจลแอลกอฮอล์+ผ้าเช็ดตัว" },
  { id: "bag_wrap_collector",items: ["trash_bag","wrap"],       tags: ["water","hygiene"],     scoreBonus: 10, resultName: "Rain Collector",         description: "ถุงขยะ+พลาสติกแร็ปรองน้ำฝน" },

  // MENTAL
  { id: "blanket_comfort",  items: ["blanket",  "candy"],       tags: ["panic","stress","mental"],scoreBonus: 12, resultName: "Comfort Kit",         description: "ผ้าห่มอบอุ่น+ลูกอมลดเครียด" },
  { id: "calming_kit"",  items: ["common_med",  "candy"],       tags: ["panic","stress","mental"],scoreBonus: 12, resultName: "Calming Kit",         description: "ชุดลดความตื่นตระหนก" },
  { id: "booster_pack"",  items: ["coffee",  "ready_eat"],       tags: ["panic","stress","mental"],scoreBonus: 15, resultName: "Booster Pack",         description: "ชุดเสบียงบำรุงขวัญ" },
  { id: "notepad_family",   items: ["notepad",  "family_photo"],tags: ["mental","stress"],     scoreBonus: 14, resultName: "Memory Support",         description: "เขียนสมุด+ดูรูปครอบครัวคลายใจ" },
  { id: "easter_eggs",   items: ["sensei_photo",  "japanese_textbook"],tags: ["mental","stress"],     scoreBonus: 20, resultName: "The "Sensei" Easter Eggs",         description: "สองเซนเซและหนังสืออะกิโกะจะทำให้นึกถึงตอนเรียนทุกอย่างออก" },
];
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
