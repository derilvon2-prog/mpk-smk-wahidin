// Editor teks ala Word + pembersih HTML (aman dari XSS). Dipakai di dashboard.
const FONTS = ["Plus Jakarta Sans", "Arial", "Helvetica", "Verdana", "Tahoma", "Trebuchet MS", "Times New Roman", "Georgia", "Garamond", "Courier New", "Roboto Mono",
  "Playfair Display", "Merriweather", "Lora", "Poppins", "Oswald", "Caveat", "Pacifico", "Lobster", "Comic Sans MS"];
const UKURAN = [10, 12, 14, 16, 18, 20, 24, 28, 32, 40];
const TAG_OK = new Set("P DIV BR B STRONG I EM U S STRIKE SPAN H1 H2 H3 H4 UL OL LI BLOCKQUOTE HR A TABLE THEAD TBODY TR TD TH SUB SUP FONT IMG VIDEO FIGURE".split(" "));
const STYLE_OK = new Set(["font-family", "font-size", "color", "background-color", "text-align", "font-weight", "font-style", "text-decoration", "text-decoration-line", "line-height", "margin-left", "text-indent", "border", "border-collapse", "padding", "width"]);
const stylePola = /^[\w\s,.'"#%()\-]*$/;

// Bersihkan HTML dari sumber apa pun. Gambar/video hanya lewat data-path (storage privat kita).
function bersihHtml(html) {
  const doc = new DOMParser().parseFromString("<body>" + (html || "") + "</body>", "text/html");
  const jalan = (node) => {
    [...node.childNodes].forEach(ch => {
      if (ch.nodeType === 3) return;
      if (ch.nodeType !== 1) { ch.remove(); return; }
      if (/^(SCRIPT|STYLE|IFRAME|OBJECT|EMBED|NOSCRIPT|TEMPLATE|SVG|MATH|FORM|INPUT|BUTTON|TEXTAREA|SELECT|LINK|META|BASE)$/.test(ch.tagName)) { ch.remove(); return; }
      if (!TAG_OK.has(ch.tagName)) { ch.replaceWith(...[...ch.childNodes]); return; }   // buang tag, simpan teks
      [...ch.attributes].forEach(a => {
        const n = a.name;
        if (n === "style") {
          const ok = a.value.split(";").map(x => x.trim()).filter(Boolean).filter(x => { const [k, ...v] = x.split(":"); return STYLE_OK.has(k.trim().toLowerCase()) && stylePola.test(v.join(":")) && !/url\s*\(|expression/i.test(v.join(":")); });
          ch.setAttribute("style", ok.join(";"));
        } else if (n === "href" && ch.tagName === "A") { if (!/^https?:\/\//i.test(a.value)) ch.removeAttribute(n); else { ch.setAttribute("target", "_blank"); ch.setAttribute("rel", "noopener noreferrer"); } }
        else if (n === "data-path" && /^[0-9a-f-]{36}\/[\w.-]+$/i.test(a.value) && (ch.tagName === "IMG" || ch.tagName === "VIDEO")) { }
        else if (["face", "size", "color", "colspan", "rowspan", "controls"].includes(n)) { }
        else ch.removeAttribute(n);
      });
      if ((ch.tagName === "IMG" || ch.tagName === "VIDEO") && !ch.getAttribute("data-path")) { ch.remove(); return; }
      if (ch.tagName === "VIDEO") ch.setAttribute("controls", "");
      jalan(ch);
    });
  };
  jalan(doc.body);
  return doc.body.innerHTML;
}
// Ganti data-path dengan link bertanda tangan (berlaku 1 jam) agar media privat bisa tampil
async function pasangMedia(root) {
  const els = [...root.querySelectorAll("[data-path]")];
  await Promise.all(els.map(async el => {
    const { data } = await sb.storage.from("laporan").createSignedUrl(el.dataset.path, 3600);
    if (data) { el.src = data.signedUrl; if (el.tagName === "IMG") el.loading = "lazy"; }
  }));
}
// Buang src sementara sebelum disimpan
function htmlSimpan(root) {
  const c = root.cloneNode(true);
  c.querySelectorAll("[data-path]").forEach(e => e.removeAttribute("src"));
  return bersihHtml(c.innerHTML);
}
async function unggahMedia(file) {
  const video = file.type.startsWith("video/");
  if (!video && !file.type.startsWith("image/")) throw new Error("Hanya foto atau video.");
  if (video && file.size > 50 * 1024 * 1024) throw new Error("Video maksimal 50 MB. Potong atau kecilkan videonya dulu.");
  let blob = file;
  if (!video) blob = await olahGambar(file, 1600, "image/jpeg", 0.85).catch(() => file);
  const s = await getSession();
  const ext = video ? (file.type === "video/webm" ? "webm" : file.type === "video/quicktime" ? "mov" : "mp4") : (blob.type === "image/png" ? "png" : "jpg");
  const path = `${s.user.id}/${crypto.randomUUID()}.${ext}`;
  const { error } = await sb.storage.from("laporan").upload(path, blob, { contentType: blob.type || file.type });
  if (error) throw new Error("Gagal mengunggah: " + error.message);
  return { path, video };
}

function Editor(box, htmlAwal) {
  const opt = (arr, f) => arr.map(f).join("");
  box.classList.add("ed");
  box.innerHTML = `<div class="edbar">
    <select data-c="fontName" title="Jenis huruf">${opt(FONTS, f => `<option value="${f}" style="font-family:'${f}'">${f}</option>`)}</select>
    <select data-c="ukuran" title="Ukuran huruf">${opt(UKURAN, u => `<option value="${u}" ${u === 16 ? "selected" : ""}>${u}</option>`)}</select>
    <select data-c="formatBlock" title="Gaya paragraf"><option value="P">Paragraf</option><option value="H1">Judul 1</option><option value="H2">Judul 2</option><option value="H3">Judul 3</option><option value="BLOCKQUOTE">Kutipan</option></select>
    <button type="button" data-x="bold" title="Tebal"><b>B</b></button><button type="button" data-x="italic" title="Miring"><i>I</i></button>
    <button type="button" data-x="underline" title="Garis bawah"><u>U</u></button><button type="button" data-x="strikeThrough" title="Coret"><s>S</s></button>
    <button type="button" data-x="subscript" title="Subskrip">x<sub>2</sub></button><button type="button" data-x="superscript" title="Superskrip">x<sup>2</sup></button>
    <label class="warna" title="Warna huruf">A<input type="color" data-c="foreColor" value="#8b1230"></label>
    <label class="warna sorot" title="Sorot teks">&#9608;<input type="color" data-c="hiliteColor" value="#fff3a3"></label>
    <button type="button" data-x="justifyLeft" title="Rata kiri">&#8676;</button><button type="button" data-x="justifyCenter" title="Tengah">&#8801;</button>
    <button type="button" data-x="justifyRight" title="Rata kanan">&#8677;</button><button type="button" data-x="justifyFull" title="Rata kiri-kanan">&#9776;</button>
    <button type="button" data-x="insertUnorderedList" title="Daftar poin">&#8226; Poin</button><button type="button" data-x="insertOrderedList" title="Daftar nomor">1. No.</button>
    <button type="button" data-x="outdent" title="Kurangi indentasi">&laquo;</button><button type="button" data-x="indent" title="Tambah indentasi">&raquo;</button>
    <button type="button" data-a="link" title="Sisipkan link">Link</button><button type="button" data-a="tabel" title="Sisipkan tabel">Tabel</button>
    <button type="button" data-x="insertHorizontalRule" title="Garis pemisah">&#8212;</button>
    <label class="btnm" title="Sisipkan foto atau video">Foto/Video<input type="file" accept="image/*,video/*" hidden multiple></label>
    <button type="button" data-x="undo" title="Urungkan">&#8630;</button><button type="button" data-x="redo" title="Ulangi">&#8631;</button>
    <button type="button" data-x="removeFormat" title="Hapus format">Hapus format</button></div>
    <div class="edarea" contenteditable="true" spellcheck="true"></div><div class="edinfo meta"></div>`;
  const area = box.querySelector(".edarea"), info = box.querySelector(".edinfo");
  area.innerHTML = bersihHtml(htmlAwal);
  pasangMedia(area);
  let rentang = null;
  const simpanSel = () => { const s = getSelection(); if (s.rangeCount && area.contains(s.anchorNode)) rentang = s.getRangeAt(0).cloneRange(); };
  area.addEventListener("keyup", simpanSel); area.addEventListener("mouseup", simpanSel); area.addEventListener("touchend", simpanSel); area.addEventListener("blur", simpanSel);
  const pulih = () => { area.focus(); if (rentang) { const s = getSelection(); s.removeAllRanges(); s.addRange(rentang); } };
  const cmd = (c, v) => { pulih(); document.execCommand("styleWithCSS", false, true); document.execCommand(c, false, v); simpanSel(); };
  box.querySelector(".edbar").addEventListener("mousedown", e => { if (!e.target.closest("select,input")) e.preventDefault(); });
  box.querySelectorAll("[data-x]").forEach(b => b.onclick = () => cmd(b.dataset.x));
  box.querySelectorAll("select[data-c]").forEach(s => s.onchange = () => {
    if (s.dataset.c === "ukuran") { pulih(); document.execCommand("styleWithCSS", false, false); document.execCommand("fontSize", false, 7);
      area.querySelectorAll('font[size="7"]').forEach(f => { f.removeAttribute("size"); f.style.fontSize = s.value + "px"; }); simpanSel(); }
    else cmd(s.dataset.c, s.value);
  });
  box.querySelectorAll("input[type=color]").forEach(i => i.oninput = () => cmd(i.dataset.c, i.value));
  box.querySelector('[data-a="link"]').onclick = () => { const u = prompt("Alamat link (https://...)"); if (u && /^https?:\/\//i.test(u)) cmd("createLink", u); };
  box.querySelector('[data-a="tabel"]').onclick = () => {
    const r = parseInt(prompt("Jumlah baris?", "3"), 10), c = parseInt(prompt("Jumlah kolom?", "3"), 10); if (!(r > 0 && c > 0 && r < 30 && c < 10)) return;
    const td = '<td style="border:1px solid #999;padding:6px">&nbsp;</td>';
    cmd("insertHTML", `<table style="border-collapse:collapse;width:100%">${("<tr>" + td.repeat(c) + "</tr>").repeat(r)}</table><p><br></p>`); };
  box.querySelector("input[type=file]").onchange = async e => {
    for (const f of [...e.target.files]) {
      info.textContent = "Mengunggah " + f.name.slice(0, 30) + "...";
      try {
        const { path, video } = await unggahMedia(f);
        const { data } = await sb.storage.from("laporan").createSignedUrl(path, 3600);
        cmd("insertHTML", video ? `<video data-path="${path}" src="${data.signedUrl}" controls style="max-width:100%"></video><p><br></p>` : `<img data-path="${path}" src="${data.signedUrl}" style="max-width:100%"><p><br></p>`);
        info.textContent = "";
      } catch (er) { info.innerHTML = `<span style="color:var(--crimson)">${esc(er.message)}</span>`; }
    }
    e.target.value = "";
  };
  area.addEventListener("paste", e => { e.preventDefault(); const t = (e.clipboardData || window.clipboardData).getData("text/plain"); document.execCommand("insertText", false, t); });
  return { html: () => htmlSimpan(area), kosong: () => !area.textContent.trim() && !area.querySelector("[data-path]") };
}
