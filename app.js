(function () {
  "use strict";

  const D = window.LEER_DATA;
  const view = document.getElementById("view");
  const titleEl = document.getElementById("title");
  const backBtn = document.getElementById("back");
  const starsEl = document.getElementById("stars");

  /* ---------------- state ---------------- */
  let stars = 0;
  try { stars = parseInt(localStorage.getItem("lmm.stars") || "0", 10) || 0; } catch (e) {}
  function addStar(n) {
    stars += n || 1;
    try { localStorage.setItem("lmm.stars", String(stars)); } catch (e) {}
    renderStars();
  }
  function renderStars() { starsEl.textContent = "⭐ " + stars; }

  /* ---------------- speech (nl-NL) ---------------- */
  const hasSpeech = "speechSynthesis" in window;
  let voice = null;
  function pickVoice() {
    if (!hasSpeech) return;
    const vs = speechSynthesis.getVoices();
    voice = vs.find((v) => v.lang === "nl-NL") ||
            vs.find((v) => v.lang && v.lang.toLowerCase().startsWith("nl")) || null;
  }
  if (hasSpeech) {
    pickVoice();
    speechSynthesis.onvoiceschanged = pickVoice;
  }
  function makeUtter(text) {
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "nl-NL";
    if (voice) u.voice = voice;
    u.rate = 0.8;
    u.pitch = 1.1;
    return u;
  }
  function say(text) {
    if (!hasSpeech) return;
    speechSynthesis.cancel();
    speechSynthesis.speak(makeUtter(text));
  }
  function sayQueue(texts) {
    if (!hasSpeech) return;
    speechSynthesis.cancel();
    texts.forEach((t) => speechSynthesis.speak(makeUtter(t)));
  }

  /* ---------------- content model ---------------- */
  const cap = (w) => w.charAt(0).toUpperCase() + w.slice(1);

  const KINDS = {
    num: {
      title: "Cijfers",
      items: D.numbers.map((x) => ({
        glyph: String(x.n), n: x.n, say: x.word, word: x.word
      }))
    },
    upper: {
      title: "Hoofdletters",
      items: D.letters.map((x) => ({
        glyph: x.l.toUpperCase(), pair: x.l.toUpperCase() + " " + x.l,
        say: x.say, word: cap(x.word), emoji: x.emoji
      }))
    },
    lower: {
      title: "Kleine letters",
      items: D.letters.map((x) => ({
        glyph: x.l, pair: x.l.toUpperCase() + " " + x.l,
        say: x.say, word: x.word, emoji: x.emoji
      }))
    }
  };

  /* ---------------- helpers ---------------- */
  function shuffle(a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  const pick = (a) => a[Math.floor(Math.random() * a.length)];
  function countObjects(n) {
    const e = D.countEmoji[(n - 1) % D.countEmoji.length];
    return Array(n).fill(e);
  }
  function highlightFirst(word) {
    return "<b>" + word.charAt(0) + "</b>" + word.slice(1);
  }

  function setBar(title, showBack) {
    titleEl.textContent = title;
    backBtn.hidden = !showBack;
  }

  function burst(x, y) {
    const bits = ["⭐", "✨", "🎉", "🌟"];
    for (let i = 0; i < 10; i++) {
      const s = document.createElement("span");
      s.className = "burst";
      s.textContent = pick(bits);
      s.style.left = x + "px";
      s.style.top = y + "px";
      s.style.setProperty("--dx", (Math.random() * 240 - 120) + "px");
      s.style.setProperty("--dy", (Math.random() * -220 - 20) + "px");
      s.style.setProperty("--r", (Math.random() * 120 - 60) + "deg");
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1000);
    }
  }

  /* ---------------- home ---------------- */
  function home() {
    if (hasSpeech) speechSynthesis.cancel();
    setBar("Leer met mij", false);
    view.className = "";
    view.innerHTML =
      '<div class="home">' +
      '<button class="tile num" data-k="num"><span class="big">1 2 3</span><span class="sub">Cijfers</span></button>' +
      '<button class="tile upper" data-k="upper"><span class="big">A B C</span><span class="sub">Hoofdletters</span></button>' +
      '<button class="tile lower" data-k="lower"><span class="big">a b c</span><span class="sub">Kleine letters</span></button>' +
      "</div>";
    view.querySelectorAll(".tile").forEach((b) =>
      b.addEventListener("click", () => learn(b.dataset.k, 0))
    );
    backBtn.onclick = null;
  }

  /* ---------------- learn ---------------- */
  function learn(kind, i) {
    const K = KINDS[kind];
    const it = K.items[i];
    setBar(K.title, true);
    backBtn.onclick = home;
    view.className = "k-" + kind;

    let body;
    if (kind === "num") {
      const objs = countObjects(it.n).map((e) => "<span>" + e + "</span>").join("");
      body =
        '<div class="objs" id="objs" role="button" aria-label="Tel mee">' + objs + "</div>" +
        '<div class="numword">' + it.word + "</div>";
    } else {
      body =
        '<div class="pair">' + it.pair + "</div>" +
        '<button class="pic" id="pic"><span class="emoji">' + it.emoji + '</span>' +
        '<span class="word">' + highlightFirst(it.word) + "</span></button>";
    }

    view.innerHTML =
      '<section class="card c-' + kind + '">' +
      '<button class="glyph" id="glyph" aria-label="Luister">' + it.glyph + "</button>" +
      body +
      "</section>" +
      '<div class="actions">' +
      '<button class="btn nav" id="prev" aria-label="Vorige"' + (i === 0 ? " disabled" : "") + ">⬅</button>" +
      '<button class="btn" id="hear" aria-label="Luister">🔊</button>' +
      '<button class="btn" id="write" aria-label="Schrijf">✏️</button>' +
      '<button class="btn" id="play" aria-label="Spelletje">🎮</button>' +
      '<button class="btn nav" id="next" aria-label="Volgende"' + (i === K.items.length - 1 ? " disabled" : "") + ">➡</button>" +
      "</div>" +
      '<nav class="chips" id="chips">' +
      K.items.map((x, idx) =>
        '<button class="chip' + (idx === i ? " cur" : "") + '" data-i="' + idx + '">' + x.glyph + "</button>"
      ).join("") +
      "</nav>";

    const speakCard = () => {
      if (kind === "num") say(it.say);
      else sayQueue([it.say, it.word]);
    };

    const $ = (s) => view.querySelector(s);
    $("#glyph").onclick = () => say(it.say);
    $("#hear").onclick = speakCard;
    if (kind === "num") {
      $("#objs").onclick = () => countAloud(it.n);
    } else {
      $("#pic").onclick = () => say(it.word);
    }
    $("#write").onclick = () => openTrace(it.glyph, kind);
    $("#play").onclick = () => quiz(kind);
    $("#prev").onclick = () => learn(kind, i - 1);
    $("#next").onclick = () => learn(kind, i + 1);
    view.querySelectorAll(".chip").forEach((c) =>
      c.addEventListener("click", () => learn(kind, parseInt(c.dataset.i, 10)))
    );
    const cur = view.querySelector(".chip.cur");
    if (cur && cur.scrollIntoView) cur.scrollIntoView({ inline: "center", block: "nearest" });

    speakCard();
  }

  function countAloud(n) {
    if (!hasSpeech) return;
    const spans = view.querySelectorAll("#objs span");
    spans.forEach((s) => s.classList.remove("on"));
    speechSynthesis.cancel();
    for (let k = 1; k <= n; k++) {
      const u = makeUtter(D.numbers[k - 1].word);
      u.onstart = () => {
        spans.forEach((s) => s.classList.remove("on"));
        if (spans[k - 1]) spans[k - 1].classList.add("on");
      };
      if (k === n) u.onend = () => spans.forEach((s) => s.classList.remove("on"));
      speechSynthesis.speak(u);
    }
  }

  /* ---------------- trace (schrijven) ---------------- */
  function openTrace(glyph, kind) {
    const colors = { num: "#3a86ff", upper: "#ef476f", lower: "#06a77d" };
    const o = document.createElement("div");
    o.className = "overlay";
    o.innerHTML =
      '<div class="tbox"><canvas></canvas>' +
      '<div class="tbtns">' +
      '<button class="btn" id="tclear">🧽 Wis</button>' +
      '<button class="btn go" id="tdone">✅ Klaar</button>' +
      "</div></div>";
    document.body.appendChild(o);
    const cv = o.querySelector("canvas");
    const ctx = cv.getContext("2d");
    let w = 0, h = 0;

    function paintGuide() {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#e6e2d0";
      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";
      const size = Math.min(w * (glyph.length > 1 ? 0.5 : 0.95), h * 0.8);
      ctx.font = "bold " + size + 'px "Arial Rounded MT Bold","Trebuchet MS",system-ui,sans-serif';
      // centre vertically using actual glyph metrics
      const m = ctx.measureText(glyph);
      const asc = m.actualBoundingBoxAscent || size * 0.72;
      const desc = m.actualBoundingBoxDescent || 0;
      ctx.fillText(glyph, w / 2, h / 2 + (asc - desc) / 2);
    }
    function resize() {
      const r = cv.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      w = r.width; h = r.height;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      paintGuide();
    }
    resize();

    let drawing = false;
    const pos = (e) => {
      const r = cv.getBoundingClientRect();
      return [e.clientX - r.left, e.clientY - r.top];
    };
    cv.addEventListener("pointerdown", (e) => {
      drawing = true;
      cv.setPointerCapture(e.pointerId);
      const [x, y] = pos(e);
      ctx.strokeStyle = colors[kind];
      ctx.lineWidth = Math.max(14, Math.min(w, h) * 0.05);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + 0.01, y + 0.01);
      ctx.stroke();
    });
    cv.addEventListener("pointermove", (e) => {
      if (!drawing) return;
      const [x, y] = pos(e);
      ctx.lineTo(x, y);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(x, y);
    });
    const stop = () => { drawing = false; };
    cv.addEventListener("pointerup", stop);
    cv.addEventListener("pointercancel", stop);

    o.querySelector("#tclear").onclick = paintGuide;
    o.querySelector("#tdone").onclick = (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      burst(r.left + r.width / 2, r.top);
      addStar(1);
      say("Mooi geschreven!");
      o.remove();
    };
  }

  /* ---------------- quiz ---------------- */
  function quiz(kind) {
    const K = KINDS[kind];
    const ROUNDS = 5;
    let q = 0, score = 0;
    setBar("Spelletje", true);
    backBtn.onclick = () => learn(kind, 0);
    view.className = "k-" + kind;

    function next() {
      if (q >= ROUNDS) return finish();
      const target = pick(K.items);
      const others = shuffle(K.items.filter((x) => x !== target)).slice(0, 2);
      const opts = shuffle([target].concat(others));

      // question variants
      let variant;
      if (kind === "num") variant = q % 2 === 0 ? "hear" : "count";
      else variant = q % 2 === 0 ? "hear" : "picture";

      let promptHtml, speak;
      if (variant === "hear") {
        promptHtml = '<button class="listen" id="listen" aria-label="Luister">🔊</button>' +
          '<div class="q">Luister goed!</div>';
        speak = "Waar is de " + target.say + "?";
      } else if (variant === "count") {
        promptHtml = '<div class="objs">' +
          countObjects(target.n).map((e) => "<span>" + e + "</span>").join("") + "</div>" +
          '<div class="q">Hoeveel zijn het?</div>';
        speak = "Hoeveel zijn het?";
      } else {
        promptHtml = '<div class="emoji">' + target.emoji + '</div><div class="q">' + target.word +
          '</div><div class="q">Welke letter hoort erbij?</div>';
        speak = target.word + ". Welke letter hoort bij " + target.word + "?";
      }

      let dots = "";
      for (let d = 0; d < ROUNDS; d++) dots += d < q ? "⭐" : "⚪";

      view.innerHTML =
        '<div class="quiz">' +
        '<div class="progress">' + dots + "</div>" +
        '<div class="prompt" id="prompt">' + promptHtml + "</div>" +
        '<div class="options">' +
        opts.map((o, idx) => '<button class="opt" data-i="' + idx + '">' + o.glyph + "</button>").join("") +
        "</div></div>";

      const again = () => say(speak);
      view.querySelector("#prompt").onclick = again;
      again();

      let missed = false;
      view.querySelectorAll(".opt").forEach((b) => {
        b.addEventListener("click", () => {
          const chosen = opts[parseInt(b.dataset.i, 10)];
          if (chosen === target) {
            b.classList.add("good");
            const r = b.getBoundingClientRect();
            burst(r.left + r.width / 2, r.top + r.height / 2);
            if (!missed) { score++; addStar(1); }
            say("Goed zo!");
            view.querySelectorAll(".opt").forEach((x) => (x.style.pointerEvents = "none"));
            q++;
            setTimeout(next, 1400);
          } else {
            missed = true;
            b.classList.add("bad");
            say("Probeer het nog eens");
          }
        });
      });
    }

    function finish() {
      const trophy = score >= 4 ? "🏆" : score >= 2 ? "🎉" : "👍";
      view.innerHTML =
        '<div class="end">' +
        '<div class="trophy">' + trophy + "</div>" +
        '<div class="score">' + score + " van " + ROUNDS + " goed!</div>" +
        '<div class="actions">' +
        '<button class="btn" id="again">🔁 Nog een keer</button>' +
        '<button class="btn" id="home">🏠</button>' +
        "</div></div>";
      say(score >= 4 ? "Super goed gedaan!" : "Goed gedaan!");
      view.querySelector("#again").onclick = () => quiz(kind);
      view.querySelector("#home").onclick = home;
    }

    next();
  }

  /* ---------------- boot ---------------- */
  renderStars();
  home();

  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }
})();
