// engine/comboEngine.js
// [FIX] ลบไอเทม abstract ที่ไม่มีใน itemsData (2_people, pipe, chair, jacket, board, cloth, toy, talk)
// [FIX] ใช้ export function ทุกตัว (ES Module)
// [FIX] checkCombo() เพิ่มเพื่อให้ renderScenario.js เรียกได้โดยตรง

// ==========================================
// COMBO DATABASE — item IDs ต้องตรงกับ itemsData
// ==========================================
export const comboDatabase = [

  // ── AIR / DUST / SMOKE ────────────────────────────────────────────────
  {
    id: "wet_towel_mask", items: ["towel","water"], tags: ["dust","smoke","gas"], scoreBonus: 10,
    resultName: "Wet Towel Mask", description: "ผ้าชุบน้ำปิดปาก",
    explanationTh: "ผ้าขนหนูชุบน้ำชุ่มแล้วปิดจมูก-ปาก ความชื้นช่วยดักจับอนุภาคฝุ่นและควันไว้ในเส้นใย ลดปริมาณสารพิษที่สูดเข้าปอดได้อย่างมีนัยสำคัญ เหมาะสำหรับเดินทะลุควันหรือฝุ่นละอองหนาแน่น",
    explanationJp: "濡れたタオルで口と鼻を覆うと、繊維が粉塵や煙の粒子を捕捉します。肺への有害物質の吸入を大幅に減らせるため、煙や粉塵の多い場所を通る際に有効です。"
  },
  {
    id: "wet_clothes_mask", items: ["clothes","water"], tags: ["dust","smoke"], scoreBonus: 6,
    resultName: "Cloth Mask", description: "เสื้อชุบน้ำกรองฝุ่น",
    explanationTh: "เสื้อผ้าชุบน้ำพับหลายชั้นใช้คลุมใบหน้า กรองฝุ่นและควันได้เบื้องต้น ประสิทธิภาพน้อยกว่าผ้าขนหนูเพราะผ้าบาง แต่ยังดีกว่าไม่มีการป้องกันใดเลย",
    explanationJp: "濡れた衣服を重ねて顔に当てると、粉塵や煙を初期的にフィルタリングできます。タオルより薄いため効果は低いですが、何もないよりはるかに安全です。"
  },
  {
    id: "foil_dust_seal", items: ["blanket","tape"], tags: ["dust"], scoreBonus: 7,
    resultName: "Foil Dust Seal", description: "ผ้าห่ม+เทปปิดช่องว่าง",
    explanationTh: "ใช้ผ้าห่มปิดช่องประตูหน้าต่างแล้วติดเทปรอบขอบ ป้องกันฝุ่นและควันซึมเข้าห้องหลบภัย ช่วยให้รักษาอากาศในห้องให้ใช้ได้นานขึ้นหลายชั่วโมง",
    explanationJp: "毛布でドアや窓の隙間を塞いでテープで固定すると、避難場所への粉塵や煙の侵入を防ぎます。室内の空気を数時間分長持ちさせる効果があります。"
  },
  {
    id: "tissue_filter", items: ["tissues","water"], tags: ["dust","smoke"], scoreBonus: 4,
    resultName: "Tissue Filter", description: "ทิชชู่เปียกกรองฝุ่น",
    explanationTh: "ทิชชู่เปียกพับหนาหลายชั้นปิดจมูกปากกรองอนุภาคขนาดใหญ่ได้เบื้องต้น เป็นทางเลือกสุดท้ายเมื่อไม่มีผ้าหรืออุปกรณ์อื่น — ต้องเปลี่ยนบ่อยเพราะอุดตันเร็ว",
    explanationJp: "濡らしたティッシュを重ねて口と鼻を覆う最終手段です。大きな粒子はある程度防げますが、すぐに目詰まりするので頻繁に交換が必要です。"
  },

  // ── FIRST AID ─────────────────────────────────────────────────────────
  {
    id: "towel_bandage", items: ["towel","tape"], tags: ["injury","medical"], scoreBonus: 12,
    resultName: "Emergency Bandage", description: "ผ้าขนหนู+เทป",
    explanationTh: "ผ้าขนหนูนำมาพับกดบนแผล แล้วใช้เทปรัดตรึง ช่วยห้ามเลือดด้วยแรงกดและป้องกันเชื้อโรค ผ้าขนหนูดูดซับได้มากกว่าผ้าบาง เหมาะกับแผลที่มีเลือดออกมาก",
    explanationJp: "タオルを折りたたんで傷口に当て、テープで固定します。圧迫で止血しながら感染を防ぎます。吸収力が高く、出血量の多い傷に適しています。"
  },
  {
    id: "clothes_sling", items: ["clothes","rope"], tags: ["injury","medical"], scoreBonus: 8,
    resultName: "Arm Sling", description: "เสื้อ+เชือกพยุง",
    explanationTh: "เสื้อขนาดใหญ่พับเป็นสามเหลี่ยมทำเป็นผ้าคล้องแขน ใช้เชือกมัดผูกรอบคอ รองรับแขนหรือไหล่ที่บาดเจ็บ ลดแรงดึงบนข้อต่อและป้องกันการบาดเจ็บเพิ่มเติมขณะเดิน",
    explanationJp: "大きな衣服を三角形に折ってアームスリングを作り、ロープで首に固定します。負傷した腕や肩を支え、移動中の追加損傷を防ぎます。"
  },
  {
    id: "book_splint", items: ["book","tape"], tags: ["injury","medical"], scoreBonus: 14,
    resultName: "Book Splint", description: "หนังสือหนา+เทป",
    explanationTh: "หนังสือหนาแข็งแกร่งวางข้างขาหรือแขน ใช้เทปพันตรึงไว้ ทำหน้าที่เหมือนเฝือกชั่วคราว ยึดกระดูกที่อาจหักให้อยู่นิ่ง ลดความเจ็บปวดและป้องกันการเคลื่อนที่ผิดจุดขณะเคลื่อนย้าย",
    explanationJp: "厚い本を患部の側面に当て、テープで固定して即席のギプスを作ります。骨折部位を固定し、移動中の痛みを軽減して骨のずれを防ぎます。"
  },
  {
    id: "textbook_splint", items: ["japanese_textbook","tape"], tags: ["injury","medical"], scoreBonus: 14,
    resultName: "Book Splint (Textbook)", description: "หนังสือเรียน+เทป",
    explanationTh: "หนังสือเรียนญี่ปุ่นปกแข็งหนาและแข็งแรง ใช้เป็นเฝือกชั่วคราวได้ดีเหมือนหนังสือทั่วไป ผนึกด้วยเทปให้กระดูกอยู่นิ่งระหว่างรอรับการรักษา",
    explanationJp: "日本語教科書の硬い表紙は即席ギプスに最適です。テープで固定して骨折部位を安定させ、正式な治療を受けるまでの間、骨のずれを防ぎます。"
  },
  {
    id: "map_leg_support", items: ["paper_map","rope"], tags: ["injury","medical"], scoreBonus: 10,
    resultName: "Map Leg Support", description: "ม้วนแผนที่+เชือก",
    explanationTh: "แผนที่กระดาษม้วนแน่นเป็นแท่งแข็ง ผูกด้วยเชือกเป็นเฝือกขาชั่วคราว ตรึงขาที่บาดเจ็บให้เคลื่อนย้ายผู้บาดเจ็บได้โดยไม่ทำให้กระดูกเคลื่อนหรืออาการแย่ลง",
    explanationJp: "地図をしっかり丸めて硬い棒状にし、ロープで足に固定して即席の副木を作ります。骨折した足を安定させ、患者を安全に移動できるようにします。"
  },
  {
    id: "book_splint2", items: ["book","towel"], tags: ["injury","medical"], scoreBonus: 14,
    resultName: "Improvised Splint", description: "เฝือกนุ่มชั่วคราว",
    explanationTh: "ผ้าขนหนูพันรอบแขน/ขาก่อนวางหนังสือข้างๆ เพื่อกันผิวหนังจากขอบแหลม ผ้าช่วยรองรับและดูดซับแรงกระแทก ทำให้เฝือกนุ่มและสวมได้สบายขึ้น",
    explanationJp: "タオルを患部に巻いてから本で挟むことで、皮膚への圧迫を和らげた柔らかいギプスになります。タオルがクッションの役割を果たし、より快適で安全な固定ができます。"
  },

  // ── LIGHT ──────────────────────────────────────────────────────────────
  {
    id: "phone_powerbank", items: ["powerbank","flashlight"], tags: ["dark","blackout"], scoreBonus: 15,
    resultName: "Extended Flashlight", description: "พาวเวอร์แบงก์ชาร์จไฟฉาย",
    explanationTh: "พาวเวอร์แบงก์ชาร์จแบตไฟฉายระหว่างใช้งาน ทำให้มีแสงสว่างได้ต่อเนื่องตลอดคืน ไม่ต้องกังวลแบตหมด — สำคัญมากในภาวะไฟดับระยะยาวที่ต้องส่องทางและตรวจสอบความเสียหาย",
    explanationJp: "モバイルバッテリーで懐中電灯を充電しながら使うことで、停電が長引いても途切れない照明を確保できます。夜間の移動や被害確認に非常に重要です。"
  },
  {
    id: "lantern_diy", items: ["flashlight","water"], tags: ["dark","blackout"], scoreBonus: 8,
    resultName: "DIY Lantern", description: "ขวดน้ำกระจายแสง",
    explanationTh: "วางขวดน้ำใสครอบหัวไฟฉาย แสงผ่านน้ำกระจายออกรอบทิศทางคล้ายโคมไฟ แทนที่จะเป็นลำแสงแคบตรง ส่องสว่างพื้นที่กว้างกว่า เหมาะสำหรับใช้ในห้องหรือพื้นที่ต้องการแสงกระจาย",
    explanationJp: "水入りボトルを懐中電灯の上に置くと、光が水中で拡散してランタンのように全方向を照らします。狭い光の束より広い範囲を照らせるため、室内での作業に最適です。"
  },
  {
    id: "lantern_diy2", items: ["flashlight","water_bottle"], tags: ["dark","blackout"], scoreBonus: 8,
    resultName: "DIY Lantern (Empty Bottle)", description: "ขวดเปล่ากระจายแสง",
    explanationTh: "ขวดน้ำเปล่าใสครอบไฟฉาย ผนังขวดพลาสติกกระจายแสงออกรอบด้าน ให้แสงสม่ำเสมอคล้ายโคมไฟ ขวดเปล่ากระจายได้ดีกว่าขวดมีน้ำบางมุม",
    explanationJp: "空の透明ボトルを懐中電灯に被せると、プラスチックが光を拡散させてランタンになります。水なしでも均一な光が得られ、場合によっては水入りより拡散効果が高いです。"
  },
  {
    id: "reflector_spotlight", items: ["flashlight","foil"], tags: ["dark","blackout"], scoreBonus: 8,
    resultName: "Reflector Spotlight", description: "ฟอยล์สะท้อนแสงไฟฉาย",
    explanationTh: "ฟอยล์อลูมิเนียมม้วนรอบหัวไฟฉายสะท้อนแสงให้เข้มข้นและส่องไกลขึ้น ใช้ส่งสัญญาณขอความช่วยเหลือถึงทีมกู้ภัยในระยะไกล หรือส่องสว่างเฉพาะจุดที่ต้องการ",
    explanationJp: "アルミホイルを懐中電灯の周りに巻くと、光を集束させてより遠くまで届くスポットライトになります。救助隊への信号送信や遠距離の特定箇所を照らすのに有効です。"
  },
  {
    id: "tissue_torch", items: ["lighter","tissues"], tags: ["dark"], scoreBonus: 3,
    resultName: "Tissue Torch", description: "คบเพลิงทิชชู่ (เสี่ยง)",
    explanationTh: "ทิชชู่จุดไฟด้วยไฟแช็กทำเป็นคบเพลิงชั่วคราว ให้แสงสว่างได้เพียง 10–30 วินาที — ใช้เฉพาะเมื่อไม่มีตัวเลือกอื่นใดเลย ระวังไฟลามไปติดสิ่งอื่น",
    explanationJp: "ティッシュにライターで火をつけて仮の松明を作ります。10〜30秒しか持ちません。他に選択肢がない場合の最終手段で、火災に注意が必要です。"
  },

  // ── WEATHER ────────────────────────────────────────────────────────────
  {
    id: "trashbag_rain", items: ["trash_bag","tape"], tags: ["rain","cold"], scoreBonus: 14,
    resultName: "DIY Raincoat", description: "ถุงขยะ+เทปทำเสื้อกันฝน",
    explanationTh: "ตัดรูที่คอและแขนของถุงขยะ ใช้เทปซีลรอยขาด สวมเป็นเสื้อกันฝนกันน้ำและลมหนาว รักษาอุณหภูมิร่างกายป้องกันภาวะตัวเย็นเกิน (Hypothermia) เมื่อต้องอยู่กลางแจ้ง",
    explanationJp: "ゴミ袋に首と腕の穴を開け、テープで補強して即席のレインコートを作ります。雨と冷風から体を守り、屋外にいる際の低体温症を防ぎます。"
  },
  {
    id: "foil_body_wrap", items: ["blanket","rope"], tags: ["cold"], scoreBonus: 10,
    resultName: "Foil Body Wrap", description: "ผ้าห่มมัดด้วยเชือก",
    explanationTh: "ผ้าห่มพันรอบร่างกายแล้วใช้เชือกมัดไว้ไม่ให้หลุด กักความร้อนจากร่างกายไว้ภายใน ป้องกันภาวะตัวเย็นเกินในคืนที่อุณหภูมิลดลงหลังแผ่นดินไหว",
    explanationJp: "毛布を体に巻き付け、ロープで固定して体温を保持します。地震後の寒い夜に低体温症を予防する効果的な方法です。"
  },
  {
    id: "paper_insulation", items: ["paper_map","tape"], tags: ["cold"], scoreBonus: 6,
    resultName: "Paper Insulation", description: "กระดาษบุในเสื้อ",
    explanationTh: "กระดาษพับแล้วบุในชั้นเสื้อผ้า กระดาษกักชั้นอากาศเล็กๆ ไว้เป็นฉนวนความร้อน ช่วยลดการสูญเสียความร้อนจากร่างกายได้ระดับหนึ่ง เป็นวิธีเอาตัวรอดเบื้องต้น",
    explanationJp: "折りたたんだ紙を衣服の内側に詰めます。紙が小さな空気層を作り断熱効果を発揮して、体からの熱の放散を減らします。"
  },

  // ── RESCUE / CLEARING ──────────────────────────────────────────────────
  {
    id: "rope_crowbar_pull", items: ["rope","crowbar"], tags: ["heavy_object","rescue"], scoreBonus: 18,
    resultName: "Lever & Rope Rescue", description: "ชะแลง+เชือกงัดซาก",
    explanationTh: "ชะแลงวางใต้ซากสร้างคานงัด แล้วใช้เชือกผูกดึงช่วยขยายแรงหลายเท่า สามารถเคลื่อนย้ายเศษซากหนักกว่าแรงคนปกติมาก — หลักการทางฟิสิกส์ 'คานงัด' ช่วยกู้ผู้ติดอยู่ใต้ซากได้",
    explanationJp: "バールをてこにしてロープで引くと、一人では動かせない重い瓦礫を動かせます。テコの原理で力を何倍にも増幅させて、がれきに閉じ込められた人を救助できます。"
  },
  {
    id: "crowbar_pliers", items: ["crowbar","pliers"], tags: ["heavy_object","rescue"], scoreBonus: 16,
    resultName: "Lever System", description: "ชะแลง+คีมทำงานร่วมกัน",
    explanationTh: "ชะแลงงัดสร้างช่องว่างในซาก คีมปากเบ็ดดึงชิ้นส่วนเล็กๆ หรือโลหะงอออก ทำงานร่วมกันได้ดีกว่าใช้อย่างใดอย่างหนึ่ง เพราะชะแลงจัดการวัตถุใหญ่ คีมจัดการส่วนที่ชะแลงเข้าไม่ถึง",
    explanationJp: "バールで隙間を作り、万能ハサミで小さな部品や変形した金属を引き抜きます。二つの工具が互いの弱点を補い合い、単独より効果的にがれきを除去できます。"
  },
  {
    id: "rope_heavy_pull", items: ["rope","extinguisher"], tags: ["heavy_object"], scoreBonus: 8,
    resultName: "Weight & Rope Pull", description: "เชือก+ถังดับเพลิง",
    explanationTh: "ผูกเชือกกับถังดับเพลิงหนักเป็นน้ำหนักถ่วง หรือใช้ถังเป็นจุดยึดสร้างรอกชั่วคราว ดึงหรือเลื่อนวัตถุหนักได้ เหมาะเมื่อไม่มีชะแลงแต่มีเชือกและวัตถุหนัก",
    explanationJp: "消火器の重さを利用してロープと組み合わせ、重い物体を引っ張る即席の滑車システムを作ります。バールがない場合でも重量物を動かせます。"
  },

  // ── SIGNAL ─────────────────────────────────────────────────────────────
  {
    id: "flashlight_wipes", items: ["flashlight","wipes"], tags: ["crowd","signal"], scoreBonus: 9,
    resultName: "Signal Baton", description: "ผ้าเปียกคลุมไฟฉาย",
    explanationTh: "ผ้าเปียกคลุมหัวไฟฉายกระจายแสงให้มองเห็นจากหลายมุม โบกซ้ายขวาส่งสัญญาณ SOS — แสงกระจายมองเห็นได้ไกลกว่าลำแสงตรง โดยเฉพาะในสภาพอากาศมีหมอกหรือควัน",
    explanationJp: "濡れた布で懐中電灯を覆うと光が拡散して多方向から見えます。振ることでSOS信号を送れます。霧や煙の中でも直線光より遠くから視認できます。"
  },
  {
    id: "cash_flashlight", items: ["cash","ready_eat"], tags: ["crowd","signal"], scoreBonus: 6,
    resultName: "Noise Maker (Can)", description: "เหรียญในกระป๋องส่งเสียง",
    explanationTh: "ใส่เหรียญในกระป๋องอาหารเขย่าสร้างเสียงดังชัดเจน ใช้ส่งสัญญาณขอความช่วยเหลือหรือดึงดูดความสนใจ มีประโยชน์เมื่อตะโกนไม่ได้เพราะฝุ่นหรือหมดแรง",
    explanationJp: "空き缶にコインを入れて振ると大きな音を出せます。叫べない状況でも救助信号を送ったり周囲の注意を引いたりできます。"
  },
  {
    id: "cash_flashlight2", items: ["cash","water_bottle"], tags: ["crowd","signal"], scoreBonus: 6,
    resultName: "Noise Maker (Bottle)", description: "เหรียญในขวดน้ำ",
    explanationTh: "เหรียญในขวดพลาสติกส่งเสียงแหลมดังชัด พลาสติกสั่นสะเทือนได้ดีกว่ากระป๋องในบางสภาพ และขวดมีน้ำหนักที่เหมาะเขย่าได้สะดวก ใช้ส่งสัญญาณหรือเรียกความสนใจ",
    explanationJp: "ペットボトルにコインを入れて振ると高い音が出ます。プラスチックが振動を増幅し、缶より聞こえやすい場合もあります。救助信号や注意喚起に使えます。"
  },
  {
    id: "notepad_docs", items: ["notepad","docs"], tags: ["crowd","signal"], scoreBonus: 8,
    resultName: "Emergency Sign Board", description: "ป้ายขอความช่วยเหลือ",
    explanationTh: "เขียนข้อความลงสมุดหน้าใหญ่แสดงชื่อ จำนวนผู้รอดชีวิต ตำแหน่ง และสถานะการบาดเจ็บ ให้ทีมกู้ภัยเห็นชัดจากระยะไกล แสดงไว้ที่หน้าต่างหรือหลังคา",
    explanationJp: "ノートに名前、生存者数、位置、負傷状況を大きく書いて救助隊に見せます。遠くからでも読めるよう窓や屋根に掲示します。"
  },
  {
    id: "sos_signal", items: ["whistle","flashlight"], tags: ["crowd","signal"], scoreBonus: 12,
    resultName: "SOS Signal Duo", description: "นกหวีด+ไฟฉายส่งทั้งเสียงและแสง",
    explanationTh: "นกหวีดส่ง 3 เสียงสั้น-3 ยาว-3 สั้น (SOS สากล) ขณะเดียวกันไฟฉายกระพริบรหัสเดียวกัน ส่งสัญญาณพร้อมกันทั้งเสียงและแสง ช่วยให้ทีมกู้ภัยระบุตำแหน่งได้เร็วขึ้นมาก",
    explanationJp: "笛で3短3長3短（国際SOSモールス）を吹きながら懐中電灯でも同じ信号を発します。音と光の両方で同時にSOS信号を送ることで、救助隊が位置を素早く特定できます。"
  },
  {
    id: "notepad_docs2", items: ["marker_pen","notepad"], tags: ["crowd","signal"], scoreBonus: 10,
    resultName: "Emergency Sign Board (Marker)", description: "ปากกาเมจิกเขียนป้ายชัดเจน",
    explanationTh: "ปากกาเมจิกเขียนตัวอักษรใหญ่ดำตัดสีบนกระดาษขาว มองเห็นได้ชัดเจนจากระยะ 50–100 เมตร เขียนข้อมูลสำคัญ: ชื่อ จำนวนคน ตำแหน่ง ความต้องการเร่งด่วน",
    explanationJp: "マーカーで白紙に大きく黒い文字を書くと、50〜100m先からでも視認できます。名前、人数、位置、緊急ニーズを書いて窓や高い場所に掲示します。"
  },

  // ── HYGIENE / WATER ────────────────────────────────────────────────────
  {
    id: "water_towel_filter", items: ["water","towel"], tags: ["hygiene","water"], scoreBonus: 7,
    resultName: "Water Filter", description: "ผ้าขนหนูกรองน้ำ",
    explanationTh: "รินน้ำผ่านผ้าขนหนูพับหนาหลายชั้น เส้นใยกรองอนุภาคตะกอน ดิน และสิ่งสกปรกขนาดใหญ่ออก น้ำที่ผ่านกรองยังต้องต้มก่อนดื่ม แต่ดีกว่าน้ำขุ่นที่ไม่ได้กรองเลย",
    explanationJp: "水を何重にも折りたたんだタオルでろ過すると、泥や大きな不純物を取り除けます。飲む前に煮沸が必要ですが、ろ過しない水より安全です。"
  },
  {
    id: "gel_towel_hygiene", items: ["hand_gel","towel"], tags: ["hygiene"], scoreBonus: 9,
    resultName: "Body Hygiene Kit", description: "เจลแอลกอฮอล์+ผ้าเช็ดตัว",
    explanationTh: "เทเจลแอลกอฮอล์บนผ้าขนหนูเช็ดร่างกาย มือ และบาดแผล ฆ่าเชื้อแบคทีเรียโดยไม่ต้องใช้น้ำ — สำคัญมากเมื่อน้ำขาดแคลน ป้องกันการติดเชื้อในภาวะฉุกเฉิน",
    explanationJp: "アルコールジェルをタオルに付けて体、手、傷口を拭きます。水なしで殺菌でき、水が不足している緊急時に感染症を予防する重要な方法です。"
  },
  {
    id: "bag_wrap_collector", items: ["trash_bag","wrap"], tags: ["water","hygiene"], scoreBonus: 10,
    resultName: "Rain Collector", description: "ถุงขยะ+พลาสติกเก็บน้ำฝน",
    explanationTh: "ถุงขยะขนาดใหญ่วางรับน้ำฝนกลางแจ้ง ใช้ฟิล์มพลาสติกเสริมเป็นรางนำน้ำเข้าถุง สะสมน้ำฝนสำหรับใช้ล้างหรือต้มดื่ม เป็นแหล่งน้ำทดแทนเมื่อระบบประปาขาดช่วง",
    explanationJp: "大きなゴミ袋とプラスチックシートで雨水収集システムを作ります。集めた雨水は煮沸して飲料水にしたり、洗浄に使えます。断水時の貴重な水源になります。"
  },

  // ── MENTAL ─────────────────────────────────────────────────────────────
  {
    id: "blanket_comfort", items: ["blanket","candy"], tags: ["panic","stress","mental"], scoreBonus: 12,
    resultName: "Comfort Kit", description: "ผ้าห่ม+ลูกอมบรรเทาเครียด",
    explanationTh: "ผ้าห่มให้ความอบอุ่นทางกายและจิตใจ ลูกอมให้น้ำตาลกระตุ้นพลังงานและสารโดพามีนช่วยให้รู้สึกดีขึ้น การรวมกันลดอาการตึงเครียดและตื่นตระหนก ช่วยให้คิดและตัดสินใจได้ชัดขึ้น",
    explanationJp: "毛布の温かさが体と心を安定させ、飴の糖分がエネルギーとドーパミンを補給します。この組み合わせがパニックや緊張を和らげ、冷静な判断力を取り戻す助けになります。"
  },
  {
    id: "calming_kit", items: ["common_med","candy"], tags: ["panic","stress","mental"], scoreBonus: 12,
    resultName: "Calming Kit", description: "ยาสามัญ+ลูกอมลดตื่นตระหนก",
    explanationTh: "ยาสามัญบรรเทาอาการเจ็บปวดทางกายที่เพิ่มความเครียด ลูกอมให้น้ำตาลและการเคี้ยวช่วยลดความวิตกกังวล การรวมกันจัดการทั้งอาการทางกายและจิตใจ ทำให้สงบลงได้เร็วกว่า",
    explanationJp: "薬が身体的な痛みを和らげてストレスを軽減し、飴の糖分と噛む動作が不安を鎮めます。身体と精神の両面から対処することで、より早く落ち着きを取り戻せます。"
  },
  {
    id: "booster_pack", items: ["coffee","ready_eat"], tags: ["panic","stress","mental"], scoreBonus: 15,
    resultName: "Booster Pack", description: "กาแฟ+อาหารเติมพลัง",
    explanationTh: "อาหารพร้อมทานเติมพลังงานและคาร์โบไฮเดรตที่ร่างกายต้องการ กาแฟเพิ่มคาเฟอีนกระตุ้นความตื่นตัวและสมาธิ ทำงานร่วมกันให้พลังงานยั่งยืน ช่วยให้คิดและตัดสินใจได้ดีในภาวะฉุกเฉิน",
    explanationJp: "食事で必要なカロリーと炭水化物を補給し、コーヒーのカフェインで覚醒と集中力を高めます。この組み合わせで持続的なエネルギーを確保し、緊急時の判断力を維持できます。"
  },
  {
    id: "notepad_family", items: ["notepad","family_photo"], tags: ["mental","stress"], scoreBonus: 14,
    resultName: "Memory Support", description: "สมุด+รูปครอบครัวสร้างแรงใจ",
    explanationTh: "ดูรูปครอบครัวเพื่อระลึกถึงสิ่งที่ต้องต่อสู้เพื่อ เขียนบันทึกความรู้สึกและแผนการในสมุด ช่วยลดความรู้สึกสิ้นหวัง สร้างแรงจูงใจในการเอาชีวิตรอด และรักษาสภาพจิตใจให้มั่นคง",
    explanationJp: "家族写真を見て生きる理由を思い出し、ノートに気持ちや計画を書くことで精神的な安定を保ちます。絶望感を減らし、生き延びるための意欲と精神的な強さを維持します。"
  },
  {
    id: "easter_eggs", items: ["sensei_photo","japanese_textbook"], tags: ["mental","stress"], scoreBonus: 20,
    resultName: "The Sensei Easter Eggs", description: "ไข่อีสเตอร์พิเศษ — สองสิ่งที่เชื่อมกัน",
    explanationTh: "รูปอาจารย์และหนังสือเรียนภาษาญี่ปุ่น — สองสิ่งที่เชื่อมโยงกันอย่างลึกซึ้ง เห็นรูปอาจารย์นึกถึงบทเรียน เปิดหนังสือทบทวนความรู้ การรวมกันสร้างแรงบันดาลใจอย่างไม่คาดคิด ให้กำลังใจในยามวิกฤต!",
    explanationJp: "先生の写真と日本語教科書——深くつながる二つのもの。先生の顔を見て教えを思い出し、教科書を開いて知識を振り返ります。この組み合わせが逆境の中で特別なインスピレーションと勇気をもたらします！"
  }
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
