// Animasi halaman: gelombang pembuka, teks masuk dari samping, muncul saat scroll, hitung angka naik.
(function () {
  const root = document.documentElement;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  root.classList.add("anim");

  // Gelombang putih yang naik membuka hero (seperti di video)
  const hero = document.querySelector(".hero2");
  if (hero) {
    const w = document.createElement("div");
    w.className = "waveWipe";
    w.innerHTML = '<svg viewBox="0 0 1440 120" preserveAspectRatio="none"><path d="M0 0H1440V60C1260 110 1080 20 900 56S540 110 360 66 90 30 0 70Z" fill="#fff"/></svg>';
    hero.appendChild(w);
    setTimeout(() => w.remove(), 1800);
  }

  // Hitung angka naik
  const hitung = el => {
    const n = parseInt(el.textContent.replace(/\D/g, ""), 10);
    if (isNaN(n) || el.dataset.cnt) return;
    el.dataset.cnt = 1;
    if (n === 0) return;
    const t0 = performance.now(), dur = 1400;
    const f = t => { const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(n * e); if (p < 1) requestAnimationFrame(f); };
    el.textContent = "0"; requestAnimationFrame(f);
  };

  const SEL = ".judul,.sub,main .card,.langkah>*,.faq,.btn.sm,main>section>.btn,.person,.kosong,.map,iframe,.row>*,.stats,#b-kontak>*";
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    e.target.querySelectorAll && e.target.querySelectorAll(".stats b").forEach(hitung);
    if (e.target.matches(".stats b")) hitung(e.target);
    io.unobserve(e.target);
  }), { threshold: .12, rootMargin: "0px 0px -40px 0px" });

  const daftar = el => {
    if (el.nodeType !== 1 || el.dataset.rv || el.closest(".hero2,.nav,header,#topbtn")) return;
    el.dataset.rv = 1;
    const sib = el.parentElement ? [...el.parentElement.children].indexOf(el) : 0;
    el.style.setProperty("--d", Math.min(sib, 7) * 90 + "ms");
    el.classList.add("rv");
    io.observe(el);
  };
  const pindai = n => { if (n.nodeType !== 1) return; if (n.matches(SEL)) daftar(n); n.querySelectorAll(SEL).forEach(daftar); };
  pindai(document.body);
  new MutationObserver(ms => ms.forEach(m => m.addedNodes.forEach(pindai))).observe(document.body, { childList: true, subtree: true });

  // Hitung angka statistik hero (tampil langsung, tanpa scroll)
  new MutationObserver((_, ob) => {
    const b = document.querySelectorAll(".statsPos .stats b");
    if (b.length) { setTimeout(() => b.forEach(hitung), 900); ob.disconnect(); }
  }).observe(document.body, { childList: true, subtree: true });
})();
