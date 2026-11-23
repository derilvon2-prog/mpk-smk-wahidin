// Blok tampilan publik yang dipakai berulang di banyak halaman.
// Cara pakai: taruh <div id="b-NAMA"></div>, lalu panggil Blok.init().
const Blok = (() => {
  let S = {};
  const $ = id => document.getElementById(id);
  const kosong = t => `<div class="kosong" style="grid-column:1/-1">${t}</div>`;
  const belum = `<span style="color:var(--gray)">Data resmi belum diisi oleh pengurus.</span>`;
  const R = {};

  R.statistik = async el => {
    const { data } = await sb.rpc("statistik_publik");
    el.innerHTML = data ? `<div class="stats"><div><b>${+data.kunjungan || 0}</b><span>Pengunjung</span></div>
      <div><b>${+data.pengurus || 0}</b><span>Pengurus</span></div><div><b>${+data.publikasi || 0}</b><span>Publikasi</span></div></div>` : "";
  };

  R.foto = async el => {
    const { data: fo, error } = await sb.from("beranda_foto").select("*").eq("tampil", true).order("urutan").order("id");
    const sesi = await getSession().catch(() => null);
    const petunjuk = t => sesi ? `<div class="hintFoto">${t}</div>` : "";
    if (error) { el.innerHTML = `<div class="stageImg kosongFoto"></div>${petunjuk("Foto gagal dimuat: " + esc(error.message))}`; return; }
    if (!fo || !fo.length) { el.innerHTML = `<div class="stageImg kosongFoto"></div>${petunjuk("Belum ada foto beranda. Buka Dashboard, menu Foto Beranda, lalu unggah foto.")}`; return; }
    const cut = u => /\.png(\?|$)/i.test(u || "");
    el.innerHTML = `<div class="stageImg">${fo.map((f, i) => `<img class="${i ? "" : "on"} ${cut(f.gambar_url) ? "cut" : "arch"}" src="${safeUrl(f.gambar_url)}" alt="${esc(f.keterangan)}">`).join("")}</div>`;
    el.querySelectorAll("img").forEach(im => im.addEventListener("error", () => {
      im.remove();
      if (!el.querySelector("img")) el.innerHTML = `<div class="stageImg kosongFoto"></div>${petunjuk("Alamat foto tidak bisa dibuka. Unggah ulang fotonya di Dashboard.")}`;
    }));
    if (fo.length > 1) {
      let n = 0; const im = el.querySelectorAll("img");
      setInterval(() => { im[n].classList.remove("on"); n = (n + 1) % im.length; im[n].classList.add("on"); }, 4500);
    }
  };

  // Label melayang di sekitar foto: diambil dari nama komisi yang sudah diisi (tanpa data karangan)
  R.badges = async el => {
    const { data } = await sb.from("komisi").select("id,nama").eq("tampil", true).order("nomor").order("id").limit(4);
    el.innerHTML = (data || []).map((k, i) => `<a class="bd bd${i + 1}" href="komisi.html?id=${k.id}">${esc(k.nama)}</a>`).join("");
  };

  R.tentang = el => {
    el.innerHTML = `<div class="card"><h3>Tentang MPK</h3>${S.tentang ? `<p>${nl2br(S.tentang)}</p>` : belum}</div>
      <div class="row" style="gap:16px;margin-top:16px"><div class="card"><h3>Visi</h3>${S.visi ? `<p>${nl2br(S.visi)}</p>` : belum}</div>
      <div class="card"><h3>Misi</h3>${S.misi ? `<p>${nl2br(S.misi)}</p>` : belum}</div></div>`;
  };

  // ---- Forum aspirasi ----
  const STATUS = { diterima: "Diterima", diproses: "Diproses", selesai: "Selesai Ditindaklanjuti" };
  async function forum(el) {
    const limit = parseInt(el.dataset.limit || "100", 10);
    const { data, error } = await sb.rpc("forum_aspirasi", { p_device: deviceId() });
    if (error) { el.innerHTML = kosong("Forum belum bisa dimuat."); return; }
    let list = data || [];
    const kat = $("filterKat");
    if (kat && kat.value) list = list.filter(a => a.kategori === kat.value);
    list = list.slice(0, limit);
    el.innerHTML = list.length ? list.map(a => `<div class="card asp">
      <div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap"><span class="tag">${esc(a.kategori)}</span><span class="meta">${tgl(a.dibuat)}</span></div>
      <div class="meta" style="margin:0">${a.nama ? esc(a.nama) : "Anonim"}</div>
      <div class="isi">${nl2br(a.isi)}</div>
      ${safeUrl(a.foto_url) ? `<img loading="lazy" src="${safeUrl(a.foto_url)}" alt="Foto pendukung">` : ""}
      ${a.tanggapan ? `<div class="tanggapan"><b>Tanggapan MPK:</b><br>${nl2br(a.tanggapan)}</div>` : ""}
      <div class="bawah"><span class="tag st-${esc(a.status)}">${esc(STATUS[a.status] || a.status)}</span>
        </div><div class="rk" data-rk="aspirasi:${a.id}"></div></div>`).join("")
      : kosong("Belum ada aspirasi yang tampil di forum.");
  }
  R.forum = el => forum(el);

  R.komisi = async el => {
    const { data } = await sb.from("komisi").select("*").eq("tampil", true).order("nomor").order("id");
    el.innerHTML = (data && data.length) ? data.map(k => `<div class="card komisi">
      <div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap"><span class="meta">KOMISI ${+k.nomor}</span><span class="badge ok">${esc(k.status)}</span></div>
      <h3><a href="komisi.html?id=${k.id}">${esc(k.nama)}</a></h3><p>${nl2br(k.deskripsi)}</p>
      ${k.fokus.trim() ? `<b style="font-size:13px">Fokus Program Kerja:</b><ul>${k.fokus.split("\n").filter(x => x.trim()).map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}</div>`).join("")
      : kosong("Data komisi dan program kerja belum diisi oleh pengurus.");
  };

  R.tahapan = async el => {
    const { data } = await sb.from("tahapan").select("*").eq("tampil", true).order("urutan").order("id");
    el.innerHTML = (data && data.length) ? data.map(t => `<div class="card"><h3>${esc(t.judul)}</h3><p>${nl2br(t.deskripsi)}</p>
      ${t.label ? `<div class="meta" style="margin-top:8px">${esc(t.label)}</div>` : ""}</div>`).join("")
      : kosong("Tahapan penanganan aspirasi belum diisi oleh pengurus.");
  };

  const kartuBerita = b => `<div class="card">
    ${safeUrl(b.gambar_url) ? `<div class="thumb"><img loading="lazy" src="${safeUrl(b.gambar_url)}" alt=""></div>` : ""}
    <div class="meta">${tgl(b.dibuat)}</div><h3><a href="berita.html?id=${b.id}">${esc(b.judul)}</a></h3><p>${esc(b.ringkasan)}</p><div class="rk" data-rk="berita:${b.id}"></div></div>`;
  R.berita = async el => {
    const limit = parseInt(el.dataset.limit || "50", 10);
    const { data } = await sb.from("berita").select("id,judul,ringkasan,gambar_url,dibuat").eq("terbit", true).order("dibuat", { ascending: false }).limit(limit);
    el.innerHTML = (data && data.length) ? data.map(kartuBerita).join("") : kosong("Belum ada berita.");
  };

  async function aktivitas(el) {
    const limit = parseInt(el.dataset.limit || "50", 10);
    const { data } = await sb.from("aktivitas").select("*").eq("tampil", true).order("tanggal", { ascending: false }).limit(limit);
    let list = data || [];
    const f = $("filterAkt"); if (f && f.value) list = list.filter(a => a.kategori === f.value);
    el.innerHTML = list.length ? list.map(a => `<div class="card">
      ${safeUrl(a.gambar_url) ? `<div class="thumb"><img loading="lazy" src="${safeUrl(a.gambar_url)}" alt=""></div>` : ""}
      <div class="meta">${tgl(a.tanggal)}${a.kategori ? ` · ${esc(a.kategori)}` : ""}</div>
      <h3>${esc(a.judul)}</h3><p>${esc(a.ringkasan)}</p>
      ${/^https:\/\//i.test(a.link || "") ? `<a class="btn sm gray" href="${esc(a.link)}" target="_blank" rel="noopener noreferrer">Buka dokumentasi</a>` : ""}<div class="rk" data-rk="aktivitas:${a.id}"></div></div>`).join("")
      : kosong("Belum ada aktivitas.");
    if (f && !f.dataset.siap) {
      const kats = [...new Set((data || []).map(a => a.kategori).filter(Boolean))];
      f.innerHTML = `<option value="">Semua kategori</option>` + kats.map(k => `<option>${esc(k)}</option>`).join("");
      f.dataset.siap = 1; f.onchange = () => aktivitas(el);
    }
  }
  R.aktivitas = el => aktivitas(el);

  R.pengurus = async el => {
    const limit = parseInt(el.dataset.limit || "100", 10);
    const { data } = await sb.from("struktur").select("*").eq("tampil", true).order("urutan").order("id").limit(limit);
    el.innerHTML = (data && data.length) ? data.map(p => `<div class="card person">
      <div class="foto">${safeUrl(p.foto_url) ? `<img loading="lazy" src="${safeUrl(p.foto_url)}" alt="">` : esc(p.nama.charAt(0).toUpperCase())}</div>
      <h3>${esc(p.nama)}</h3><div><span class="badge">${esc(p.jabatan)}</span></div>
      ${p.periode ? `<div class="meta" style="margin-top:6px">Periode ${esc(p.periode)}</div>` : ""}</div>`).join("")
      : kosong("Data pengurus belum diisi oleh admin.");
  };

  R.pengumuman = async el => {
    const { data } = await sb.from("pengumuman").select("*").eq("terbit", true).order("dibuat", { ascending: false }).limit(+el.dataset.limit || 3);
    const sec = $("sPeng");
    if (!data || !data.length) { if (sec) sec.classList.add("hide"); return; }
    if (sec) sec.classList.remove("hide");
    el.innerHTML = data.map(p => `<div class="card"><div class="meta">${tgl(p.dibuat)}</div><h3>${esc(p.judul)}</h3><p>${esc((p.isi || "").slice(0, 160))}${(p.isi || "").length > 160 ? "..." : ""}</p></div>`).join("");
  };

  R.faq = async el => {
    const { data } = await sb.from("faq").select("*").eq("tampil", true).order("urutan").order("id");
    el.innerHTML = (data && data.length) ? data.map(f => `<details class="faq"><summary>${esc(f.pertanyaan)}</summary><p>${nl2br(f.jawaban)}</p></details>`).join("")
      : kosong("FAQ belum diisi oleh pengurus.");
  };

  R.kontak = el => {
    const t = [];
    if (S.alamat) t.push(`<span class="krow">${ic("pin", 17)} ${esc(S.alamat)}</span>`);
    if (S.kontak_email) t.push(`<span class="krow">${ic("mail", 17)} ${esc(S.kontak_email)}</span>`);
    if (S.kontak_wa) t.push(`<span class="krow">${ic("message", 17)} WhatsApp: ${esc(S.kontak_wa)}</span>`);
    const sos = [["instagram", "Instagram"], ["youtube", "YouTube"], ["tiktok", "TikTok"]]
      .filter(([k]) => S[k]).map(([k, n]) => /^https:\/\//i.test(S[k]) ? `<a href="${esc(S[k])}" target="_blank" rel="noopener noreferrer">${n}</a>` : `${n}: ${esc(S[k])}`);
    if (sos.length) t.push(sos.join(" · "));
    el.innerHTML = t.length ? `<div class="card">${t.join("")}</div>` : `<div class="card">${belum}</div>`;
  };

  R.peta = el => {
    const pu = safeMapUrl(S.peta_embed);
    el.innerHTML = pu ? `<div class="peta"><iframe src="${pu}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Peta lokasi SMK Wahidin"></iframe></div>`
      : `<div class="kosong">Peta lokasi belum diisi.</div>`;
  };

  // ---- Polling ----
  async function polling(el) {
    const { data, error } = await sb.rpc("polling_hasil", { p_device: deviceId() });
    if (error || !data || !data.length) { el.innerHTML = kosong("Belum ada polling aktif."); return; }
    el.innerHTML = data.map(p => {
      const total = p.opsi.reduce((a, o) => a + +o.jumlah, 0);
      const sudah = p.pilihan != null;
      return `<div class="card" data-p="${p.id}"><h3>${esc(p.pertanyaan)}</h3>
        ${p.opsi.map(o => {
          const pct = total ? Math.round(+o.jumlah * 100 / total) : 0;
          return sudah
            ? `<div style="margin:8px 0"><div style="display:flex;justify-content:space-between;font-size:14px"><span>${esc(o.teks)}${o.id == p.pilihan ? ic("check", 15) : ""}</span><b>${pct}%</b></div>
               <div style="height:8px;background:#eee;border-radius:99px;overflow:hidden"><div style="width:${pct}%;height:100%;background:var(--crimson)"></div></div></div>`
            : `<button class="btn gray" style="width:100%;margin:5px 0;justify-content:flex-start" data-o="${o.id}">${esc(o.teks)}</button>`;
        }).join("")}
        <div class="meta">${total} suara${sudah ? " · kamu bisa mengubah pilihan dengan memilih lagi di bawah" : ""}</div>
        ${sudah ? `<details style="margin-top:6px"><summary class="meta" style="cursor:pointer">Ubah pilihan</summary>${p.opsi.map(o => `<button class="btn sm gray" style="margin:4px 4px 0 0" data-o="${o.id}">${esc(o.teks)}</button>`).join("")}</details>` : ""}</div>`;
    }).join("");
    el.querySelectorAll("[data-o]").forEach(b => b.onclick = async () => {
      const pid = +b.closest("[data-p]").dataset.p;
      b.disabled = true;
      const { error } = await sb.rpc("pilih_polling", { p_polling: pid, p_opsi: +b.dataset.o, p_device: deviceId() });
      if (error) { b.disabled = false; return; }
      polling(el);
    });
  }
  R.polling = el => polling(el);

  // ---- Detail komisi ----
  R.komisiDetail = async el => {
    const id = new URLSearchParams(location.search).get("id");
    const { data: k } = id ? await sb.from("komisi").select("*").eq("id", id).eq("tampil", true).maybeSingle() : { data: null };
    if (!k) { el.innerHTML = `<div class="kosong">Komisi tidak ditemukan. <a href="program.html">Kembali ke Program Kerja</a></div>`; return; }
    document.title = k.nama + " - MPK SMK WAHIDIN";
    const poin = t => t.split("\n").filter(x => x.trim()).map(x => `<li>${esc(x)}</li>`).join("");
    el.innerHTML = `<article class="card komisi"><p><a href="program.html">${ic("left", 15)} Semua komisi</a></p>
      <div class="meta">KOMISI ${+k.nomor} · <span class="badge ok">${esc(k.status)}</span></div>
      <h1 style="margin:6px 0">${esc(k.nama)}</h1><p>${nl2br(k.deskripsi)}</p>
      ${k.fokus.trim() ? `<h3 style="margin-top:14px">Fokus Program Kerja</h3><ul>${poin(k.fokus)}</ul>` : ""}
      ${k.kegiatan.trim() ? `<h3 style="margin-top:14px">Kegiatan</h3><ul>${poin(k.kegiatan)}</ul>` : ""}</article>`;
  };

  async function init() {
    const warn = $("warn") || document.body;
    if (configWarning(warn)) return;
    try { if (!sessionStorage.getItem("mpk_v")) { sessionStorage.setItem("mpk_v", "1"); await sb.rpc("catat_kunjungan"); } } catch { }
    const { data } = await sb.from("pengaturan").select("*");
    S = Object.fromEntries((data || []).map(r => [r.kunci, r.nilai]));
    await Promise.all(Object.keys(R).map(k => { const el = $("b-" + k); return el ? R[k](el) : null; }));
  }
  return { init };
})();
