// Ikon garis (gaya modern, ikut warna teks)
const ICONS = {"shield": "<path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/><path d=\"m9 12 2 2 4-4\"/>", "check": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"m9 12 2 2 4-4\"/>", "megaphone": "<path d=\"m3 11 18-5v12L3 14v-3z\"/><path d=\"M11.6 16.8a3 3 0 1 1-5.8-1.6\"/>", "message": "<path d=\"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z\"/>", "chart": "<path d=\"M3 3v18h18\"/><path d=\"M18 17V9\"/><path d=\"M13 17V5\"/><path d=\"M8 17v-3\"/>", "news": "<path d=\"M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2\"/><path d=\"M18 14h-8\"/><path d=\"M15 18h-5\"/><path d=\"M10 6h8v4h-8z\"/>", "users": "<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\"/><circle cx=\"9\" cy=\"7\" r=\"4\"/><path d=\"M22 21v-2a4 4 0 0 0-3-3.87\"/><path d=\"M16 3.13a4 4 0 0 1 0 7.75\"/>", "image": "<rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\"/><circle cx=\"9\" cy=\"9\" r=\"2\"/><path d=\"m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21\"/>", "sparkles": "<path d=\"m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z\"/>", "layers": "<path d=\"m12 2 10 5-10 5L2 7z\"/><path d=\"m2 17 10 5 10-5\"/><path d=\"m2 12 10 5 10-5\"/>", "steps": "<path d=\"M10 6h11\"/><path d=\"M10 12h11\"/><path d=\"M10 18h11\"/><path d=\"M4 6h1v4\"/><path d=\"M4 10h2\"/><path d=\"M6 18H4c0-1 2-2 2-3s-1-1.5-2-1\"/>", "help": "<circle cx=\"12\" cy=\"12\" r=\"10\"/><path d=\"M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3\"/><path d=\"M12 17h.01\"/>", "home": "<path d=\"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\"/><path d=\"M9 22V12h6v10\"/>", "sliders": "<path d=\"M4 21v-7\"/><path d=\"M4 10V3\"/><path d=\"M12 21v-9\"/><path d=\"M12 8V3\"/><path d=\"M20 21v-5\"/><path d=\"M20 12V3\"/><path d=\"M1 14h6\"/><path d=\"M9 8h6\"/><path d=\"M17 16h6\"/>", "key": "<circle cx=\"7.5\" cy=\"15.5\" r=\"5.5\"/><path d=\"m21 2-9.6 9.6\"/><path d=\"m15.5 7.5 3 3L22 7l-3-3\"/>", "grid": "<rect x=\"3\" y=\"3\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"14\" y=\"3\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"14\" y=\"14\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"3\" y=\"14\" width=\"7\" height=\"7\" rx=\"1\"/>", "logout": "<path d=\"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4\"/><path d=\"m16 17 5-5-5-5\"/><path d=\"M21 12H9\"/>", "camera": "<path d=\"M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3z\"/><circle cx=\"12\" cy=\"13\" r=\"3\"/>", "thumb": "<path d=\"M7 10v12\"/><path d=\"M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88z\"/>", "pin": "<path d=\"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/>", "mail": "<rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\"/><path d=\"m22 7-10 6L2 7\"/>", "send": "<path d=\"m22 2-7 20-4-9-9-4z\"/><path d=\"M22 2 11 13\"/>", "right": "<path d=\"M5 12h14\"/><path d=\"m12 5 7 7-7 7\"/>", "left": "<path d=\"M19 12H5\"/><path d=\"m12 19-7-7 7-7\"/>", "up": "<path d=\"m5 12 7-7 7 7\"/><path d=\"M12 19V5\"/>", "thumbdown": "<path d=\"M17 14V2\"/><path d=\"M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88z\"/>", "pencil": "<path d=\"M12 20h9\"/><path d=\"M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z\"/>", "music": "<path d=\"M9 18V5l12-2v13\"/><circle cx=\"6\" cy=\"18\" r=\"3\"/><circle cx=\"18\" cy=\"16\" r=\"3\"/>", "download": "<path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\"/><path d=\"m7 10 5 5 5-5\"/><path d=\"M12 15V3\"/>", "search": "<circle cx=\"11\" cy=\"11\" r=\"8\"/><path d=\"m21 21-4.3-4.3\"/>", "moon": "<path d=\"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z\"/>", "sun": "<circle cx=\"12\" cy=\"12\" r=\"4\"/><path d=\"M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4\"/>", "bell": "<path d=\"M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9\"/><path d=\"M10.3 21a1.94 1.94 0 0 0 3.4 0\"/>", "gamepad": "<path d=\"M6 12h4M8 10v4\"/><circle cx=\"15\" cy=\"13\" r=\"1\"/><circle cx=\"18\" cy=\"11\" r=\"1\"/><rect x=\"2\" y=\"6\" width=\"20\" height=\"12\" rx=\"4\"/>", "cloud": "<path d=\"M17.5 19a4.5 4.5 0 1 0-1.4-8.8A6 6 0 1 0 6 18.5\"/><path d=\"M6 19h11.5\"/>", "droplet": "<path d=\"M12 22a7 7 0 0 0 7-7c0-4-7-13-7-13S5 11 5 15a7 7 0 0 0 7 7z\"/>", "wind": "<path d=\"M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2\"/><path d=\"M9.6 4.6A2 2 0 1 1 11 8H2\"/><path d=\"M12.6 19.4A2 2 0 1 0 14 16H2\"/>", "activity": "<path d=\"M22 12h-4l-3 9L9 3l-3 9H2\"/>", "thermo": "<path d=\"M14 4v10.5a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0z\"/>", "menu": "<path d=\"M4 6h16\"/><path d=\"M4 12h16\"/><path d=\"M4 18h16\"/>"};
function ic(n, s = 18) { return `<svg class="ic" width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[n] || ""}</svg>`; }

// ===== MPK SMK WAHIDIN - fungsi bersama =====
(function () {
  const cfg = window.MPK_CONFIG || {};
  window.configOk = !!cfg.SUPABASE_URL && !cfg.SUPABASE_URL.startsWith("ISI_");
  window.sb = window.configOk && window.supabase
    ? window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY)
    : null;
})();

// Cegah XSS: semua teks dari database wajib lewat esc()
function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function nl2br(s) { return esc(s).replace(/\n/g, "<br>"); }
function tgl(d) {
  try { return new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }); }
  catch { return ""; }
}
// Hanya izinkan URL gambar http(s)
function safeUrl(u) { return /^https?:\/\//i.test(u || "") ? esc(u) : ""; }

// Kasta: developer > owner/coowner > admin > anggota (pengunjung = tanpa login)
const JABATAN = ["developer", "owner", "coowner", "admin", "anggota"];
const LABEL = { developer: "Developer", owner: "Owner", coowner: "Co-owner", admin: "Admin", anggota: "Anggota" };
const EDITOR = ["developer", "owner", "coowner", "admin"];   // kelola berita, pengumuman, galeri
const ORG = ["developer", "owner", "coowner"];                // kelola struktur + info organisasi

// Hanya izinkan embed Google Maps untuk peta
function safeMapUrl(u) { return /^https:\/\/www\.google\.com\/maps\/embed\?/i.test(u || "") ? esc(u) : ""; }

// Logo: dipakai dari cache perangkat supaya tidak berkedip "MPK" lalu berganti
function logoCache() { try { return localStorage.getItem("mpk_logo") || ""; } catch { return ""; } }
function logoHtml() {
  const u = safeUrl(logoCache());
  return u ? `<img src="${esc(u)}" alt="MPK">` : "";
}
async function muatLogo() {
  const el = document.getElementById("logoBox"); if (!el) return;
  const akhir = u => { el.classList.remove("tunggu"); if (!u) el.textContent = "MPK"; };
  try {
    const { data } = await sb.from("pengaturan").select("nilai").eq("kunci", "logo_url").maybeSingle();
    const u = data && safeUrl(data.nilai);
    try { u ? localStorage.setItem("mpk_logo", u) : localStorage.removeItem("mpk_logo"); } catch { }
    if (u && logoCache() && el.querySelector("img") && el.querySelector("img").getAttribute("src") === u) return akhir(u);
    if (u) { const im = new Image(); im.alt = "MPK"; im.onload = () => { el.textContent = ""; el.appendChild(im); akhir(u); }; im.onerror = () => akhir(null); im.src = u; }
    else akhir(null);
  } catch { akhir(logoCache()); }
}
async function getSession() {
  if (!sb) return null;
  const { data } = await sb.auth.getSession();
  return data.session;
}
async function getProfile() {
  const s = await getSession();
  if (!s) return null;
  const { data } = await sb.from("profiles").select("*").eq("id", s.user.id).single();
  if (!data || !data.aktif) return null;
  return { ...data, email: s.user.email };
}

// Navbar + footer
async function renderShell(aktif) {
  const prof = await getProfile();
  const links = [
    ["index.html", "Beranda"], ["tentang.html", "Tentang MPK"], ["layanan.html", "Layanan"], ["aspirasi.html", "Aspirasi"],
    ["program.html", "Program Kerja"], ["publikasi.html", "Publikasi"]
  ];
  const nav = document.getElementById("nav");
  if (nav) {
    nav.innerHTML = `<div class="wrap">
      <a class="brand" href="index.html"><span class="logo ${logoCache() ? "" : "tunggu"}" id="logoBox">${logoHtml()}</span><span>MPK SMK WAHIDIN</span></a>
      <div class="navtools"><a href="cari.html" aria-label="Cari">${ic("search", 20)}</a>
        <a href="pengumuman.html" id="bellBtn" aria-label="Pengumuman">${ic("bell", 20)}<i class="dot" id="bellDot"></i></a>
        <button id="temaBtn" aria-label="Ganti tema">${ic("moon", 20)}</button></div>
      <button class="burger" aria-label="Menu" onclick="document.getElementById('menu').classList.toggle('open')">${ic("menu", 26)}</button>
      <nav class="menu" id="menu">
        ${links.map(l => `<a href="${l[0]}" class="${aktif === l[0] ? "on" : ""}">${l[1]}</a>`).join("")}
        ${prof ? `<a class="cta" href="dashboard.html">Dashboard</a>` : `<a class="cta" href="login.html">Login Pengurus</a>`}
      </nav></div>`;
  }
  const ft = document.getElementById("foot");
  if (ft) ft.innerHTML = `<div class="wrap">
    <div class="fgrid">
      <div><strong style="color:#fff">MPK SMK WAHIDIN</strong><br>Wadah aspirasi dan informasi resmi Majelis Permusyawaratan Kelas SMK Wahidin, Cirebon.</div>
      <div><strong style="color:#fff">Tautan Cepat</strong><br>${links.map(l => `<a href="${l[0]}">${l[1]}</a>`).join("<br>")}<br><a href="struktur.html">Daftar Anggota</a><br><a href="galeri.html">Galeri</a><br><a href="musik.html">Musik</a><br><a href="game.html">Arena</a><br><a href="alat.html">Cuaca &amp; Gempa</a><br><a href="#" id="robotOn">Tampilkan robot</a></div>
    </div>
    <div style="margin-top:16px;border-top:1px solid #333;padding-top:12px">© ${new Date().getFullYear()} MPK SMK WAHIDIN</div></div>`;
  if (!document.getElementById("topbtn")) {
    const b = document.createElement("button");
    b.id = "topbtn"; b.className = "topbtn"; b.setAttribute("aria-label", "Kembali ke atas"); b.innerHTML = ic("up", 22);
    b.onclick = () => window.scrollTo({ top: 0, behavior: "smooth" });
    document.body.appendChild(b);
    window.addEventListener("scroll", () => b.classList.toggle("show", window.scrollY > 500), { passive: true });
  }
  if (window.configOk) muatLogo();
  return prof;
}

function configWarning(el) {
  if (window.configOk) return false;
  el.innerHTML = `<div class="msg err">Website belum terhubung ke database. Isi <b>config.js</b> dengan URL dan anon key Supabase (lihat README).</div>`;
  return true;
}

// Olah gambar di browser: kecilkan + hapus metadata. PNG tetap PNG (supaya latar transparan aman).
function olahGambar(file, maxSisi, mime, mutu) {
  return new Promise((ok, gagal) => {
    const img = new Image(), url = URL.createObjectURL(file);
    img.onload = () => {
      const r = Math.min(1, maxSisi / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * r); c.height = Math.round(img.height * r);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      c.toBlob(b => b ? ok(b) : gagal(new Error("Gagal memproses foto.")), mime, mutu);
    };
    img.onerror = () => { URL.revokeObjectURL(url); gagal(new Error("Foto tidak bisa dibaca. Pakai foto JPG atau PNG (bukan HEIC).")); };
    img.src = url;
  });
}

// Upload gambar ke bucket "media". Ukuran asli foto HP tidak masalah, otomatis dikecilkan.
async function uploadGambar(file) {
  if (!file) return null;
  if (file.type && !/^image\//.test(file.type)) throw new Error("File harus berupa gambar.");
  const png = file.type === "image/png";
  const blob = await olahGambar(file, 1600, png ? "image/png" : "image/jpeg", 0.85);
  if (blob.size > 5 * 1024 * 1024) throw new Error("Foto masih terlalu besar setelah dikecilkan. Pilih foto lain.");
  const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${png ? "png" : "jpg"}`;
  const { error } = await sb.storage.from("media").upload(path, blob, { contentType: png ? "image/png" : "image/jpeg" });
  if (error) throw new Error("Upload gagal: " + (error.message || "tidak diketahui") + ". Pastikan kamu login sebagai Developer/Owner/Admin.");
  return sb.storage.from("media").getPublicUrl(path).data.publicUrl;
}

// ID perangkat anonim (untuk like, tanpa data pribadi)
function deviceId() {
  try {
    let d = localStorage.getItem("mpk_dev");
    if (!d) { d = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random().toString(36).slice(2)).replace(/-/g, ""); localStorage.setItem("mpk_dev", d); }
    return d;
  } catch { return "tamu" + Math.random().toString(36).slice(2, 12); }
}

// Kecilkan gambar (maks 1280px, JPEG) sebelum diunggah. Sekaligus menghapus metadata EXIF/GPS foto.
function kompresGambar(file, maxSisi = 1280, mutu = 0.82) {
  return new Promise((ok, gagal) => {
    if (!/^image\/(png|jpe?g|webp)$/.test(file.type)) return gagal(new Error("Foto harus berformat JPG, PNG, atau WebP."));
    const img = new Image(), url = URL.createObjectURL(file);
    img.onload = () => {
      const r = Math.min(1, maxSisi / Math.max(img.width, img.height));
      const c = document.createElement("canvas");
      c.width = Math.round(img.width * r); c.height = Math.round(img.height * r);
      c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url);
      c.toBlob(b => b ? ok(b) : gagal(new Error("Gagal memproses foto.")), "image/jpeg", mutu);
    };
    img.onerror = () => { URL.revokeObjectURL(url); gagal(new Error("Foto tidak bisa dibaca.")); };
    img.src = url;
  });
}


// ===== Suka / Tidak suka (anonim per perangkat; developer bisa menyunting angkanya) =====
const Reaksi = (() => {
  let dev = null;
  const isDev = async () => {
    if (dev === null) { try { const p = await getProfile(); dev = !!p && p.jabatan === "developer"; } catch { dev = false; } }
    return dev;
  };
  const gambar = (el, s, edit) => {
    el.innerHTML = `<div class="rkbar">
      <button class="rkb ${s.pilihan === 1 ? "on" : ""}" data-v="1" aria-label="Suka">${ic("thumb", 16)} <span>${s.suka}</span> Suka</button>
      <button class="rkb tdk ${s.pilihan === -1 ? "on" : ""}" data-v="-1" aria-label="Tidak suka">${ic("thumbdown", 16)} <span>${s.tidak}</span> Tidak suka</button>
      ${s.dev ? `<button class="rkb ed" data-ed="1" aria-label="Sunting angka">${ic("pencil", 15)}</button>` : ""}</div>
      ${s.dev && edit ? `<div class="rked"><span>Suka</span>${[-10, -1, 1, 10].map(n => `<button data-a="s${n}">${n > 0 ? "+" : ""}${n}</button>`).join("")}
        <span>Tidak</span>${[-10, -1, 1, 10].map(n => `<button data-a="t${n}">${n > 0 ? "+" : ""}${n}</button>`).join("")}</div>` : ""}`;
  };
  const pasangSatu = (el, tipe, id, s) => {
    let edit = false;
    const g = () => gambar(el, s, edit);
    g();
    el.onclick = async e => {
      const b = e.target.closest("button"); if (!b) return;
      if (b.dataset.ed) { edit = !edit; return g(); }
      if (b.dataset.a) {
        const n = parseInt(b.dataset.a.slice(1), 10), k = b.dataset.a[0];
        const { data, error } = await sb.rpc("reaksi_atur", { p_tipe: tipe, p_id: id, p_suka: k === "s" ? n : 0, p_tidak: k === "t" ? n : 0 });
        if (!error && data && data[0]) { s.suka = +data[0].suka; s.tidak = +data[0].tidak; g(); }
        return;
      }
      if (!b.dataset.v) return;
      const v = +b.dataset.v, baru = s.pilihan === v ? 0 : v, lama = { ...s };
      if (s.pilihan === 1) s.suka = Math.max(0, s.suka - 1);
      if (s.pilihan === -1) s.tidak = Math.max(0, s.tidak - 1);
      if (baru === 1) s.suka++;
      if (baru === -1) s.tidak++;
      s.pilihan = baru; g();
      const { error } = await sb.rpc("reaksi_beri", { p_tipe: tipe, p_id: id, p_device: deviceId(), p_nilai: baru });
      if (error) { Object.assign(s, lama); g(); }
    };
  };
  let sibuk = false;
  async function pasang() {
    if (sibuk || !window.configOk) return; sibuk = true;
    try {
      const els = [...document.querySelectorAll("[data-rk]:not([data-rk-ok])")];
      els.forEach(e => e.dataset.rkOk = 1);
      const grup = {};
      els.forEach(e => { const [t, i] = e.dataset.rk.split(":"); (grup[t] = grup[t] || []).push([e, +i]); });
      const d = await isDev();
      for (const [tipe, arr] of Object.entries(grup)) {
        const { data } = await sb.rpc("reaksi_ambil", { p_tipe: tipe, p_ids: [...new Set(arr.map(x => x[1]))], p_device: deviceId() });
        const peta = Object.fromEntries((data || []).map(r => [r.item_id, r]));
        arr.forEach(([el, id]) => { const r = peta[id] || {}; pasangSatu(el, tipe, id, { suka: +r.suka || 0, tidak: +r.tidak || 0, pilihan: +r.pilihan || 0, dev: d }); });
      }
    } finally { sibuk = false; }
  }
  let t;
  if (typeof MutationObserver !== "undefined") new MutationObserver(() => { clearTimeout(t); t = setTimeout(pasang, 120); }).observe(document.documentElement, { childList: true, subtree: true });
  return { pasang };
})();
