(async () => {
  await renderShell("game.html");
  const $ = id => document.getElementById(id), A = $("arena");
  const best = (k, v, kecil) => { try { const o = +localStorage.getItem("mpk_" + k) || 0; if (v !== undefined && (!o || (kecil ? v < o : v > o))) { localStorage.setItem("mpk_" + k, v); return v; } return o; } catch { return 0; } };
  const GAMES = { ox: "Tic-Tac-Toe", tebak: "Tebak Angka", memori: "Memori", reaksi: "Uji Reaksi" };
  $("tabsG").innerHTML = Object.entries(GAMES).map(([k, t]) => `<button class="btn sm gray" data-g="${k}">${t}</button>`).join(" ");
  const buka = k => { document.querySelectorAll("#tabsG button").forEach(b => b.classList.toggle("on", b.dataset.g === k)); G[k](); };
  $("tabsG").onclick = e => { const b = e.target.closest("button"); if (b) buka(b.dataset.g); };

  const G = {
    ox() {
      let b = Array(9).fill(""), selesai = false;
      const L = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
      const menang = (x, p) => L.some(l => l.every(i => x[i] === p));
      const mm = (x, p) => { if (menang(x, "O")) return 1; if (menang(x, "X")) return -1; if (x.every(Boolean)) return 0;
        let r = p === "O" ? -2 : 2; x.forEach((v, i) => { if (v) return; x[i] = p; const s = mm(x, p === "O" ? "X" : "O"); x[i] = ""; r = p === "O" ? Math.max(r, s) : Math.min(r, s); }); return r; };
      const bot = () => { let bi = -1, bs = -2; b.forEach((v, i) => { if (v) return; b[i] = "O"; const s = mm(b, "X"); b[i] = ""; if (s > bs) { bs = s; bi = i; } }); if (bi >= 0) b[bi] = "O"; };
      const gambar = pesan => { A.innerHTML = `<h3>Tic-Tac-Toe</h3><p class="meta">Kamu X, bot O. Bot bermain sempurna, jadi hasil terbaikmu adalah seri.</p>
        <div class="oxg">${b.map((v, i) => `<button data-i="${i}" ${v || selesai ? "disabled" : ""}>${v}</button>`).join("")}</div>
        <p><b>${pesan || "Giliranmu."}</b></p><button class="btn sm" id="ulang">Main lagi</button>`;
        $("ulang").onclick = () => { b = Array(9).fill(""); selesai = false; gambar(); };
        A.querySelectorAll(".oxg button").forEach(t => t.onclick = () => { b[+t.dataset.i] = "X";
          if (menang(b, "X")) { selesai = true; return gambar("Kamu menang!"); }
          if (b.every(Boolean)) { selesai = true; return gambar("Seri."); }
          bot(); if (menang(b, "O")) { selesai = true; return gambar("Bot menang."); }
          if (b.every(Boolean)) { selesai = true; return gambar("Seri."); } gambar(); }); };
      gambar();
    },
    tebak() {
      let t = 1 + Math.floor(Math.random() * 100), n = 0;
      A.innerHTML = `<h3>Tebak Angka</h3><p class="meta">Tebak angka 1 sampai 100. Rekor tercepat: ${best("tebak") || "-"} tebakan.</p>
        <div style="display:flex;gap:8px"><input id="tb" type="number" min="1" max="100" placeholder="Angka"><button class="btn" id="tbk">Tebak</button></div><p id="tbp"><b>Mulai menebak.</b></p>`;
      $("tbk").onclick = () => { const v = +$("tb").value; if (!v) return; n++;
        if (v === t) { const r = best("tebak", n, true); $("tbp").innerHTML = `<b>Benar! ${n} tebakan.</b> Rekor: ${r}. <button class="btn sm" id="tl">Main lagi</button>`; $("tl").onclick = G.tebak; }
        else $("tbp").innerHTML = `<b>${v < t ? "Terlalu kecil" : "Terlalu besar"}.</b> Tebakan ke-${n}.`; $("tb").value = ""; };
    },
    memori() {
      const IK = ["shield", "megaphone", "message", "chart", "news", "users", "image", "sparkles"];
      const k = [...IK, ...IK].sort(() => Math.random() - .5), done = new Set();
      let buka = [], langkah = 0, kunci = false;
      const tampil = () => {
        const selesai = done.size === 16;
        A.innerHTML = `<h3>Memori</h3><p class="meta">Pasangkan semua ikon. Rekor: ${best("memori") || "-"} langkah. Langkah: ${langkah}</p>
          <div class="memg">${k.map((v, i) => { const o = buka.includes(i) || done.has(i); return `<button data-i="${i}" class="${o ? "buka" : ""} ${done.has(i) ? "ok" : ""}">${o ? ic(v, 28) : ""}</button>`; }).join("")}</div>
          ${selesai ? `<p><b>Selesai dalam ${langkah} langkah!</b> <button class="btn sm" id="ml">Main lagi</button></p>` : ""}`;
        if ($("ml")) $("ml").onclick = G.memori;
        A.querySelectorAll(".memg button").forEach(t => t.onclick = () => {
          const i = +t.dataset.i; if (kunci || buka.includes(i) || done.has(i)) return;
          buka.push(i);
          if (buka.length === 2) {
            langkah++;
            if (k[buka[0]] === k[buka[1]]) { done.add(buka[0]); done.add(buka[1]); buka = []; if (done.size === 16) best("memori", langkah, true); }
            else { kunci = true; setTimeout(() => { buka = []; kunci = false; tampil(); }, 700); }
          }
          tampil();
        });
      };
      tampil();
    },
    reaksi() {
      let mulai = 0, tm;
      A.innerHTML = `<h3>Uji Reaksi</h3><p class="meta">Tekan kotak saat berubah hijau. Terbaik: ${best("reaksi") || "-"} ms.</p><button id="rk" class="rkbox">Tekan untuk mulai</button>`;
      const b = $("rk");
      b.onclick = () => {
        if (b.dataset.s === "tunggu") { clearTimeout(tm); b.dataset.s = ""; b.className = "rkbox"; b.textContent = "Terlalu cepat! Tekan untuk ulang"; return; }
        if (b.dataset.s === "go") { const ms = Math.round(performance.now() - mulai); const r = best("reaksi", ms, true); b.dataset.s = ""; b.className = "rkbox"; b.textContent = `${ms} ms (terbaik ${r} ms). Tekan untuk ulang`; return; }
        b.dataset.s = "tunggu"; b.className = "rkbox tunggu"; b.textContent = "Tunggu...";
        tm = setTimeout(() => { b.dataset.s = "go"; b.className = "rkbox go"; b.textContent = "TEKAN!"; mulai = performance.now(); }, 1200 + Math.random() * 2800);
      };
    }
  };
  buka("ox");
})();
