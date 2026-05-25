// combos.js

export const comboRecipes = [
  // ==========================================
  // 😷 หมวดหมู่: ป้องกันฝุ่น / ควัน / ใยหิน
  // ==========================================
  {
    id: "diy_mask_towel",
    category: "dust_smoke",
    items: ["towel", "water"],
    createsTag: "mask",
    scoreMultiplier: 0.70,
    nameTh: "ผ้าขนหนูชุบน้ำกันฝุ่น",
    description: "ผ้าขนหนูชุบน้ำใช้กรองฝุ่นและควันชั่วคราว"
  },
  {
    id: "diy_mask_shirt",
    category: "dust_smoke",
    items: ["clothes", "water"], // ในคลังคือ id: clothes (เสื้อผ้าสำรอง)
    createsTag: "mask",
    scoreMultiplier: 0.60,
    nameTh: "เสื้อชุบน้ำกันฝุ่น",
    description: "ใช้เสื้อผ้าชุบน้ำปิดปากและจมูกกรองอากาศฉุกเฉิน"
  },
  {
    id: "dust_cover_foil",
    category: "dust_smoke",
    items: ["blanket", "tape"],  // ในคลังคือ id: blanket (ผ้าห่มฟอยล์)
    createsTag: "dust_cover",
    scoreMultiplier: 0.50,
    nameTh: "ผ้าห่มฟอยล์กั้นฝุ่น",
    description: "ใช้เทปกาวซีลผ้าห่มฟอยล์ปิดช่องลมเพื่อกันฝุ่นพิษ"
  },
  {
    id: "temporary_filter",
    category: "dust_smoke",
    items: ["tissues", "water"],
    createsTag: "temporary_filter",
    scoreMultiplier: 0.40,
    nameTh: "กระดาษทิชชู่เปียกกรองอากาศ",
    description: "ใช้ทิชชู่ซ้อนกันชุบน้ำพอชื้นเพื่อกรองฝุ่นเฉพาะหน้า"
  },

  // ==========================================
  // 🩹 หมวดหมู่: ปฐมพยาบาล
  // ==========================================
  {
    id: "diy_bandage",
    category: "first_aid",
    items: ["towel", "tape"],
    createsTag: "bandage",
    scoreMultiplier: 0.70,
    nameTh: "ผ้าพันแผลฉุกเฉิน",
    description: "ใช้ผ้าขนหนูกดบาดแผลแล้วยึดด้วยเทปกาวเพื่อห้ามเลือด"
  },
  {
    id: "arm_sling",
    category: "first_aid",
    items: ["clothes", "rope"],
    createsTag: "sling_arm_support",
    scoreMultiplier: 0.60,
    nameTh: "ผ้าพยุงแขนฉุกเฉิน",
    description: "ใช้เสื้อและเชือกรวมกันเพื่อทำประคองแขนที่บาดเจ็บ"
  },
  {
    id: "diy_splint_magazine",
    category: "first_aid",
    items: ["book", "tape"], // ในคลังคือ id: book (หนังสืออ่านเล่น)
    createsTag: "splint",
    scoreMultiplier: 0.75,
    nameTh: "เฝือกอ่อนจากหนังสือ",
    description: "ใช้หนังสือหนาๆ ด้ามแขนหรือขาแล้วพันแน่นด้วยเทปกาว"
  },
  {
    id: "leg_support_cardboard",
    category: "first_aid",
    items: ["paper_map", "rope"], // ปรับจากกระดาษลัง เป็นไอเทมกระดาษในคลัง (แผนที่กระดาษ)
    createsTag: "leg_support",
    scoreMultiplier: 0.65,
    nameTh: "อุปกรณ์ด้ามขาฉุกเฉิน",
    description: "ม้วนกระดาษแผนที่ให้หนาเพื่อช่วยด้ามขาและมัดด้วยเชือก"
  },
  {
  id: "diy_splint_wrap",
  category: "first_aid",
  items: ["book", "wrap"],
  createsTag: "splint",
  scoreMultiplier: 0.70,
  nameTh: "เฝือกอ่อนพันพลาสติกแร็ป",
  description: "ใช้หนังสือหนาประกบแขนขาที่หักแล้วใช้พลาสติกแร็ปพันทับเพื่อตรึงอวัยวะ"
  },
  {
  id: "sanitary_pad_bandage",
  category: "first_aid",
  items: ["sanitary", "tape"],
  createsTag: "bandage",
  scoreMultiplier: 0.80, // คะแนนสูงเพราะซับเลือดและสะอาดกว่าผ้าเช็ดตัว
  nameTh: "แผ่นซับแผลห้ามเลือดฉุกเฉิน",
  description: "ใช้ผ้าอนามัยแปะกดเหนือบาดแผลใหญ่เพื่อซับและห้ามเลือดแล้วยึดด้วยเทปกาว"
  },

  // ==========================================
  // 🔦 หมวดหมู่: แสงสว่างฉุกเฉิน
  // ==========================================
  {
    id: "diy_phone_flashlight",
    category: "light",
    items: ["powerbank", "powerbank"], // สมมติว่าเปิดไฟฉายโทรศัพท์ที่ใช้คู่กับพาวเวอร์แบงก์
    createsTag: "flashlight",
    scoreMultiplier: 0.70,
    nameTh: "ระบบไฟสำรองมือถือ",
    description: "ต่อพาวเวอร์แบงก์เข้ากับมือถือเพื่อเปิดไฟฉายได้ยาวนานขึ้น"
  },
  {
    id: "temporary_light_tissue",
    category: "light",
    items: ["lighter", "tissues"],
    createsTag: "temporary_light",
    scoreMultiplier: 0.30,
    nameTh: "คบเพลิงทิชชู่ฉุกเฉิน",
    description: "จุดไฟที่ม้วนกระดาษทิชชู่เพื่อให้แสงสว่างชั่วคราว (เสี่ยงไฟไหม้)"
  },
  {
    id: "diy_lantern",
    category: "light",
    items: ["flashlight", "water"], // ในคลังคือ id: water (ใช้น้ำดื่มขวดใสเปลี่ยนไฟฉายสปอตไลท์เป็นตะเกียง)
    createsTag: "lantern",
    scoreMultiplier: 0.60,
    nameTh: "ตะเกียงแสงกระจาย",
    description: "แนบไฟฉายเข้ากับขวดน้ำดื่มเพื่อกระจายแสงให้สว่างทั่วห้อง"
  },
  {
  id: "reflective_signal_board",
  category: "crowd_control",
  items: ["blanket", "tape"],
  createsTag: "emergency_sign",
  scoreMultiplier: 0.75,
  nameTh: "ป้ายสะท้อนแสงขอความช่วยเหลือ",
  description: "ขึงผ้าห่มฟอยล์สะท้อนแสงติดหน้าต่างหรือที่สูงเพื่อทำเป็นเป้าสังเกตให้ทีมกู้ภัย"
  },

  // ==========================================
  // 🌧️ หมวดหมู่: กันฝน / กันหนาว
  // ==========================================
  {
    id: "diy_raincoat_bag",
    category: "weather",
    items: ["trash_bag", "tape"],
    createsTag: "raincoat",
    scoreMultiplier: 0.80,
    nameTh: "เสื้อกันฝนถุงขยะ",
    description: "เจาะรูถุงขยะใบใหญ่แล้วใช้เทปกาวแต่งขอบทำเป็นเสื้อกันฝน"
  },
  {
    id: "body_wrap_foil",
    category: "weather",
    items: ["blanket", "rope"],
    createsTag: "body_wrap",
    scoreMultiplier: 0.70,
    nameTh: "ชุดห่อตัวกันหนาวจัด",
    description: "พันผ้าห่มฟอยล์รอบตัวแล้วมัดด้วยเชือกเพื่อรักษาความร้อนในร่างกาย"
  },
  {
    id: "insulation_paper",
    category: "weather",
    items: ["paper_map", "tape"], // ในคลังคือ id: paper_map (แผนที่กระดาษ) 
    createsTag: "insulation_layer",
    scoreMultiplier: 0.50,
    nameTh: "ฉนวนกันความหนาวฉุกเฉิน",
    description: "ใช้กระดาษบุข้างในเสื้อแล้วแปะเทปกาวเพื่อกันลมหนาวกระทบผิว"
  },
  {
  id: "thermal_layer_hybrid",
  category: "weather",
  items: ["clothes", "blanket"],
  createsTag: "body_wrap",
  scoreMultiplier: 0.85,
  nameTh: "เสื้อบุกันหนาวสะท้อนความร้อน",
  description: "สวมผ้าห่มฟอยล์ไว้ด้านในแล้วทับด้วยเสื้อผ้าสำรองเพื่อกักเก็บความร้อนสูงสุด"
  },  
  {
  id: "warm_footwear_diy",
  category: "weather",
  items: ["kairo", "tape"],
  createsTag: "foot_warmer",
  scoreMultiplier: 0.65,
  nameTh: "แผ่นรองความร้อนฉุกเฉิน",
  description: "ใช้เทปกาวแปะถุงทรายร้อนติดกับรองเท้าหรือเสื้อผ้าเพื่อรักษาความอบอุ่นเฉพาะจุด"
  },

  // ==========================================
  // 🚑 หมวดหมู่: ช่วยคนเจ็บ
  // ==========================================
  {
    id: "walking_support_bar",
    category: "rescue",
    items: ["rope", "crowbar"], // ในคลังไม่มี stick เปลี่ยนเป็น crowbar (ชะแลงเหล็ก) ผูกเชือกทำไม้เท้าค้ำเดิน
    createsTag: "walking_support",
    scoreMultiplier: 0.70,
    nameTh: "ไม้เท้าเหล็กช่วยพยุง",
    description: "พันเชือกเข้ากับชะแลงเหล็กเพื่อเพิ่มความกระชับในการใช้ค้ำเดิน"
  },
  {
    id: "neck_support_towel",
    category: "rescue",
    items: ["towel", "crowbar"], // ใช้ชะแลงเป็นแกนแข็งหุ้มด้วยผ้าเช็ดตัวหนาๆ
    createsTag: "neck_support",
    scoreMultiplier: 0.60,
    nameTh: "เฝือกดามคอฉุกเฉิน",
    description: "ม้วนผ้าเช็ดตัวล้อมแกนแข็งเพื่อประคองกระดูกคอผู้บาดเจ็บ"
  },
  {
    id: "emergency_pillow",
    category: "rescue",
    items: ["clothes", "blanket"], // ใช้เสื้อผ้าสำรองห่อด้วยผ้าห่มฟอยล์
    createsTag: "emergency_pillow",
    scoreMultiplier: 0.40,
    nameTh: "หมอนหนุนฉุกเฉิน",
    description: "ม้วนพับเสื้อผ้าเพื่อใช้หนุนศีรษะคนเจ็บให้นอนสบายขึ้น"
  },

  // ==========================================
  // 🚪 หมวดหมู่: งัด / พัง / เคลียร์ทาง
  // ==========================================
  {
    id: "pull_tool_heavy",
    category: "clear_way",
    items: ["extinguisher", "rope"], // ใช้ถังดับเพลิงผูกเชือกหนาเป็นตุ้มเหวี่ยงกระแทกหรือดึงรั้ง
    createsTag: "pull_tool",
    scoreMultiplier: 0.50,
    nameTh: "เครื่องช่วยดึงรั้งฉุกเฉิน",
    description: "ผูกเชือกกู้ภัยเข้ากับวัตถุหนักเพื่อใช้แรงเหวี่ยงเคลียร์เศษซาก"
  },
  {
    id: "lever_diy",
    category: "clear_way",
    items: ["crowbar", "pliers"], // คานงัดโดยใช้ชะแลงและคีมเป็นจุดหมุน
    createsTag: "lever",
    scoreMultiplier: 0.60,
    nameTh: "ระบบคานงัดทุ่นแรง",
    description: "จัดมุมเครื่องมือช่างและชะแลงเหล็กเพื่อเพิ่มแรงงัดประตูที่ติดตาย"
  },
  {
    id: "barricade_breaker",
    category: "clear_way",
    items: ["crowbar", "helmet"], // ชะแลงร่วมกับหมวกนิรภัยเพื่อเซฟแรงกระแทก
    createsTag: "barricade_breaker",
    scoreMultiplier: 0.65,
    nameTh: "ชุดทำลายสิ่งกีดขวาง",
    description: "ใช้อุปกรณ์กระแทกและงัดแงะสิ่งกีดขวางเพื่อเปิดทางหนี"
  },
  {
  id: "can_opener_diy",
  category: "clear_way",
  items: ["ready_eat", "knife"],
  createsTag: "opened_food",
  scoreMultiplier: 0.90, // คะแนนสูงเพราะแก้ปัญหาการอดอาหารได้ตรงจุด
  nameTh: "ดัดแปลงเครื่องมืองัดเปิดอาหาร",
  description: "ใช้มีดพับอเนกประสงค์หรือเครื่องมือช่างในการเจาะเปิดทานอาหารกระป๋อง"
  },
  {
  id: "heavy_duty_rope_pull",
  category: "clear_way",
  items: ["rope", "gunte"],
  createsTag: "pull_tool",
  scoreMultiplier: 0.80,
  nameTh: "การใช้เชือกกู้ภัยเซฟตี้มือ",
  description: "สวมถุงมือหนาก่อนจับเชือกช่วยดึงรั้งสิ่งกีดขวางเพื่อเพิ่มแรงยึดจับและป้องกันมือบาดเจ็บ"
  },

  // ==========================================
  // 📢 หมวดหมู่: คุมฝูงชน
  // ==========================================
  {
    id: "noise_maker",
    category: "crowd_control",
    items: ["cash", "flashlight"], // ใช้เหรียญในกระเป๋าเงิน (cash) เคาะกับกระบอกไฟฉายเหล็ก
    createsTag: "noise_maker",
    scoreMultiplier: 0.50,
    nameTh: "อุปกรณ์ส่งสัญญาณเสียง",
    description: "เคาะเหรียญกับไฟฉายให้เกิดเสียงดังรัวเพื่อเรียกความสนใจหรือขอทาง"
  },
  {
    id: "signal_baton_diy",
    category: "crowd_control",
    items: ["flashlight", "wipes"], // เอาทิชชู่เปียกหรือผ้าเช็ดตัวมาคลุมหน้าไฟฉาย
    createsTag: "signal_baton",
    scoreMultiplier: 0.60,
    nameTh: "กระบองไฟสัญญาณฉุกเฉิน",
    description: "ใช้ทิชชู่หรือผ้าบางสีอ่อนบังหน้าไฟฉายเพื่อทำไฟสัญญาณเตือนภัย"
  },
  {
    id: "emergency_sign_board",
    category: "crowd_control",
    items: ["notepad", "docs"], // สมุดบันทึกชูร่วมกับเอกสารนำทาง
    createsTag: "emergency_sign",
    scoreMultiplier: 0.80,
    nameTh: "ป้ายแจ้งเตือน/บอกเส้นทาง",
    description: "เขียนข้อความตัวใหญ่ลงบนสมุดบันทึกเพื่อชูสั่งการหรือชี้ทางอพยพ"
  },

  // ==========================================
  // 💧 หมวดหมู่: น้ำ / สุขอนามัย
  // ==========================================
  {
    id: "water_filter_diy",
    category: "hygiene",
    items: ["water", "towel"], // ใช้ผ้าขนหนูกรองตะกอนจากแหล่งน้ำดิบลงขวด
    createsTag: "water_filter",
    scoreMultiplier: 0.50,
    nameTh: "เครื่องกรองน้ำหยาบฉุกเฉิน",
    description: "ใช้ผ้าขนหนูซ้อนหนาเพื่อกรองเศษฝุ่นและตะกอนออกจากน้ำดิบ"
  },
  {
    id: "hygiene_kit_diy",
    category: "hygiene",
    items: ["towel", "hand_gel"], // ผ้าขนหนูและเจลแอลกอฮอล์เช็ดตัวแทนการอาบน้ำ
    createsTag: "hygiene_kit",
    scoreMultiplier: 0.70,
    nameTh: "ชุดเช็ดทำความสะอาดร่างกาย",
    description: "ใช้เจลแอลกอฮอล์ร่วมกับผ้าสะอาดเพื่อฆ่าเชื้อและทำความสะอาดผิวหนัง"
  },
  {
    id: "rain_collector_diy",
    category: "hygiene",
    items: ["trash_bag", "wrap"], // กางถุงขยะและพลาสติกแร็ปรับน้ำฝน
    createsTag: "rain_collector",
    scoreMultiplier: 0.65,
    nameTh: "อุปกรณ์รองรับน้ำฝนฉุกเฉิน",
    description: "ขึงพลาสติกแร็ปและถุงขยะเป็นแอ่งกว้างเพื่อกักเก็บน้ำฝนประทังชีวิต"
  }
];

// ส่งออกสูตรผสมทั้งหมด
// ฟังก์ชันเช็คว่าผู้เล่นติดคอมโบไหนบ้าง
function getTriggeredCombos(playerInventory, comboRecipes) {
  return comboRecipes.filter(recipe => {
    // เช็คว่าไอเทมทุกชิ้นในสูตร (recipe.items) มีอยู่ในกระเป๋าของผู้เล่น (playerInventory)
    return recipe.items.every(itemId => playerInventory.includes(itemId));
  });
}

// ตัวอย่างการใช้งาน
const playerInventory = ["book", "wrap", "ready_eat", "knife"];
const activeCombos = getTriggeredCombos(playerInventory, comboRecipes);

console.log(activeCombos); 
// จะ return ข้อมูลของคอมโบ 'diy_splint_wrap' และ 'can_opener_diy' ออกมาทันที