/*
 * Leerinhoud — pas dit bestand aan om de woordjes van school (NKC-thema) te gebruiken.
 *
 *  letters[].say   = hoe de letter wordt uitgesproken (Nederlandse letternaam)
 *  letters[].word  = het woordje bij de letter (begint met die letter)
 *  letters[].emoji = het plaatje bij het woord
 *  numbers[].word  = het getal in woorden
 */
window.LEER_DATA = {
  numbers: [
    { n: 1,  word: "een" },
    { n: 2,  word: "twee" },
    { n: 3,  word: "drie" },
    { n: 4,  word: "vier" },
    { n: 5,  word: "vijf" },
    { n: 6,  word: "zes" },
    { n: 7,  word: "zeven" },
    { n: 8,  word: "acht" },
    { n: 9,  word: "negen" },
    { n: 10, word: "tien" },
    { n: 11, word: "elf" },
    { n: 12, word: "twaalf" },
    { n: 13, word: "dertien" },
    { n: 14, word: "veertien" },
    { n: 15, word: "vijftien" },
    { n: 16, word: "zestien" },
    { n: 17, word: "zeventien" },
    { n: 18, word: "achttien" },
    { n: 19, word: "negentien" },
    { n: 20, word: "twintig" }
  ],

  // Plaatjes die geteld worden bij de cijfers
  countEmoji: ["🍎", "🐥", "🎈", "⭐", "🚗", "🌸", "🐟", "🧁"],

  letters: [
    { l: "a", say: "aa",   word: "appel",   emoji: "🍎" },
    { l: "b", say: "bee",  word: "bal",     emoji: "⚽" },
    { l: "c", say: "cee",  word: "cadeau",  emoji: "🎁" },
    { l: "d", say: "dee",  word: "draak",   emoji: "🐉" },
    { l: "e", say: "ee",   word: "eend",    emoji: "🦆" },
    { l: "f", say: "ef",   word: "fiets",   emoji: "🚲" },
    { l: "g", say: "gee",  word: "geit",    emoji: "🐐" },
    { l: "h", say: "haa",  word: "huis",    emoji: "🏠" },
    { l: "i", say: "ie",   word: "ijs",     emoji: "🍦" },
    { l: "j", say: "jee",  word: "jas",     emoji: "🧥" },
    { l: "k", say: "kaa",  word: "kat",     emoji: "🐱" },
    { l: "l", say: "el",   word: "leeuw",   emoji: "🦁" },
    { l: "m", say: "em",   word: "maan",    emoji: "🌙" },
    { l: "n", say: "en",   word: "neus",    emoji: "👃" },
    { l: "o", say: "oo",   word: "olifant", emoji: "🐘" },
    { l: "p", say: "pee",  word: "pop",     emoji: "🪆" },
    { l: "q", say: "kuu",  word: "quiz",    emoji: "❓" },
    { l: "r", say: "er",   word: "roos",    emoji: "🌹" },
    { l: "s", say: "es",   word: "sok",     emoji: "🧦" },
    { l: "t", say: "tee",  word: "taart",   emoji: "🎂" },
    { l: "u", say: "uu",   word: "uil",     emoji: "🦉" },
    { l: "v", say: "vee",  word: "vis",     emoji: "🐟" },
    { l: "w", say: "wee",  word: "wolk",    emoji: "☁️" },
    { l: "x", say: "iks",  word: "xylofoon", emoji: "🎶" },
    { l: "y", say: "ij",   word: "yoyo",    emoji: "🪀" },
    { l: "z", say: "zet",  word: "zon",     emoji: "☀️" }
  ]
};
