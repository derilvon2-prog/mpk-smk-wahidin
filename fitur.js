// Fitur publik: tema gelap, PWA, notifikasi pengumuman, maskot robot
(function () {
  const $ = id => document.getElementById(id);
  const ls = (k, v) => { try { if (v === undefined) return localStorage.getItem(k); v === null ? localStorage.removeItem(k) : localStorage.setItem(k, v); } catch { } };

  // ---- Tema ----
  const setTema = t => {
    document.documentElement.dataset.tema = t === "gelap" ? "gelap" : "";
    const b = $("temaBtn"); if (b) b.innerHTML = ic(t === "gelap" ? "sun" : "moon", 20);
    const m = document.querySelector('meta[name="theme-color"]'); if (m) m.content = t === "gelap" ? "#0b1018" : "#14308f";
  };
  setTema(ls("mpk_tema") || "terang");
  document.addEventListener("click", e => {
    if (!e.target.closest("#temaBtn")) return;
    const t = document.documentElement.dataset.tema === "gelap" ? "terang" : "gelap";
    ls("mpk_tema", t); setTema(t);
  });

  // ---- PWA ----
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("sw.js").catch(() => { });

  // ---- Notifikasi pengumuman (di dalam web) ----
  window.penandaiPengumuman = () => ls("mpk_png_seen", new Date().toISOString());
  async function bel() {
    if (!window.configOk || !$("bellDot")) return;
    const { data } = await sb.from("pengumuman").select("id,judul,dibuat").eq("terbit", true).order("dibuat", { ascending: false }).limit(10);
    if (!data || !data.length) return;
    const seen = ls("mpk_png_seen");
    const baru = data.filter(p => !seen || p.dibuat > seen);
    const d = $("bellDot"); d.textContent = baru.length > 9 ? "9+" : baru.length; d.classList.toggle("on", baru.length > 0);
    if (baru.length && "Notification" in window && Notification.permission === "granted" && ls("mpk_png_notif") !== data[0].id + "") {
      ls("mpk_png_notif", data[0].id + "");
      try { new Notification("Pengumuman baru - MPK SMK Wahidin", { body: data[0].judul, icon: "icon-192.png" }); } catch { }
    }
  }
  setTimeout(bel, 700);

  document.addEventListener("click", e => { if (e.target.closest("#robotOn")) { e.preventDefault(); ls("mpk_robot", null); location.reload(); } });
  // ---- Maskot robot (12 pose) ----
  if (ls("mpk_robot") === "off" || document.body.dataset.noRobot) return;
  const POSE = ["idle", "sapa", "senang", "semangat", "kesal", "ngantuk", "berpikir", "kaget", "sedih", "malu", "kagum", "hormat"];
  const BAWAAN = [{ teks: "Suaramu penting. Sampaikan lewat aspirasi.", pose: "senang" }, { teks: "Belajar hari ini, memimpin esok hari.", pose: "semangat" }];
  let kata = [];
  if (window.configOk) sb.from("robot_kata").select("teks,pose").eq("tampil", true).order("urutan").order("id").then(({ data }) => { kata = data || []; }, () => { });

  const w = document.createElement("div");
  w.id = "robot"; w.setAttribute("role", "button"); w.setAttribute("aria-label", "Robot maskot MPK, ketuk untuk kata-kata");
  w.innerHTML = `<div class="rbubble" id="rbub"></div>
  <svg viewBox="0 0 120 150" width="92" height="115" aria-hidden="true">
    <ellipse cx="60" cy="144" rx="30" ry="4.5" fill="rgba(0,0,0,.22)"/>
    <g class="rbody">
      <path d="M32 100C30 88 40 80 60 80S90 88 88 100C90 122 78 138 60 138S30 122 32 100Z" fill="#f7f4f6" stroke="#e3dde0" stroke-width="1.2"/>
      <g class="rarm al"><rect x="19" y="86" width="15" height="36" rx="7.5" fill="#fff" stroke="#e3dde0"/></g>
      <path d="M42 82L50 80L60 100L70 80L78 82L82 118L60 128L38 118Z" fill="#14141a"/>
      <path d="M42 82L50 80L60 100L70 80L78 82" fill="none" stroke="#b3203f" stroke-width="1.6"/>
      <path d="M54 80L60 86L66 80L63 100H57Z" fill="#fff"/><path d="M58 86h4l1.5 12L60 104l-3.5-6Z" fill="#c4172f"/>
      <circle cx="70" cy="104" r="6" fill="none" stroke="#fff" stroke-width=".8"/><text x="70" y="106" font-size="4.4" font-weight="800" fill="#fff" text-anchor="middle" font-family="sans-serif">MPK</text>
      <g class="rarm ar"><rect x="86" y="86" width="15" height="36" rx="7.5" fill="#fff" stroke="#e3dde0"/>
        <rect x="85" y="95" width="17" height="11" rx="2" fill="#c4172f"/><rect x="85" y="96.6" width="17" height="1" fill="#fff"/><rect x="85" y="103.4" width="17" height="1" fill="#fff"/>
        <text x="93.5" y="102.4" font-size="5.2" font-weight="800" fill="#fff" text-anchor="middle" font-family="sans-serif">MPK</text></g>
      <g class="rhead">
        <ellipse cx="13" cy="56" rx="8" ry="10" fill="#fff" stroke="#e3dde0"/><ellipse cx="14" cy="56" rx="4" ry="6.5" fill="#c4172f"/>
        <ellipse cx="107" cy="56" rx="8" ry="10" fill="#fff" stroke="#e3dde0"/><ellipse cx="106" cy="56" rx="4" ry="6.5" fill="#c4172f"/>
        <rect x="16" y="20" width="88" height="68" rx="32" fill="#fff" stroke="#e3dde0" stroke-width="1.4"/>
        <path d="M30 31Q60 18 90 31L84 36Q60 27 36 36Z" fill="#c4172f"/>
        <rect x="24" y="36" width="72" height="46" rx="22" fill="#0a0b12"/>
        <path d="M32 44q8-5 22-6" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="2.4" stroke-linecap="round"/>
        <circle cx="34" cy="66" r="6" fill="#b3203f" opacity=".55"/><circle cx="86" cy="66" r="6" fill="#b3203f" opacity=".55" class="pipi"/>
        <g class="e e-norm" fill="#fff"><ellipse cx="46" cy="58" rx="5.2" ry="6.4"/><ellipse cx="74" cy="58" rx="5.2" ry="6.4"/></g>
        <g class="e e-happy" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round"><path d="M40 62q6-9 12 0"/><path d="M68 62q6-9 12 0"/></g>
        <g class="e e-sleep" fill="none" stroke="#fff" stroke-width="3.4" stroke-linecap="round"><path d="M40 58q6 6 12 0"/><path d="M68 58q6 6 12 0"/></g>
        <g class="e e-mad" fill="none" stroke="#ff8aa0" stroke-width="3.4" stroke-linecap="round"><path d="M40 53l13 5"/><path d="M80 53l-13 5"/><path d="M42 63h8"/><path d="M70 63h8"/></g>
        <g class="e e-wide" fill="#fff"><circle cx="46" cy="58" r="8"/><circle cx="74" cy="58" r="8"/><circle cx="46" cy="58" r="2.6" fill="#0a0b12"/><circle cx="74" cy="58" r="2.6" fill="#0a0b12"/></g>
        <g class="e e-star" fill="#ffd45e"><path d="M46 49l2.6 5.6 6 .7-4.5 4.1 1.2 6L46 62.5 40.7 65.4l1.2-6-4.5-4.1 6-.7Z"/><path d="M74 49l2.6 5.6 6 .7-4.5 4.1 1.2 6L74 62.5 68.7 65.4l1.2-6-4.5-4.1 6-.7Z"/></g>
        <g class="e e-sad" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round"><path d="M40 62q6-6 12 0"/><path d="M68 62q6-6 12 0"/><path d="M42 52l9-3"/><path d="M78 52l-9-3"/></g>
        <g class="e e-think" fill="#fff"><ellipse cx="46" cy="58" rx="5.2" ry="6.4"/><ellipse cx="74" cy="56" rx="5.2" ry="7.4"/><path d="M66 48q8-4 16 0" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/></g>
        <path class="m m-flat" d="M54 72h12" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>
        <path class="m m-smile" d="M52 70q8 8 16 0" fill="none" stroke="#fff" stroke-width="2.8" stroke-linecap="round"/>
        <ellipse class="m m-o" cx="60" cy="73" rx="4" ry="5" fill="#fff"/>
        <path class="m m-sad" d="M52 76q8-8 16 0" fill="none" stroke="#fff" stroke-width="2.8" stroke-linecap="round"/>
        <path class="m m-wave" d="M50 73q3-4 6 0t6 0t6 0" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round"/>
        <path class="m m-grin" d="M50 70h20q-2 10-10 10t-10-10Z" fill="#fff"/>
      </g>
    </g>
    <g class="x x-zzz" font-family="sans-serif" font-weight="800" fill="#6b7cff"><text class="z1" x="92" y="30" font-size="16">Z</text><text class="z2" x="102" y="18" font-size="12">z</text></g>
    <g class="x x-tanya" font-family="sans-serif" font-weight="800" fill="#3b82f6"><text x="96" y="26" font-size="22">?</text></g>
    <g class="x x-seru" font-family="sans-serif" font-weight="800" fill="#ffd45e"><text x="96" y="26" font-size="24">!</text></g>
    <g class="x x-marah" stroke="#ff4d6a" stroke-width="3" stroke-linecap="round"><path d="M8 34l8 4"/><path d="M6 44l9 1"/><path d="M10 24l6 6"/></g>
    <g class="x x-hati" fill="#ff4d6a"><path d="M96 28c-4-6-12 0-6 6l6 6 6-6c6-6-2-12-6-6Z"/></g>
    <g class="x x-kilau" fill="#ffd45e"><path d="M100 24l2 6 6 2-6 2-2 6-2-6-6-2 6-2Z"/><path d="M12 30l1.4 4 4 1.4-4 1.4-1.4 4-1.4-4-4-1.4 4-1.4Z"/></g>
    <g class="x x-keringat" fill="#7fd4ff"><path d="M98 40q-5 8 0 10t0-10Z"/></g>
  </svg>
  <button class="rtutup" aria-label="Sembunyikan robot">x</button>`;
  document.body.appendChild(w);
  const bub = w.querySelector("#rbub");
  let pose = "idle", tmr, diam, bubT, amb, klik = 0, klikT;
  const dasar = () => { const j = new Date().getHours(); return (j >= 22 || j < 5) ? "ngantuk" : (j >= 5 && j < 12) ? "semangat" : "idle"; };
  const setPose = p => { pose = p; w.className = "rbt p-" + p; };
  const bicara = t => { bub.textContent = t; bub.classList.add("on"); clearTimeout(bubT); bubT = setTimeout(() => bub.classList.remove("on"), 5200); };
  const kembali = () => setPose(dasar());
  const kesal = () => { if (pose === "ngantuk") return; setPose("kesal"); bicara("Hei, ada orang di sana?"); setTimeout(() => { kembali(); idle(); }, 8000); };
  const idle = () => { clearTimeout(diam); diam = setTimeout(kesal, 10000); };
  ["pointerdown", "scroll", "keydown", "touchstart"].forEach(ev => addEventListener(ev, () => { if (pose !== "kesal") idle(); }, { passive: true }));
  const AMB = ["berpikir", "kagum", "malu", "hormat", "sedih", "kaget", "sapa"];
  amb = setInterval(() => { if (pose === dasar() && !bub.classList.contains("on")) { setPose(AMB[Math.floor(Math.random() * AMB.length)]); setTimeout(kembali, 3200); } }, 22000);
  setPose("idle");
  setTimeout(() => { setPose("sapa"); bicara(dasar() === "ngantuk" ? "Hoamm... sudah malam, jangan begadang ya." : dasar() === "semangat" ? "Selamat pagi! Semangat hari ini!" : "Halo, selamat datang di website kami!"); setTimeout(() => { kembali(); idle(); }, 2800); }, 1800);
  w.addEventListener("click", e => {
    if (e.target.closest(".rtutup")) { ls("mpk_robot", "off"); clearInterval(amb); w.remove(); return; }
    klik++; clearTimeout(klikT); klikT = setTimeout(() => klik = 0, 1500);
    if (klik >= 4) { klik = 0; setPose("kaget"); bicara("Eh! Jangan digelitik terus!"); clearTimeout(tmr); tmr = setTimeout(() => { kembali(); idle(); }, 2600); return; }
    const d = kata.length ? kata : BAWAAN, q = d[Math.floor(Math.random() * d.length)];
    const acak = ["senang", "semangat", "kagum", "sapa", "berpikir"];
    setPose(POSE.includes(q.pose) && q.pose ? q.pose : acak[Math.floor(Math.random() * acak.length)]); bicara(q.teks);
    clearTimeout(tmr); tmr = setTimeout(() => { kembali(); idle(); }, 3200);
  });
  idle();
})();
