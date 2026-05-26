// inventory.js

export const itemsData = {
  // === CATEGORY: FOOD & WATER ===
  water: {
    nameTh: "น้ำดื่ม (3 ลิตร)",
    nameJp: "飲料水",
    category: "food_water",
    weight: 3.0,
    emoji: "💧",
    tags: ["direct", "combo", "clean"]
  },
    water_bottle: {
    nameTh: "ขวดน้ำเปล่า",
    nameJp: "ボトル",
    category: "food_water",
    weight: 0.05,
    emoji: "🧴",
    tags: ["direct", "combo","tools","clean" ]
  },
  high_cal: {
    nameTh: "อาหารพลังงานสูง/โปรตีนบาร์",
    nameJp: "高カロリー食",
    category: "food_water",
    weight: 0.4,
    emoji: "🥜",
    tags: ["direct", "social","mental"]
  },
  ready_eat: {
    nameTh: "อาหารกระป๋อง/พร้อมทาน",
    nameJp: "レトルト食品",
    category: "food_water",
    weight: 0.8,
    emoji: "🥫",
    tags: ["direct", "combo"]
  },
  chocolate: { 
    nameTh: "ช็อกโกแลตแท่ง (ให้พลังงานและคลายเครียด)", 
    nameJp: "チョコレート", 
    category: "food_water", 
    weight: 0.1, emoji: "🍫", 
    tags: ["direct", "mental"] 
  },
  candy: {
    nameTh: "ลูกอมแก้เครียด/เพิ่มน้ำตาล",
    nameJp: "飴/砂糖",
    category: "food_water",
    weight: 0.1,
    emoji: "🍬",
    tags: ["social", "mental"]
  },
  coffee: {
    nameTh: "กาแฟซองสำเร็จรูป",
    nameJp: "インスタントコーヒー",
    category: "food_water",
    weight: 0.1,
    emoji: "☕",
    tags: ["social"]
  },
  foil: {
    nameTh: "ฟอยล์ห่ออาหาร/เก็บความร้อน",
    nameJp: "アルミホイル",
    category: "food_water",
    weight: 0.1,
    emoji: "🌯",
    tags: ["combo"]
  },
  dry_milk: {
    nameTh: "นมผงชงพกพาสำหรับเด็ก",
    nameJp: "粉ミルク",
    category: "food_water",
    weight: 0.3,
    emoji: "🍼",
    tags: ["social"]
  },

  // === CATEGORY: MEDICAL & HYGIENE ===
  personal_med: {
    nameTh: "ยาประจำตัว",
    nameJp: "常備薬",
    category: "medical",
    weight: 0.1,
    emoji: "💊",
    tags: ["direct"]
  },
  common_med: {
    nameTh: "ยาสามัญประจำบ้าน/ยาลดไข้",
    nameJp: "一般医薬品",
    category: "medical",
    weight: 0.2,
    emoji: "🧪",
    tags: ["social", "direct"]
  },
  first_aid: {
    nameTh: "ชุดอุปกรณ์ปฐมพยาบาล",
    nameJp: "救急箱",
    category: "medical",
    weight: 0.5,
    emoji: "🩹",
    tags: ["direct", "social"]
  },
  mask: {
    nameTh: "หน้ากากอนามัยกันฝุ่นซิลิกา",
    nameJp: "N95マスク",
    category: "medical",
    weight: 0.1,
    emoji: "😷",
    tags: ["direct"]
  },
  hand_gel: {
    nameTh: "เจลแอลกอฮอล์ล้างมือ",
    nameJp: "消毒ジェル",
    category: "medical",
    weight: 0.2,
    emoji: "🧴",
    tags: ["clean"]
  },
  soap: { 
    nameTh: "สบู่ก้อน/สบู่เหลวพกพา", 
    nameJp: "携帯石鹸", 
    category: "medical", 
    weight: 0.1, 
    emoji: "🧼", 
    tags: ["clean"] 
  },
  dry_shampoo: { 
    nameTh: "ดรายแชมพู (ไม่ต้องใช้น้ำ)", 
    nameJp: "ドライシャンプー", 
    category: "medical", 
    weight: 0.2, 
    emoji: "🧴", 
    tags: ["clean", "mental"] 
  },
  wipes: {
    nameTh: "ทิชชู่เปียกทำความสะอาด",
    nameJp: "ウェットティッシュ",
    category: "medical",
    weight: 0.3,
    emoji: "🧻",
    tags: ["clean", "social"]
  },
  tissues: {
    nameTh: "กระดาษทิชชู่แห้ง",
    nameJp: "ティッシュペーパー",
    category: "medical",
    weight: 0.1,
    emoji: "🧻",
    tags: ["clean"]
  },
  portable_toilet: {
    nameTh: "ถุงสุขาพกพาฉุกเฉิน",
    nameJp: "携帯トイレ",
    category: "medical",
    weight: 0.4,
    emoji: "🚽",
    tags: ["direct", "social"]
  },
  toothbrush: {
    nameTh: "แปรงและยาสีฟัน",
    nameJp: "歯ブラシセット",
    category: "medical",
    weight: 0.1,
    emoji: "🪥",
    tags: ["clean"]
  },
  sanitary: {
    nameTh: "ผ้าอนามัย",
    nameJp: "生理用品",
    category: "medical",
    weight: 0.2,
    emoji: "🩸",
    tags: ["social", "combo"]
  },
  cooling_sheet: {
    nameTh: "แผ่นเจลลดไข้/ลดความร้อน",
    nameJp: "冷却シート",
    category: "medical",
    weight: 0.1,
    emoji: "🧊",
    tags: ["social"]
  },

  // === CATEGORY: COMMUNICATION & LIGHT ===
  flashlight: {
    nameTh: "ไฟฉาย LED ส่องสว่าง",
    nameJp: "懐中電灯",
    category: "comm",
    weight: 0.4,
    emoji: "🔦",
    tags: ["direct"]
  },
  batteries: {
    nameTh: "ถ่านไฟฉายสำรอง",
    nameJp: "予備電池",
    category: "comm",
    weight: 0.2,
    emoji: "🔋",
    tags: ["combo"]
  },
  radio: {
    nameTh: "วิทยุพกพาฟังคลื่น AM/FM",
    nameJp: "携帯ラジオ",
    category: "comm",
    weight: 0.6,
    emoji: "📻",
    tags: ["direct", "social"]
  },
  whistle: {
    nameTh: "นกหวีดสากลขอความช่วยเหลือ",
    nameJp: "ホイッスル",
    category: "comm",
    weight: 0.05,
    emoji: "😗",
    tags: ["direct", "social"]
  },
  cash: {
    nameTh: "เงินสดและเหรียญ 10-100 เยน",
    nameJp: "現金と硬貨",
    category: "comm",
    weight: 0.2,
    emoji: "🪙",
    tags: ["social", "combo","direct"]
  },
  paper_map: {
    nameTh: "แผนที่กระดาษจุดอพยพประจำเขต",
    nameJp: "防災地図",
    category: "comm",
    weight: 0.1,
    emoji: "🗺️",
    tags: ["social", "direct", "combo"]
  },
  powerbank: {
    nameTh: "พาวเวอร์แบงก์ชาร์จมือถือ",
    nameJp: "モバイルバッテリー",
    category: "comm",
    weight: 0.4,
    emoji: "🔋",
    tags: ["social", "combo"]
  },

  // === CATEGORY: CLOTHING & GEAR ===
  helmet: {
    nameTh: "หมวกกันน็อกกันแรงกระแทก",
    nameJp: "防災ヘルメット",
    category: "clothing",
    weight: 0.8,
    emoji: "🪖",
    tags: ["direct"]
  },
  goggles: { 
    nameTh: "แว่นตานิรภัยกันเศษฝุ่นอาคารถล่ม", 
    nameJp: "保護メガネ", 
    category: "clothing", 
    weight: 0.1, 
    emoji: "🥽", 
    tags: ["direct"] 
  },
  gunte: {
    nameTh: "ถุงมือผ้าหนากันกระจกบาด",
    nameJp: "防刃軍手",
    category: "clothing",
    weight: 0.1,
    emoji: "🧤",
    tags: ["direct"]
  },
  shoes: {
    nameTh: "รองเท้าพื้นหนาพิเศษ",
    nameJp: "厚底安全靴",
    category: "clothing",
    weight: 0.9,
    emoji: "🥾",
    tags: ["direct"]
  },
  blanket: {
    nameTh: "ผ้าห่มฟอยล์เก็บความร้อน",
    nameJp: "アルミブランケット",
    category: "clothing",
    weight: 0.1,
    emoji: "🪙",
    tags: ["direct", "combo"]
  },
  raincoat: {
    nameTh: "เสื้อกันฝนพกพา",
    nameJp: "レインコート",
    category: "clothing",
    weight: 0.2,
    emoji: "🧥",
    tags: ["direct"]
  },
  kairo: {
    nameTh: "ถุงทรายร้อนประคบอุ่นร่างกาย",
    nameJp: "使い捨てカイロ",
    category: "clothing",
    weight: 0.1,
    emoji: "🔥",
    tags: ["social","direct", "combo"]
  },
  clothes: {
    nameTh: "เสื้อผ้าและชุดชั้นในสำรอง",
    nameJp: "着替え肌着",
    category: "clothing",
    weight: 1.0,
    emoji: "👕",
    tags: ["social","direct", "combo"]
  },
  towel: {
    nameTh: "ผ้าเช็ดตัวผืนใหญ่",
    nameJp: "大判タオル",
    category: "clothing",
    weight: 0.3,
    emoji: "🧣",
    tags: ["combo"]
  },

  // === CATEGORY: SURVIVAL TOOLS ===
  knife: {
    nameTh: "มีดพับอเนกประสงค์ (Multi-tool)",
    nameJp: "万能ナイフ",
    category: "tools",
    weight: 0.3,
    emoji: "🔪",
    tags: ["direct", "combo"]
  },
  tape: {
    nameTh: "เทปกาวผ้าหนาสารพัดประโยชน์",
    nameJp: "布ガムテープ",
    category: "tools",
    weight: 0.3,
    emoji: "📼",
    tags: ["combo"]
  },
  trash_bag: {
    nameTh: "ถุงขยะหนาใบใหญ่",
    nameJp: "防臭ゴミ袋",
    category: "tools",
    weight: 0.2,
    emoji: "🛍️",
    tags: ["combo", "social", "tools", "clean"]
  },
  rope: {
    nameTh: "เชือกกู้ภัยหนา 10 เมตร",
    nameJp: "救助ロープ",
    category: "tools",
    weight: 0.5,
    emoji: "🧵",
    tags: ["direct", "combo"]
  },
  wrap: {
    nameTh: "พลาสติกแร็ปพันแผล/ถนอมอาหาร",
    nameJp: "食品用ラップ",
    category: "tools",
    weight: 0.2,
    emoji: "🌯",
    tags: ["combo"]
  },
  lighter: {
    nameTh: "ไฟแช็กจุดไฟฉุกเฉิน",
    nameJp: "ライター",
    category: "tools",
    weight: 0.05,
    emoji: "🔥",
    tags: ["direct", "combo"]
  },
  extinguisher: {
    nameTh: "สเปรย์ดับเพลิงขนาดพกพา",
    nameJp: "小型消火スプレー",
    category: "tools",
    weight: 0.6,
    emoji: "🧯",
    tags: ["direct"]
  },
  crowbar: {
    nameTh: "ชะแลงเหล็กขนาดสั้นงัดประตู",
    nameJp: "小型バール",
    category: "tools",
    weight: 1.2,
    emoji: "🔨",
    tags: ["direct"]
  },
  pliers: {
    nameTh: "คีมตัดลวด/เครื่องมือช่าง",
    nameJp: "ペンチ",
    category: "tools",
    weight: 0.4,
    emoji: "🔧",
    tags: ["direct", "combo"]
  },
 marker_pen: {
    nameTh: "ปากกาเคมี",
    nameJp: "マーカーペン",
    category: "tools",
    weight: 0.1,
    emoji: "🖊",
    tags: ["direct", "combo"]
  },

  // === CATEGORY: MENTAL SUPPORT ===
  docs: {
    nameTh: "สำเนาเอกสารสำคัญ/พาสปอร์ต",
    nameJp: "重要書類コピー",
    category: "mental",
    weight: 0.2,
    emoji: "📄",
    tags: ["direct"]
  },
  notepad: {
    nameTh: "สมุดบันทึกและปากกาเขียนข้อมูล",
    nameJp: "メモ帳とペン",
    category: "mental",
    weight: 0.1,
    emoji: "📝",
    tags: ["social"]
  },
  pillow: {
    nameTh: "หมอนรองคอเป่าลม",
    nameJp: "エアーピロー",
    category: "mental",
    weight: 0.2,
    emoji: "💤",
    tags: ["mental"]
  },
  ear_mask: {
    nameTh: "ที่อุดหูและผ้าปิดตา",
    nameJp: "耳栓・アイマスク",
    category: "mental",
    weight: 0.1,
    emoji: "🕶️",
    tags: ["mental"]
  },
  cards: {
    nameTh: "ไพ่/ของเล่นแก้เครียดกลุ่ม",
    nameJp: "トランプゲーム",
    category: "mental",
    weight: 0.2,
    emoji: "🃏",
    tags: ["social", "mental"]
  },
  family_photo: {
    nameTh: "รูปถ่ายครอบครัว/คนรัก",
    nameJp: "家族の写真",
    category: "mental",
    weight: 0.05,
    emoji: "🖼️",
    tags: ["social", "mental"]
  },
  book: {
    nameTh: "หนังสืออ่านเล่นคลายเครียด",
    nameJp: "文庫本",
    category: "mental",
    weight: 0.2,
    emoji: "📖",
    tags: ["mental", "combo"]
  },
  earphones: {
    nameTh: "หูฟังแบบสายตัดเสียงรบกวน",
    nameJp: "イヤホン",
    category: "mental",
    weight: 0.05,
    emoji: "🎧",
    tags: ["mental"]
  }
};



// ใช้เพื่อบอกนักเรียนว่าไอเทมใดใช้ตรงสถานการณ์หรือใช้ประยุกต์
// direct = ใช้ได้ตรงตัว, adapt = เหมาะกับการประยุกต์/คอมโบ, both = ใช้ได้ทั้งสองแบบ
function enrichItemUseTypes() {
  Object.entries(itemsData).forEach(([id, item]) => {
    const tags = item.tags || [];
    const isDirect = tags.includes("direct");
    const isAdapt = tags.includes("combo") || tags.includes("mental") || tags.includes("social") || tags.includes("clean");
    item.useType = isDirect && isAdapt ? "both" : (isDirect ? "direct" : "adapt");
    item.useNoteTh = item.useType === "direct"
      ? "ใช้ตรงกับสถานการณ์ได้"
      : item.useType === "both"
        ? "ใช้ตรงได้ และยังนำไปประยุกต์/คอมโบได้"
        : "เหมาะสำหรับใช้ประยุกต์หรือใช้ร่วมกับไอเทมอื่น";
    item.useNoteJp = item.useType === "direct"
      ? "直接使用"
      : item.useType === "both"
        ? "直接使用・応用"
        : "応用・組み合わせ";
  });

  // โทรศัพท์ไม่ได้อยู่ในกระเป๋า แต่ใช้เป็นไอเทมประยุกต์ในบางสถานการณ์
  itemsData.__phone__ = {
    nameTh: "มือถือ",
    nameJp: "スマホ",
    category: "comm",
    weight: 0,
    emoji: "📱",
    tags: ["adapt", "social"],
    useType: "adapt",
    useNoteTh: "ใช้ประยุกต์ เช่น ส่ง SMS เปิดไฟ หรือดูประกาศ แต่ต้องประหยัดแบต",
    useNoteJp: "SMS・ライト・情報確認に応用。電池を節約する"
  };
}

enrichItemUseTypes();
