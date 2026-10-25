# Leer met mij

Offline PWA (vanilla JS, no build step) to learn cijfers 1–20, HOOFDLETTERS and kleine letters in Dutch.

## Run
Needs to be served over HTTPS or localhost for install + offline:

    cd leer-met-mij && python3 -m http.server 8080     # then open http://localhost:8080

Deploy anywhere static (GitHub Pages, Netlify). On the phone: open the URL → "Add to Home Screen".

## Features
- Cards with big glyph, picture + word (first letter highlighted), tap to hear (nl-NL speech)
- Numbers: tap the pictures to count aloud
- ✏️ Finger tracing over a faint guide letter/number
- 🎮 5-question game (listen / count / picture→letter), ⭐ stars saved locally

## Customise the words (NKC thema)
Edit `data.js`: change `word` / `emoji` per letter to match the school's word list.
`say` is the spoken letter name. After changing files, bump `CACHE` in `sw.js` so installed copies update.
