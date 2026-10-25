/*
 * Leerinhoud — pas dit bestand aan om de woordjes van school (NKC-thema) te gebruiken.
 *
 *  letters[].say   = letternaam (bee, cee, dee ... zoals de letter heet)
 *  letters[].sound = klank (buh, kuh, duh ... zoals de letter klinkt in een woord)
 *                    Dit is een spelling die een Nederlandse stem goed voorleest; pas aan naar smaak.
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
    { l: "a", say: "aa", sound: "ah",   word: "appel",   emoji: "🍎" },
    { l: "b", say: "bee", sound: "buh",  word: "bal",     emoji: "⚽" },
    { l: "c", say: "cee", sound: "kuh",  word: "cadeau",  emoji: "🎁" },
    { l: "d", say: "dee", sound: "duh",  word: "draak",   emoji: "🐉" },
    { l: "e", say: "ee", sound: "eh",   word: "eend",    emoji: "🦆" },
    { l: "f", say: "ef", sound: "fuh",   word: "fiets",   emoji: "🚲" },
    { l: "g", say: "gee", sound: "guh",  word: "geit",    emoji: "🐐" },
    { l: "h", say: "haa", sound: "huh",  word: "huis",    emoji: "🏠" },
    { l: "i", say: "ie", sound: "ih",   word: "ijs",     emoji: "🍦" },
    { l: "j", say: "jee", sound: "juh",  word: "jas",     emoji: "🧥" },
    { l: "k", say: "kaa", sound: "kuh",  word: "kat",     emoji: "🐱" },
    { l: "l", say: "el", sound: "luh",   word: "leeuw",   emoji: "🦁" },
    { l: "m", say: "em", sound: "muh",   word: "maan",    emoji: "🌙" },
    { l: "n", say: "en", sound: "nuh",   word: "neus",    emoji: "👃" },
    { l: "o", say: "oo", sound: "ok",   word: "olifant", emoji: "🐘" },
    { l: "p", say: "pee", sound: "puh",  word: "pop",     emoji: "🪆" },
    { l: "q", say: "kuu", sound: "kwuh",  word: "quiz",    emoji: "❓" },
    { l: "r", say: "er", sound: "ruh",   word: "roos",    emoji: "🌹" },
    { l: "s", say: "es", sound: "suh",   word: "sok",     emoji: "🧦" },
    { l: "t", say: "tee", sound: "tuh",  word: "taart",   emoji: "🎂" },
    { l: "u", say: "uu", sound: "uh",   word: "uil",     emoji: "🦉" },
    { l: "v", say: "vee", sound: "vuh",  word: "vis",     emoji: "🐟" },
    { l: "w", say: "wee", sound: "wuh",  word: "wolk",    emoji: "☁️" },
    { l: "x", say: "iks", sound: "ksuh",  word: "xylofoon", emoji: "🎶" },
    { l: "y", say: "ij", sound: "ij",   word: "yoyo",    emoji: "🪀" },
    { l: "z", say: "zet", sound: "zuh",  word: "zon",     emoji: "☀️" }
  ]
};
