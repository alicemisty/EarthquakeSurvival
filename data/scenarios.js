// data/scenarios.js
// Earthquake survival scenarios.
// answerMode: "text" = answer by reading choices.
// answerMode: "inventory" = select direct or adapted inventory items.

export const scenarios = [
  {
    "id": "p2_drop_cover",
    "phase": 2,
    "type": "quiz",
    "title": "Drop, Cover, Hold On",
    "jp": "【強い揺れ】床が大きく揺れ、立っていられません。",
    "th": "พื้นสั่นแรงจนยืนไม่อยู่ สิ่งของเริ่มตกจากชั้นวาง",
    "answerMode": "text",
    "image": "images/p2_drop_cover.png",
    "choices": [
      {
        "text": "หมอบต่ำ หลบใต้โต๊ะ และป้องกันศีรษะ",
        "textJp": "机の下で身を守る",
        "result": "perfect",
        "score": 30,
        "hp": 0,
        "mana": 10,
        "explanationTh": "ถูกต้อง เพราะลดโอกาสโดนของตกใส่และไม่เสี่ยงล้มระหว่างวิ่ง",
        "explanationJp": "正解。落下物と転倒の危険を減らせます。"
      },
      {
        "text": "รีบวิ่งไปที่ประตูทันที",
        "textJp": "すぐ出口へ走る",
        "result": "bad",
        "score": -20,
        "hp": -25,
        "mana": -10,
        "explanationTh": "อันตราย เพราะระหว่างสั่นอาจล้ม ถูกกระจกหรือของตกใส่ ควรรอให้แรงสั่นหยุดก่อน",
        "explanationJp": "危険。揺れの最中に走ると転倒や落下物の危険があります。"
      },
      {
        "text": "ยืนใกล้หน้าต่างเพื่อดูสถานการณ์",
        "textJp": "窓の近くに立つ",
        "result": "bad",
        "score": -20,
        "hp": -35,
        "mana": -10,
        "explanationTh": "อันตรายมาก กระจกอาจแตกกระเด็น ให้ถอยจากหน้าต่างและป้องกันศีรษะ",
        "explanationJp": "窓ガラスが割れる恐れがあります。窓から離れてください。"
      }
    ]
  },
  {
    "id": "p2_falling_fridge",
    "phase": 2,
    "type": "quiz",
    "title": "Falling Refrigerator",
    "jp": "【冷蔵庫の転倒】大きな冷蔵庫が倒れそうです。",
    "th": "ตู้เย็นขนาดใหญ่กำลังเอนล้มเข้าหาทางเดิน",
    "answerMode": "text",
    "image": "images/p2_fridge.png",
    "choices": [
      {
        "text": "ถอยออกด้านข้างให้พ้นแนวล้ม",
        "textJp": "倒れる方向から離れる",
        "result": "perfect",
        "score": 30,
        "hp": 0,
        "mana": 5,
        "explanationTh": "ถูกต้อง การหลบออกจากแนวล้มปลอดภัยกว่าการฝืนรับน้ำหนัก",
        "explanationJp": "正解。倒れる方向から離れることが最優先です。"
      },
      {
        "text": "ใช้มือดันตู้เย็นไว้",
        "textJp": "手で支える",
        "result": "bad",
        "score": -20,
        "hp": -40,
        "mana": -20,
        "explanationTh": "อันตราย น้ำหนักมากเกินกว่าจะรับได้ อาจถูกทับหรือบาดเจ็บรุนแรง",
        "explanationJp": "危険。重い家電は人の力では支えられません。"
      }
    ]
  },
  {
    "id": "p2_blackout",
    "phase": 2,
    "type": "item",
    "title": "Blackout",
    "jp": "【停電】建物の明かりがすべて消えました。",
    "th": "ไฟดับทั้งอาคาร เศษแก้วและของตกพื้นมองเห็นยาก",
    "answerMode": "inventory",
    "image": "images/p2_blackout.png",
    "coreItems": [
      "flashlight"
    ],
    "substituteItems": [
      "powerbank",
      "__phone__"
    ],
    "comboItems": [
      [
        "flashlight",
        "water"
      ],
      [
        "powerbank",
        "__phone__"
      ]
    ],
    "scoring": {
      "flashlight": {
        "score": 35,
        "hp": 0,
        "mana": 0,
        "useType": "direct",
        "explanationTh": "ไฟฉายเป็นอุปกรณ์ตรงสถานการณ์ ปลอดภัยและประหยัดแบตมือถือ",
        "explanationJp": "懐中電灯は安全で、スマホの電池を節約できます。"
      },
      "powerbank": {
        "score": 24,
        "hp": -4,
        "mana": 0,
        "useType": "adapt",
        "explanationTh": "ใช้พาวเวอร์แบงก์ช่วยยืดเวลาเปิดไฟมือถือ เป็นการประยุกต์ที่ใช้ได้",
        "explanationJp": "モバイルバッテリーでスマホライトを長く使えます。"
      },
      "__phone__": {
        "score": 18,
        "hp": -6,
        "mana": -4,
        "useType": "adapt",
        "explanationTh": "มือถือใช้แทนได้ชั่วคราว แต่ต้องประหยัดแบตไว้รับข่าวสาร",
        "explanationJp": "スマホライトは代用できますが、電池を節約しましょう。"
      }
    }
  },
  {
    "id": "p2_glass",
    "phase": 2,
    "type": "item",
    "title": "Shattered Glass",
    "jp": "【ガラスの飛散】割れたガラスが床に散っています。",
    "th": "เศษกระจกแตกกระจายบนพื้นและอาจบาดมือหรือเท้า",
    "answerMode": "inventory",
    "image": "images/p2_glass.png",
    "coreItems": [
      "helmet",
      "gunte",
      "shoes"
    ],
    "substituteItems": [
      "towel",
      "book"
    ],
    "comboItems": [
      [
        "towel",
        "tape"
      ],
      [
        "book",
        "tape"
      ]
    ],
    "scoring": {
      "helmet": {
        "score": 35,
        "hp": 5,
        "mana": 0,
        "useType": "direct",
        "explanationTh": "หมวกกันน็อกช่วยลดการบาดเจ็บจากของตกใส่ศีรษะ",
        "explanationJp": "ヘルメットは頭部を守ります。"
      },
      "gunte": {
        "score": 32,
        "hp": 0,
        "mana": 0,
        "useType": "direct",
        "explanationTh": "ถุงมือหนาช่วยจับของมีคมหรือเปิดทางโดยลดการบาดมือ",
        "explanationJp": "厚手の手袋は手を保護します。"
      },
      "shoes": {
        "score": 30,
        "hp": 0,
        "mana": 0,
        "useType": "direct",
        "explanationTh": "รองเท้าพื้นหนาช่วยเดินผ่านเศษกระจกได้ปลอดภัยขึ้น",
        "explanationJp": "厚底の靴は足を守ります。"
      },
      "towel": {
        "score": 18,
        "hp": -5,
        "mana": 0,
        "useType": "adapt",
        "explanationTh": "ผ้าขนหนูพันมือหรือปัดเศษเล็กได้ แต่ป้องกันไม่เท่าถุงมือ",
        "explanationJp": "タオルは代用できますが、手袋ほど安全ではありません。"
      }
    }
  },
  {
    "id": "p2_panic",
    "phase": 2,
    "type": "quiz",
    "title": "Crowd Panic",
    "jp": "【教室のパニック】周りの人が走り出しそうです。",
    "th": "คนรอบตัวเริ่มแตกตื่นและจะวิ่งออกพร้อมกัน",
    "answerMode": "text",
    "image": "images/p2_panic.png",
    "choices": [
      {
        "text": "พูดสั้น ๆ ให้ทุกคนหยุด หมอบต่ำ และป้องกันหัว",
        "textJp": "短く落ち着いて指示する",
        "result": "perfect",
        "score": 35,
        "hp": 0,
        "mana": 20,
        "explanationTh": "ถูกต้อง คำสั่งสั้นและสงบช่วยลดพฤติกรรมตื่นตระหนก",
        "explanationJp": "正解。短い指示はパニックを抑えます。"
      },
      {
        "text": "วิ่งตามฝูงชนให้เร็วที่สุด",
        "textJp": "群衆について走る",
        "result": "bad",
        "score": -20,
        "hp": -15,
        "mana": -20,
        "explanationTh": "อันตราย ฝูงชนที่วิ่งพร้อมกันเพิ่มโอกาสล้มและเหยียบกัน",
        "explanationJp": "危険。群衆の転倒事故につながります。"
      }
    ]
  },
  {
    "id": "p2_elevator",
    "phase": 2,
    "type": "quiz",
    "title": "Elevator Trap",
    "jp": "【エレベーターの罠】誰かがエレベーターで逃げようとしています。",
    "th": "มีคนกำลังจะใช้ลิฟต์หนีลงจากอาคาร",
    "answerMode": "text",
    "image": "images/p2_elevator.png",
    "choices": [
      {
        "text": "ห้ามใช้ลิฟต์และให้ใช้บันไดเมื่อแรงสั่นหยุด",
        "textJp": "エレベーターを使わない",
        "result": "perfect",
        "score": 30,
        "hp": 0,
        "mana": 15,
        "explanationTh": "ถูกต้อง ลิฟต์เสี่ยงค้างระหว่างไฟดับหรือ aftershock",
        "explanationJp": "正解。停止や閉じ込めの危険があります。"
      },
      {
        "text": "ขึ้นลิฟต์เพราะเร็วกว่า",
        "textJp": "速いので乗る",
        "result": "bad",
        "score": -20,
        "hp": -30,
        "mana": -40,
        "explanationTh": "อันตรายมาก หากลิฟต์ค้างจะขอความช่วยเหลือยากและเสี่ยง aftershock",
        "explanationJp": "危険。閉じ込められる恐れがあります。"
      }
    ]
  },
  {
    "id": "p2_chandelier",
    "phase": 2,
    "type": "item",
    "title": "Falling Chandelier",
    "jp": "【照明の落下】大きな照明が揺れています。",
    "th": "โคมไฟขนาดใหญ่เหนือศีรษะกำลังแกว่งและอาจหล่น",
    "answerMode": "inventory",
    "image": "images/p2_chandelier.png",
    "coreItems": [
      "helmet"
    ],
    "substituteItems": [
      "book",
      "blanket"
    ],
    "comboItems": [
      [
        "blanket",
        "tape"
      ],
      [
        "book",
        "tape"
      ]
    ],
    "scoring": {
      "helmet": {
        "score": 40,
        "hp": 10,
        "mana": 0,
        "useType": "direct",
        "explanationTh": "หมวกช่วยรับแรงกระแทกจากของหล่น",
        "explanationJp": "ヘルメットは落下物から頭を守ります。"
      },
      "book": {
        "score": 18,
        "hp": -8,
        "mana": 0,
        "useType": "adapt",
        "explanationTh": "หนังสือหนายกบังหัวได้ชั่วคราว แต่ต้องรีบออกจากแนวตก",
        "explanationJp": "厚い本は一時的な代用です。"
      }
    }
  },
  {
    "id": "p2_blocked_exit",
    "phase": 2,
    "type": "item",
    "title": "Blocked Exit",
    "jp": "【出口がふさがれた】棚が倒れて出口をふさいでいます。",
    "th": "ชั้นวางล้มขวางทางออกหลัก ต้องเปิดทางอย่างระวัง",
    "answerMode": "inventory",
    "image": "images/p2_blocked_exit.png",
    "coreItems": [
      "crowbar"
    ],
    "substituteItems": [
      "rope",
      "pliers"
    ],
    "comboItems": [
      [
        "crowbar",
        "pliers"
      ],
      [
        "rope",
        "crowbar"
      ]
    ],
    "scoring": {
      "crowbar": {
        "score": 40,
        "hp": 0,
        "mana": 0,
        "useType": "direct",
        "explanationTh": "ชะแลงเป็นเครื่องมืองัดเปิดทางโดยใช้แรงน้อยลง",
        "explanationJp": "バールは少ない力で障害物を動かせます。"
      },
      "rope": {
        "score": 22,
        "hp": -5,
        "mana": 0,
        "useType": "adapt",
        "explanationTh": "เชือกช่วยดึงจากระยะปลอดภัย แต่ควรมีจุดยึดมั่นคง",
        "explanationJp": "ロープで安全距離を取って引けます。"
      }
    }
  },
  {
    "id": "p2_kitchen_fire",
    "phase": 2,
    "type": "item",
    "title": "Kitchen Fire",
    "jp": "【キッチン火災】台所から小さな火が出ました。",
    "th": "ไฟเริ่มลุกในครัวจากอุปกรณ์ที่ล้ม",
    "answerMode": "inventory",
    "image": "images/p2_kitchen_fire.png",
    "coreItems": [
      "extinguisher"
    ],
    "substituteItems": [
      "blanket",
      "towel"
    ],
    "comboItems": [
      [
        "towel",
        "water"
      ],
      [
        "blanket",
        "tape"
      ]
    ],
    "scoring": {
      "extinguisher": {
        "score": 45,
        "hp": 5,
        "mana": 0,
        "useType": "direct",
        "explanationTh": "ถังดับเพลิงเหมาะที่สุดกับไฟเริ่มต้น แต่ต้องหันทางออกไว้เสมอ",
        "explanationJp": "初期火災には消火器が有効です。"
      },
      "blanket": {
        "score": 25,
        "hp": -5,
        "mana": 0,
        "useType": "adapt",
        "explanationTh": "ผ้าห่มช่วยคลุมไฟเล็กได้ แต่เสี่ยงถ้าไฟลามแล้ว",
        "explanationJp": "小さな火なら毛布で覆えますが、危険なら避難します。"
      }
    }
  },
  {
    "id": "p2_crack_wall",
    "phase": 2,
    "type": "quiz",
    "title": "Cracking Wall",
    "jp": "【壁の亀裂】壁に大きなひびが入っています。",
    "th": "กำแพงมีรอยร้าวใหญ่และมีเสียงแตกร้าวต่อเนื่อง",
    
    "answerMode": "text",
    "image": "images/p2_crack_wall.png",
    "choices": [
      {
        "text": "ถอยออกจากกำแพงและป้องกันศีรษะ",
        "textJp": "壁から離れる",
        "result": "perfect",
        "score": 30,
        "hp": 0,
        "mana": 10,
        "explanationTh": "ถูกต้อง กำแพงที่ร้าวอาจหลุดร่วงหรือถล่มซ้ำ",
        "explanationJp": "正解。ひび割れた壁は崩れる恐れがあります。"
      },
      {
        "text": "เข้าไปดูรอยร้าวใกล้ ๆ",
        "textJp": "近づいて確認する",
        "result": "bad",
        "score": -20,
        "hp": -30,
        "mana": -15,
        "explanationTh": "อันตราย เพราะอาจมีเศษปูนหล่นหรือผนังพัง",
        "explanationJp": "危険。近づかないでください。"
      }
    ]
  },
  {
    "id": "p2_store",
    "phase": 2,
    "type": "quiz",
    "title": "Convenience Store",
    "jp": "【コンビニ内の被災】商品が棚から落ち続けています。",
    "th": "สินค้าในร้านสะดวกซื้อหล่นเต็มพื้นและชั้นวางยังสั่น",

    "answerMode": "text",
    "image": "images/p2_store.png",
    "choices": [
      {
        "text": "ใช้ตะกร้าหรือแขนบังหัว แล้วหลบข้างเคาน์เตอร์",
        "textJp": "頭を守り安全な場所へ",
        "result": "perfect",
        "score": 35,
        "hp": 0,
        "mana": 5,
        "explanationTh": "ถูกต้อง เคาน์เตอร์เตี้ยช่วยบังของตกได้บางส่วน",
        "explanationJp": "正解。頭を守り棚から離れます。"
      },
      {
        "text": "รีบเก็บอาหารและน้ำจากชั้นวาง",
        "textJp": "商品を集める",
        "result": "bad",
        "score": 5,
        "hp": -20,
        "mana": -20,
        "explanationTh": "อันตราย ชีวิตสำคัญกว่าสิ่งของ และชั้นวางอาจล้ม",
        "explanationJp": "危険。物より命が優先です。"
      }
    ]
  },
  {
    "id": "p2_ceiling",
    "phase": 2,
    "type": "item",
    "title": "Ceiling Dust",
    "jp": "【天井の崩落】天井材の粉じんが舞っています。",
    "th": "ฝุ่นจากเพดานและวัสดุก่อสร้างฟุ้งในอากาศ",

    "answerMode": "inventory",
    "image": "images/p2_ceiling.png",
    "coreItems": [
      "mask"
    ],
    "substituteItems": [
      "towel",
      "clothes",
      "tissues"
    ],
    "comboItems": [
      [
        "towel",
        "water"
      ],
      [
        "clothes",
        "water"
      ],
      [
        "tissues",
        "water"
      ]
    ],
    "scoring": {
      "mask": {
        "score": 40,
        "hp": 5,
        "mana": 0,
        "useType": "direct",
        "explanationTh": "หน้ากากเป็นอุปกรณ์ตรงสำหรับกรองฝุ่น",
        "explanationJp": "マスクは粉じん対策に有効です。"
      },
      "towel": {
        "score": 22,
        "hp": -5,
        "mana": 0,
        "useType": "adapt",
        "explanationTh": "ผ้าชุบน้ำช่วยกรองฝุ่นชั่วคราว แต่ไม่ดีเท่าหน้ากาก",
        "explanationJp": "濡れタオルは一時的な代用です。"
      }
    }
  },
  {
    "id": "p2_rolling_cars",
    "phase": 2,
    "type": "quiz",
    "title": "Rolling Cars",
    "jp": "【車両の動き】停車中の車が揺れで動いています。",
    "th": "รถที่จอดอยู่เริ่มไหลจากแรงสั่นและพื้นลาด",
    "answerMode": "text",
    "image": "images/p2_cars.png",
    "choices": [
      {
        "text": "ขึ้นฟุตบาทและหลบแนวรถ",
        "textJp": "車の進路から離れる",
        "result": "perfect",
        "score": 30,
        "hp": 0,
        "mana": 10,
        "explanationTh": "ถูกต้อง หลีกเลี่ยงเส้นทางที่รถอาจไหลผ่าน",
        "explanationJp": "正解。車の進路を避けます。"
      },
      {
        "text": "ใช้มือดันรถให้หยุด",
        "textJp": "手で車を止める",
        "result": "bad",
        "score": -20,
        "hp": -50,
        "mana": -30,
        "explanationTh": "อันตรายมาก รถมีน้ำหนักมากและอาจหนีบหรือชน",
        "explanationJp": "危険。車は人の力で止められません。"
      }
    ]
  },
  {
    "id": "p2_stampede",
    "phase": 2,
    "type": "item",
    "title": "Stampede",
    "jp": "【群衆事故】人が一方向へ押し寄せています。",
    "th": "ฝูงชนกำลังเบียดไปทางเดียวกันจนเสี่ยงล้มทับกัน",
    "answerMode": "inventory",
    "image": "images/p2_stampede.png",
    "coreItems": [
      "whistle"
    ],
    "substituteItems": [
      "flashlight",
      "cash"
    ],
    "comboItems": [
      [
        "cash",
        "flashlight"
      ],
      [
        "flashlight",
        "wipes"
      ]
    ],
    "scoring": {
      "whistle": {
        "score": 35,
        "hp": 0,
        "mana": 15,
        "useType": "direct",
        "explanationTh": "นกหวีดส่งเสียงไกลและไม่ใช้แรงมาก",
        "explanationJp": "ホイッスルは遠くまで合図できます。"
      },
      "flashlight": {
        "score": 22,
        "hp": 0,
        "mana": 5,
        "useType": "adapt",
        "explanationTh": "ไฟฉายใช้กะพริบเป็นสัญญาณได้เมื่อเสียงดังวุ่นวาย",
        "explanationJp": "ライトの点滅は合図になります。"
      }
    }
  },
  {
    "id": "p2_siren",
    "phase": 2,
    "type": "quiz",
    "title": "Siren Alert",
    "jp": "【サイレン】大きな警報音が鳴っています。",
    "th": "เสียงไซเรนดังขึ้น หลายคนตกใจและไม่รู้จะไปทางไหน",
    "answerMode": "text",
    "image": "images/p2_siren.png",
    "choices": [
      {
        "text": "มองป้าย Emergency Exit และตั้งสติ",
        "textJp": "非常口の表示を確認する",
        "result": "perfect",
        "score": 30,
        "hp": 0,
        "mana": 10,
        "explanationTh": "ถูกต้อง ป้ายและประกาศช่วยนำทางเมื่อคนตื่นตกใจ",
        "explanationJp": "正解。表示と放送を確認します。"
      },
      {
        "text": "กรีดร้องและวิ่งตามคนอื่น",
        "textJp": "叫んで走る",
        "result": "bad",
        "score": 5,
        "hp": -10,
        "mana": -30,
        "explanationTh": "อันตราย การตะโกนและวิ่งเพิ่มความตื่นตระหนก",
        "explanationJp": "危険。パニックを広げます。"
      }
    ]
  },
  {
    "id": "p3_aftershock",
    "phase": 3,
    "type": "quiz",
    "title": "Aftershock",
    "jp": "【余震】揺れが止まった直後、また小さな揺れが来ました。",
    "th": "หลังแรงสั่นหลักหยุดไม่นาน เกิดอาฟเตอร์ช็อกตามมา",
    
    "answerMode": "text",
    "image": "images/p3_aftershock.png",
    "choices": [
      {
        "text": "หยุด หมอบต่ำ และป้องกันศีรษะอีกครั้ง",
        "textJp": "もう一度身を守る",
        "result": "perfect",
        "score": 30,
        "hp": 0,
        "mana": 8,
        "explanationTh": "ถูกต้อง Aftershock ทำให้ของที่ค้างอยู่หล่นซ้ำได้",
        "explanationJp": "正解。余震でも落下物に注意します。"
      },
      {
        "text": "รีบวิ่งลงบันไดทันที",
        "textJp": "急いで階段を走る",
        "result": "bad",
        "score": -20,
        "hp": -25,
        "mana": -12,
        "explanationTh": "อันตราย บันไดระหว่างสั่นเสี่ยงล้มและเหยียบกัน",
        "explanationJp": "危険。階段で転倒しやすくなります。"
      }
    ]
  },
  {
    "id": "p3_gas_leak",
    "phase": 3,
    "type": "item",
    "title": "Gas Leak",
    "jp": "【ガス漏れ】ガスの臭いがします。",
    "th": "ได้กลิ่นแก๊สรั่วหลังแรงสั่นหยุด",
    
    "answerMode": "inventory",
    "image": "images/p3_gas.png",
    "coreItems": [
      "gunte"
    ],
    "substituteItems": [
      "mask",
      "towel"
    ],
    "comboItems": [
      [
        "gunte",
        "flashlight"
      ],
      [
        "towel",
        "water"
      ]
    ],
    "scoring": {
      "gunte": {
        "score": 34,
        "hp": 0,
        "mana": 0,
        "useType": "direct",
        "explanationTh": "ถุงมือช่วยปิดวาล์วหรือจับของคมโดยลดบาดเจ็บ",
        "explanationJp": "手袋で安全に元栓へ触れます。"
      },
      "mask": {
        "score": 18,
        "hp": -6,
        "mana": 0,
        "useType": "adapt",
        "explanationTh": "หน้ากากลดฝุ่นได้ แต่ไม่ใช่อุปกรณ์กันแก๊ส ต้องรีบออกจากพื้นที่",
        "explanationJp": "マスクはガス対策としては限定的です。"
      }
    }
  },
  {
    "id": "p3_information",
    "phase": 3,
    "type": "item",
    "title": "Information Blackout",
    "jp": "【情報遮断】ネットがつながりません。",
    "th": "อินเทอร์เน็ตล่ม โทรศัพท์โทรออกยาก และข่าวลือเริ่มกระจาย",
    "answerMode": "inventory",
    "image": "images/p3_radio.png",
    "coreItems": [
      "radio"
    ],
    "substituteItems": [
      "paper_map",
      "notepad",
      "__phone__"
    ],
    "comboItems": [
      [
        "__phone__",
        "powerbank"
      ],
      [
        "notepad",
        "docs"
      ]
    ],
    "scoring": {
      "radio": {
        "score": 38,
        "hp": 0,
        "mana": 5,
        "useType": "direct",
        "explanationTh": "วิทยุรับข่าวทางการได้แม้เน็ตล่ม",
        "explanationJp": "ラジオは通信障害時も公式情報を得られます。"
      },
      "paper_map": {
        "score": 22,
        "hp": 0,
        "mana": 0,
        "useType": "adapt",
        "explanationTh": "แผนที่กระดาษช่วยหาเส้นทางอพยพเมื่อมือถือใช้ไม่ได้",
        "explanationJp": "紙の地図は通信なしで避難経路を確認できます。"
      }
    }
  },
  {
    "id": "p3_rescue",
    "phase": 3,
    "type": "item",
    "title": "Trapped Person",
    "jp": "【閉じ込め】人が家具の下敷きになっています。",
    "th": "มีคนติดอยู่ใต้ซากหรือเฟอร์นิเจอร์หนัก",
    
    "answerMode": "inventory",
    "image": "images/p3_rescue.png",
    "coreItems": [
      "crowbar",
      "rope"
    ],
    "substituteItems": [
      "whistle",
      "notepad"
    ],
    "comboItems": [
      [
        "rope",
        "crowbar"
      ],
      [
        "crowbar",
        "pliers"
      ]
    ],
    "scoring": {
      "crowbar": {
        "score": 38,
        "hp": 0,
        "mana": 0,
        "useType": "direct",
        "explanationTh": "ชะแลงช่วยเปิดช่องว่างโดยไม่ดึงตัวผู้บาดเจ็บโดยตรง",
        "explanationJp": "バールで安全な隙間を作れます。"
      },
      "rope": {
        "score": 30,
        "hp": 0,
        "mana": 5,
        "useType": "direct",
        "explanationTh": "เชือกช่วยดึงสิ่งกีดขวางจากระยะปลอดภัย",
        "explanationJp": "ロープで安全距離を保てます。"
      }
    }
  },
  {
    "id": "p3_mental",
    "phase": 3,
    "type": "item",
    "title": "Mental Breakdown",
    "jp": "【仲間のパニック】友人が泣き出して動けません。",
    "th": "เพื่อนสติแตก หายใจเร็ว และไม่ยอมเดินต่อ",
    
    "answerMode": "inventory",
    "image": "images/p3_mental.png",
    "coreItems": [
      "family_photo",
      "candy"
    ],
    "substituteItems": [
      "water",
      "blanket",
      "notepad"
    ],
    "comboItems": [
      [
        "blanket",
        "candy"
      ],
      [
        "notepad",
        "family_photo"
      ]
    ],
    "scoring": {
      "family_photo": {
        "score": 30,
        "hp": 0,
        "mana": 15,
        "useType": "direct",
        "explanationTh": "รูปครอบครัวช่วยดึงสติและลดความกลัวได้",
        "explanationJp": "家族写真は安心材料になります。"
      },
      "candy": {
        "score": 24,
        "hp": 0,
        "mana": 12,
        "useType": "direct",
        "explanationTh": "ลูกอมช่วยให้โฟกัสกับการหายใจและเพิ่มพลังใจเล็กน้อย",
        "explanationJp": "飴は落ち着くきっかけになります。"
      },
      "water": {
        "score": 18,
        "hp": 0,
        "mana": 8,
        "useType": "adapt",
        "explanationTh": "จิบน้ำช้า ๆ ช่วยหยุดจังหวะตื่นตระหนก",
        "explanationJp": "少し水を飲むと呼吸を整えやすくなります。"
      }
    }
  },
  {
    "id": "p3_stair",
    "phase": 3,
    "type": "quiz",
    "title": "Crowded Stairwell",
    "jp": "【非常階段の混雑】階段に人が集中しています。",
    "th": "บันไดหนีไฟแน่น ทุกคนรีบลงพร้อมกัน",
    "answerMode": "text",
    "image": "images/p3_stair.png",
    "choices": [
      {
        "text": "เดินชิดด้านหนึ่ง จับราว และไม่เบียด",
        "textJp": "手すりを持って歩く",
        "result": "perfect",
        "score": 30,
        "hp": 0,
        "mana": 10,
        "explanationTh": "ถูกต้อง ลดการล้มเป็นลูกโซ่ในบันได",
        "explanationJp": "正解。階段での転倒を防ぎます。"
      },
      {
        "text": "แทรกและวิ่งลงให้เร็วที่สุด",
        "textJp": "押しながら走る",
        "result": "bad",
        "score": -20,
        "hp": -25,
        "mana": -15,
        "explanationTh": "อันตราย การเบียดและวิ่งทำให้ล้มทับกันได้",
        "explanationJp": "危険。将棋倒しの原因になります。"
      }
    ]
  },
  {
    "id": "p3_pipe",
    "phase": 3,
    "type": "quiz",
    "title": "Burst Pipe",
    "jp": "【配管破裂】床に水が広がっています。",
    "th": "ท่อน้ำแตก น้ำท่วมพื้นใกล้ปลั๊กและสายไฟ",

    "answerMode": "text",
    "image": "images/p3_pipe.png",
    "choices": [
      {
        "text": "หลบพื้นที่เปียกและเตือนคนอื่นเรื่องไฟฟ้า",
        "textJp": "水と電気を避ける",
        "result": "perfect",
        "score": 30,
        "hp": 0,
        "mana": 10,
        "explanationTh": "ถูกต้อง น้ำกับไฟฟ้าเสี่ยงไฟดูด",
        "explanationJp": "正解。感電を防ぎます。"
      },
      {
        "text": "ลุยน้ำไปถอดปลั๊กเอง",
        "textJp": "水の中でプラグを抜く",
        "result": "bad",
        "score": -20,
        "hp": -35,
        "mana": -10,
        "explanationTh": "อันตราย เสี่ยงไฟดูด ควรให้ผู้ใหญ่หรือเจ้าหน้าที่ตัดไฟจากจุดปลอดภัย",
        "explanationJp": "危険。感電の恐れがあります。"
      }
    ]
  },
  {
    "id": "p3_help_voice",
    "phase": 3,
    "type": "quiz",
    "title": "Voice Behind Door",
    "jp": "【扉の向こうの声】別室から助けを求める声がします。",
    "th": "ได้ยินเสียงขอความช่วยเหลือจากอีกห้องหนึ่ง",
    "answerMode": "text",
    "image": "images/p3_door.png",
    "choices": [
      {
        "text": "ตอบกลับ ถามอาการ และแจ้งกู้ภัยโดยไม่เสี่ยงเข้าไป",
        "textJp": "声をかけて救助を呼ぶ",
        "result": "perfect",
        "score": 32,
        "hp": 0,
        "mana": 10,
        "explanationTh": "ถูกต้อง การสื่อสารช่วยให้กู้ภัยรู้ตำแหน่งและลดความตื่นกลัว",
        "explanationJp": "正解。位置と状態を伝えます。"
      },
      {
        "text": "พังประตูเข้าไปคนเดียวทันที",
        "textJp": "一人で無理に入る",
        "result": "bad",
        "score": 5,
        "hp": -25,
        "mana": -10,
        "explanationTh": "เสี่ยงเจ็บเพิ่มหรือทำให้โครงสร้างถล่ม ควรประเมินก่อน",
        "explanationJp": "危険。二次被害の恐れがあります。"
      }
    ]
  },
  {
    "id": "p3_tsunami",
    "phase": 3,
    "type": "item",
    "title": "Tsunami Warning",
    "jp": "【津波の噂】海沿いの地域で津波情報が流れています。",
    "th": "มีข่าวเตือนสึนามิในพื้นที่ใกล้ทะเล ต้องยืนยันเส้นทางอพยพ",
    "answerMode": "inventory",
    "image": "images/p3_tsunami.png",
    "coreItems": [
      "paper_map",
      "radio"
    ],
    "substituteItems": [
      "__phone__",
      "powerbank"
    ],
    "comboItems": [
      [
        "__phone__",
        "powerbank"
      ],
      [
        "radio",
        "paper_map"
      ]
    ],
    "scoring": {
      "paper_map": {
        "score": 34,
        "hp": 0,
        "mana": 0,
        "useType": "direct",
        "explanationTh": "แผนที่กระดาษช่วยหาเส้นทางไปที่สูงแม้สัญญาณล่ม",
        "explanationJp": "紙地図で高台への道を確認できます。"
      },
      "radio": {
        "score": 34,
        "hp": 0,
        "mana": 5,
        "useType": "direct",
        "explanationTh": "วิทยุช่วยยืนยันประกาศสึนามิจากทางการ",
        "explanationJp": "ラジオで公式情報を確認できます。"
      }
    }
  },
  {
    "id": "p3_triage",
    "phase": 3,
    "type": "quiz",
    "title": "Triage Choice",
    "jp": "【救護の判断】けが人が複数います。",
    "th": "มีผู้บาดเจ็บหลายคนในพื้นที่เดียวกัน",
    "answerMode": "text",
    "image": "images/p3_triage.png",
    "choices": [
      {
        "text": "แจ้งเจ้าหน้าที่และช่วยตามความปลอดภัย",
        "textJp": "係員へ知らせ安全に手伝う",
        "result": "perfect",
        "score": 32,
        "hp": 0,
        "mana": 10,
        "explanationTh": "ถูกต้อง ไม่ทำเกินความสามารถและไม่ทิ้งข้อมูลสำคัญ",
        "explanationJp": "正解。安全を確保して支援します。"
      },
      {
        "text": "อุ้มทุกคนออกเองทันที",
        "textJp": "全員を一人で運ぶ",
        "result": "bad",
        "score": 5,
        "hp": -20,
        "mana": -20,
        "explanationTh": "อาจทำให้บาดเจ็บเพิ่มทั้งคุณและผู้ป่วย ควรเรียกความช่วยเหลือ",
        "explanationJp": "危険。無理な搬送は悪化させます。"
      }
    ]
  },
  {
    "id": "p4_glass_wire",
    "phase": 4,
    "type": "item",
    "title": "Glass and Wires",
    "jp": "【危険な道路】道路にガラスと切れた電線があります。",
    "th": "ถนนมีเศษแก้วและสายไฟขาดพาดอยู่",
    
    "answerMode": "inventory",
    "image": "images/p4_road.png",
    "coreItems": [
      "shoes"
    ],
    "substituteItems": [
      "gunte",
      "paper_map"
    ],
    "comboItems": [
      [
        "paper_map",
        "tape"
      ],
      [
        "towel",
        "tape"
      ],
      [
        "clothes",
        "tape"
      ]
    ],
    "scoring": {
      "shoes": {
        "score": 38,
        "hp": 0,
        "mana": 0,
        "useType": "direct",
        "explanationTh": "รองเท้าพื้นหนาป้องกันเศษแก้วและของมีคม",
        "explanationJp": "厚底靴は足を守ります。"
      },
      "paper_map": {
        "score": 20,
        "hp": -4,
        "mana": 0,
        "useType": "adapt",
        "explanationTh": "แผนที่ช่วยหาเส้นทางอ้อมสายไฟ เป็นการประยุกต์ด้านข้อมูล",
        "explanationJp": "地図で迂回路を探せます。"
      },
      "gunte": {
      "score": 25,
      "hp": -2,
      "mana": 0,
      "useType": "substitute",
      "explanationTh": "ถุงมือผ้าช่วยให้หยิบย้ายเศษแก้วเปิดทางได้ แต่ยังเสี่ยงโดนบาดขา (HP -2)",
      "explanationJp": "軍手でガラスを片付けられますが、足元は危険です。"
      }
    }
  },
  {
    "id": "p4_traffic",
    "phase": 4,
    "type": "quiz",
    "title": "Gridlock Traffic",
    "jp": "【道路渋滞】車が動かず避難路をふさいでいます。",
    "th": "รถติดหนักและบางคันจอดขวางเส้นทางอพยพ",
    "answerMode": "text",
    "image": "images/p4_traffic.png",
    "choices": [
      {
        "text": "เดินเท้าตามเส้นทางอพยพที่ปลอดภัย",
        "textJp": "徒歩で避難する",
        "result": "perfect",
        "score": 30,
        "hp": 0,
        "mana": 8,
        "explanationTh": "ถูกต้อง การเดินเท้ามักคล่องตัวกว่าเมื่อถนนติดหรือเสียหาย",
        "explanationJp": "正解。徒歩避難が有効な場合があります。"
      },
      {
        "text": "รอในรถจนกว่าถนนจะโล่ง",
        "textJp": "車内で待つ",
        "result": "bad",
        "score": -20,
        "hp": -10,
        "mana": -25,
        "explanationTh": "เสี่ยงเสียเวลาและติดอยู่ใกล้อาคารหรือไฟไหม้",
        "explanationJp": "危険。避難が遅れる恐れがあります。"
      }
    ]
  },
  {
    "id": "p4_bridge",
    "phase": 4,
    "type": "quiz",
    "title": "Closed Bridge",
    "jp": "【橋の通行止め】橋にひびが入り閉鎖されています。",
    "th": "สะพานมีรอยร้าวและถูกปิด แต่เป็นทางลัดไปศูนย์อพยพ",
    "answerMode": "text",
    "image": "images/p4_bridge.png",
    "choices": [
      {
        "text": "เดินอ้อมตามเส้นทางที่ประกาศว่าปลอดภัย",
        "textJp": "安全な迂回路へ",
        "result": "perfect",
        "score": 32,
        "hp": 0,
        "mana": 5,
        "explanationTh": "ถูกต้อง ทางอ้อมปลอดภัยกว่าทางลัดที่โครงสร้างเสียหาย",
        "explanationJp": "正解。危険な橋は避けます。"
      },
      {
        "text": "ข้ามสะพานเร็ว ๆ เพราะประหยัดเวลา",
        "textJp": "急いで橋を渡る",
        "result": "bad",
        "score": -20,
        "hp": -45,
        "mana": -10,
        "explanationTh": "อันตราย โครงสร้างอาจถล่มจาก aftershock",
        "explanationJp": "危険。余震で崩落する恐れがあります。"
      }
    ]
  },
  {
    "id": "p4_child",
    "phase": 4,
    "type": "quiz",
    "title": "Lost Child",
    "jp": "【迷子】子どもが一人で泣いています。",
    "th": "พบเด็กหลงร้องไห้อยู่ริมทาง",
    "answerMode": "text",
    "image": "images/p4_child.png",
    "choices": [
      {
        "text": "พาไปจุดอพยพและแจ้งเจ้าหน้าที่",
        "textJp": "避難所の係員へ",
        "result": "perfect",
        "score": 34,
        "hp": 0,
        "mana": 12,
        "explanationTh": "ถูกต้อง จุดอพยพมีระบบตามหาผู้ปกครองที่ปลอดภัยกว่า",
        "explanationJp": "正解。避難所で保護者を探します。"
      },
      {
        "text": "ปล่อยเด็กไว้แล้วรีบไปต่อ",
        "textJp": "そのまま置いていく",
        "result": "bad",
        "score": -20,
        "hp": 0,
        "mana": -30,
        "explanationTh": "ไม่ปลอดภัย เด็กอาจบาดเจ็บหรือหลงไกลกว่าเดิม",
        "explanationJp": "危険。子どもを一人にしないでください。"
      }
    ]
  },
  {
    "id": "p4_rain",
    "phase": 4,
    "type": "item",
    "title": "Heavy Rain",
    "jp": "【豪雨】強い雨で体温が下がり始めています。",
    "th": "ฝนตกหนัก เสื้อผ้าเริ่มเปียกและร่างกายเย็นลง",
    "answerMode": "inventory",
    "image": "images/p4_rain.png",
    "coreItems": [
      "raincoat"
    ],
    "substituteItems": [
      "blanket",
      "trash_bag"
    ],
    "comboItems": [
      [
        "trash_bag",
        "tape"
      ],
      [
        "blanket",
        "rope"
      ]
    ],
    "scoring": {
      "raincoat": {
        "score": 38,
        "hp": 0,
        "mana": 0,
        "useType": "direct",
        "explanationTh": "เสื้อกันฝนเป็นอุปกรณ์ตรงสำหรับลดการเปียกและหนาว",
        "explanationJp": "レインコートは雨と冷えを防ぎます。"
      },
      "blanket": {
        "score": 22,
        "hp": -4,
        "mana": 0,
        "useType": "adapt",
        "explanationTh": "ผ้าห่มฟอยล์กันลมและรักษาความร้อนได้ แต่ไม่กันฝนเท่าเสื้อกันฝน",
        "explanationJp": "アルミブランケットは保温に役立ちます。"
      },
      "trash_bag": {
        "score": 24,
        "hp": -3,
        "mana": 0,
        "useType": "adapt",
        "explanationTh": "ถุงขยะประยุกต์เป็นเสื้อกันฝนชั่วคราวได้หากเจาะรูอย่างระวัง",
        "explanationJp": "ゴミ袋は簡易雨具として代用できます。"
      }
    }
  },
  {
    "id": "p4_elderly",
    "phase": 4,
    "type": "item",
    "title": "Fallen Elderly",
    "jp": "【高齢者の転倒】高齢者が転んで足を痛めています。",
    "th": "ผู้สูงอายุล้มและเจ็บขา ไม่สามารถเดินต่อได้ดี",

    "answerMode": "inventory",
    "image": "images/p4_elderly.png",
    "coreItems": [
      "first_aid"
    ],
    "substituteItems": [
      "towel",
      "rope",
      "blanket"
    ],
    "comboItems": [
      [
        "towel",
        "tape"
      ],
      [
        "rope",
        "crowbar"
      ]
    ],
    "scoring": {
      "first_aid": {
        "score": 40,
        "hp": 0,
        "mana": 8,
        "useType": "direct",
        "explanationTh": "ชุดปฐมพยาบาลเหมาะสำหรับแผลหรือเคล็ดขัดยอกเบื้องต้น",
        "explanationJp": "救急箱で基本的な処置ができます。"
      },
      "towel": {
        "score": 20,
        "hp": -5,
        "mana": 3,
        "useType": "adapt",
        "explanationTh": "ผ้าขนหนูใช้กดแผลหรือรองข้อเท้าได้ชั่วคราว",
        "explanationJp": "タオルは応急処置に代用できます。"
      }
    }
  },
  {
    "id": "p4_wall",
    "phase": 4,
    "type": "quiz",
    "title": "Wall Collapse",
    "jp": "【塀の倒壊】余震でブロック塀が揺れています。",
    "th": "กำแพงริมทางโยกแรงจาก aftershock และอาจล้ม",
    
    "answerMode": "text",
    "image": "images/p4_wall.png",
    "choices": [
      {
        "text": "ออกห่างกำแพงและไปพื้นที่โล่ง",
        "textJp": "塀から離れる",
        "result": "perfect",
        "score": 30,
        "hp": 0,
        "mana": 8,
        "explanationTh": "ถูกต้อง กำแพงอาจล้มโดยไม่มีสัญญาณเตือนเพิ่ม",
        "explanationJp": "正解。塀の倒壊から離れます。"
      },
      {
        "text": "เดินชิดกำแพงเพื่อหลบฝน",
        "textJp": "塀のそばを歩く",
        "result": "bad",
        "score": -20,
        "hp": -35,
        "mana": -8,
        "explanationTh": "อันตราย กำแพงอาจถล่มใส่โดยตรง",
        "explanationJp": "危険。倒壊に巻き込まれます。"
      }
    ]
  },
  {
    "id": "p4_property",
    "phase": 4,
    "type": "quiz",
    "title": "Return For Property",
    "jp": "【忘れ物】大切な物を家に忘れたことに気づきました。",
    "th": "นึกได้ว่าลืมของสำคัญไว้ที่บ้านที่อาจเสียหาย",
    
    "answerMode": "text",
    "image": "images/p4_property.png",
    "choices": [
      {
        "text": "ไม่ย้อนกลับ ไปศูนย์อพยพก่อน",
        "textJp": "戻らず避難する",
        "result": "perfect",
        "score": 35,
        "hp": 0,
        "mana": 10,
        "explanationTh": "ถูกต้อง การย้อนกลับเพิ่มความเสี่ยงจาก aftershock ไฟไหม้ หรืออาคารถล่ม",
        "explanationJp": "正解。命を優先します。"
      },
      {
        "text": "กลับไปเอาของแป๊บเดียว",
        "textJp": "少しだけ戻る",
        "result": "bad",
        "score": -20,
        "hp": -40,
        "mana": -15,
        "explanationTh": "อันตรายมาก เหตุซ้ำมักเกิดตอนคนย้อนกลับเข้าอาคารเสียหาย",
        "explanationJp": "危険。損傷した建物へ戻らないでください。"
      }
    ]
  },
  {
    "id": "p5_water",
    "phase": 5,
    "type": "item",
    "title": "Water Shortage",
    "jp": "【飲料水不足】避難所の水が限られています。",
    "th": "น้ำดื่มในศูนย์อพยพมีจำกัด ต้องจัดการให้พอ",
   
    "answerMode": "inventory",
    "image": "images/p5_water.png",
    "coreItems": [
      "water"
    ],
    "substituteItems": [
      "towel",
      "trash_bag"
    ],
    "comboItems": [
      [
        "water",
        "towel"
      ],
      [
        "trash_bag",
        "wrap"
      ]
    ],
    "scoring": {
      "water": {
        "score": 40,
        "hp": 5,
        "mana": 5,
        "useType": "direct",
        "explanationTh": "น้ำดื่มเป็นสิ่งจำเป็นที่สุดในการรักษาสภาพร่างกาย",
        "explanationJp": "飲料水は最優先の備蓄です。"
      },
      "towel": {
        "score": 16,
        "hp": -8,
        "mana": 0,
        "useType": "adapt",
        "explanationTh": "ผ้าช่วยกรองตะกอนหยาบได้ แต่ยังไม่ทำให้น้ำปลอดเชื้อ",
        "explanationJp": "タオルは粗いろ過のみ可能です。"
      }
    }
  },
  {
    "id": "p5_space",
    "phase": 5,
    "type": "quiz",
    "title": "Shelter Dispute",
    "jp": "【避難所の場所争い】スペースをめぐって口論が起きています。",
    "th": "เกิดการโต้เถียงเรื่องพื้นที่นอนในศูนย์อพยพ",
   
    "answerMode": "text",
    "image": "images/p5_space.png",
    "choices": [
      {
        "text": "ไกล่เกลี่ยและขอให้เจ้าหน้าที่จัดพื้นที่",
        "textJp": "係員に相談して調整する",
        "result": "perfect",
        "score": 35,
        "hp": 0,
        "mana": 15,
        "explanationTh": "ถูกต้อง ความสงบในศูนย์อพยพช่วยให้ทุกคนพักและรับข้อมูลได้ดีขึ้น",
        "explanationJp": "正解。避難所の秩序を守ります。"
      },
      {
        "text": "ตะโกนแย่งพื้นที่ให้กลุ่มตัวเอง",
        "textJp": "大声で場所を奪う",
        "result": "bad",
        "score": -20,
        "hp": 0,
        "mana": -35,
        "explanationTh": "ทำให้ความเครียดลามและอาจเกิดการทะเลาะรุนแรง",
        "explanationJp": "危険。避難所の不安を高めます。"
      }
    ]
  },
  {
    "id": "p5_baby",
    "phase": 5,
    "type": "item",
    "title": "Sick Baby",
    "jp": "【赤ちゃんの発熱】赤ちゃんが熱を出しています。",
    "th": "เด็กเล็กมีไข้ในศูนย์อพยพและร้องไห้ไม่หยุด",
   
    "answerMode": "inventory",
    "image": "images/p5_baby.png",
    "coreItems": [
      "common_med",
      "cooling_sheet"
    ],
    "substituteItems": [
      "towel",
      "water",
      "dry_milk"
    ],
    "comboItems": [
      [
        "towel",
        "water"
      ]
    ],
    "scoring": {
      "cooling_sheet": {
        "score": 34,
        "hp": 0,
        "mana": 8,
        "useType": "direct",
        "explanationTh": "แผ่นลดไข้ช่วยลดความร้อนชั่วคราวระหว่างรอการดูแล",
        "explanationJp": "冷却シートは一時的な熱対策になります。"
      },
      "common_med": {
        "score": 28,
        "hp": 0,
        "mana": 5,
        "useType": "direct",
        "explanationTh": "ยาต้องใช้ตามวัยและคำแนะนำ ห้ามให้ยาเด็กแบบเดาสุ่ม",
        "explanationJp": "薬は年齢と用量を確認します。"
      },
      "towel": {
        "score": 20,
        "hp": -3,
        "mana": 4,
        "useType": "adapt",
        "explanationTh": "ผ้าชุบน้ำเช็ดตัวช่วยลดไข้ได้แบบพื้นฐาน",
        "explanationJp": "濡れタオルで体を冷やせます。"
      }
    }
  },
  {
    "id": "p5_ptsd",
    "phase": 5,
    "type": "quiz",
    "title": "Phantom Shake",
    "jp": "【幻の揺れ】揺れていないのに揺れを感じます。",
    "th": "รู้สึกเหมือนพื้นสั่นทั้งที่ไม่มีแรงสั่นจริง",
   
    "answerMode": "text",
    "image": "images/p5_ptsd.png",
    "choices": [
      {
        "text": "หายใจลึก ตรวจประกาศ และพูดคุยกับคนข้าง ๆ",
        "textJp": "深呼吸して情報確認",
        "result": "perfect",
        "score": 30,
        "hp": 0,
        "mana": 18,
        "explanationTh": "ถูกต้อง อาการผวาหลังภัยพิบัติพบได้ ควรใช้ข้อมูลจริงและการสนับสนุนทางใจ",
        "explanationJp": "正解。不安には情報確認と支援が大切です。"
      },
      {
        "text": "ตะโกนว่าแผ่นดินไหวมาอีกแล้ว",
        "textJp": "また地震だと叫ぶ",
        "result": "bad",
        "score": -20,
        "hp": 0,
        "mana": -30,
        "explanationTh": "อาจทำให้คนอื่นตื่นตระหนก ควรตรวจสอบก่อนสื่อสาร",
        "explanationJp": "危険。不確かな情報で不安を広げます。"
      }
    ]
  },
  {
    "id": "p5_battery",
    "phase": 5,
    "type": "item",
    "title": "Battery Crisis",
    "jp": "【スマホの電池切れ】スマホの電池が少なくなっています。",
    "th": "แบตมือถือใกล้หมด แต่ยังต้องใช้รับข่าวสารและติดต่อครอบครัว",
    
    "answerMode": "inventory",
    "image": "images/p5_battery.png",
    "coreItems": [
      "powerbank"
    ],
    "substituteItems": [
      "radio",
      "notepad"
    ],
    "comboItems": [
      [
        "__phone__",
        "powerbank"
      ],
      [
        "radio",
        "notepad"
      ]
    ],
    "scoring": {
      "powerbank": {
        "score": 38,
        "hp": 0,
        "mana": 5,
        "useType": "direct",
        "explanationTh": "พาวเวอร์แบงก์ช่วยยืดการใช้งานมือถือเพื่อรับข้อมูลทางการ",
        "explanationJp": "モバイルバッテリーで連絡手段を維持できます。"
      },
      "radio": {
        "score": 22,
        "hp": 0,
        "mana": 0,
        "useType": "adapt",
        "explanationTh": "ถ้ามือถือใช้ไม่ได้ วิทยุยังช่วยรับข่าวสารได้",
        "explanationJp": "スマホが使えない時はラジオが役立ちます。"
      }
    }
  },
  {
    "id": "p5_fake_news",
    "phase": 5,
    "type": "item",
    "title": "Fake News",
    "jp": "【デマ情報】SNSで危険な噂が広がっています。",
    "th": "ข่าวปลอมในโซเชียลบอกให้คนย้ายศูนย์อพยพทันที",

    "answerMode": "inventory",
    "image": "images/p5_fake_news.png",
    "coreItems": [
      "radio"
    ],
    "substituteItems": [
      "notepad",
      "__phone__"
    ],
    "comboItems": [
      [
        "notepad",
        "docs"
      ],
      [
        "__phone__",
        "powerbank"
      ]
    ],
    "scoring": {
      "radio": {
        "score": 38,
        "hp": 0,
        "mana": 8,
        "useType": "direct",
        "explanationTh": "วิทยุช่วยยืนยันข่าวจากแหล่งทางการ ลดการตัดสินใจจากข่าวลือ",
        "explanationJp": "ラジオで公式情報を確認します。"
      },
      "notepad": {
        "score": 22,
        "hp": 0,
        "mana": 3,
        "useType": "adapt",
        "explanationTh": "จดประกาศจริงไว้เทียบกับข่าวลือและบอกต่ออย่างถูกต้อง",
        "explanationJp": "メモで正しい情報を共有できます。"
      }
    }
  },
  {
    "id": "p5_missing_family",
    "phase": 5,
    "type": "item",
    "title": "Missing Family",
    "jp": "【家族の安否不明】家族と連絡が取れません。",
    "th": "ติดต่อครอบครัวไม่ได้และไม่รู้ว่าปลอดภัยหรือไม่",
   
    "answerMode": "inventory",
    "image": "images/p5_missing.png",
    "coreItems": [
      "notepad",
      "docs"
    ],
    "substituteItems": [
      "cards",
      "__phone__",
      "family_photo"
    ],
    "comboItems": [
      [
        "notepad",
        "docs"
      ],
      [
        "notepad",
        "family_photo"
      ]
    ],
    "scoring": {
      "notepad": {
        "score": 32,
        "hp": 0,
        "mana": 8,
        "useType": "direct",
        "explanationTh": "สมุดใช้เขียนชื่อ จุดนัดพบ และฝากข้อความบนบอร์ดประกาศ",
        "explanationJp": "メモで伝言と集合場所を残せます。"
      },
      "docs": {
        "score": 30,
        "hp": 0,
        "mana": 5,
        "useType": "direct",
        "explanationTh": "สำเนาเอกสารช่วยยืนยันตัวตนและข้อมูลครอบครัว",
        "explanationJp": "書類コピーは本人確認に役立ちます。"
      },
      "__phone__": {
        "score": 20,
        "hp": 0,
        "mana": -3,
        "useType": "adapt",
        "explanationTh": "มือถือใช้ส่ง SMS สั้น ๆ ได้ แต่ควรประหยัดแบตและไม่โทรซ้ำ",
        "explanationJp": "SMSを短く送り、電池を節約します。"
      }
    }
  }
];
