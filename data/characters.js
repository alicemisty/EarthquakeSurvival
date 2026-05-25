export const characterClasses = {
  fighter: {
    name: "นักมวย",
    hp: 140,
    maxHp: 140,
    mana: 80,
    maxMana: 80,
    thinkTime: 12,
    hintCharges: 0,
    passive: {
      type: "none",
      description: "ไม่มีระบบเรืองแสงอุปกรณ์",
      glowTags: []
    }
  },

  boxer: null,

  speaker: {
    name: "นักพูด",
    hp: 100,
    maxHp: 100,
    mana: 140,
    maxMana: 140,
    thinkTime: 15,
    hintCharges: 0,
    passive: {
      type: "none",
      description: "ไม่มีระบบเรืองแสงอุปกรณ์",
      glowTags: []
    }
  },

  genius: {
    name: "อัจฉริยะ",
    hp: 75,
    maxHp: 75,
    mana: 100,
    maxMana: 100,
    thinkTime: 18,
    hintCharges: 3,
    passive: {
      type: "genius_root",
      description: "กดใช้ genius root เพื่อให้ไอเทมคอมโบ/การประยุกต์ที่เหมาะกับข้อนั้นเรืองแสง ใช้ได้ 3 ครั้ง",
      glowTags: ["combo"]
    }
  }
};

characterClasses.boxer = characterClasses.fighter;
