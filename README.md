# MPK SMK WAHIDIN (Cirebon) - Panduan Pasang v4

## Isi paket
- Halaman publik: `index`, `tentang`, `aspirasi`, `program`, `publikasi`, `berita` (detail), `struktur`, `galeri`
- `login.html`, `dashboard.html`: login dan dashboard
- `config.js`: isi koneksi Supabase
- `app.js`, `blok.js`, `style.css`: fungsi bersama dan tema crimson
- `supabase-schema.sql`, lalu `supabase-v3.sql`, lalu `supabase-v4.sql`: database + keamanan

## Langkah 1 - Supabase
1. Project baru di supabase.com (akun yang sama, project terpisah).
2. **SQL Editor > New query**: Run `supabase-schema.sql`, lalu New query lagi dan Run `supabase-v3.sql`, lalu `supabase-v4.sql` (urutan harus begitu).
3. **Authentication > Users > Add user** (email + sandi, Auto Confirm).
4. **Authentication > Providers > Email**: matikan "Allow new users to sign up".
5. Jadikan akun itu developer:
   `update public.profiles set jabatan='developer', nama='Nama Kamu' where id=(select id from auth.users where email='emailkamu@contoh.com');`
6. **Project Settings > API**: salin Project URL dan anon public key ke `config.js`.

## Langkah 2 - Online-kan
Upload semua file ke hosting statis (Cloudflare).

## Langkah 3 - Isi data resmi (login developer)
Dashboard > **Info Organisasi** (tentang, visi, misi, kontak, alamat, link peta, sosial media), **Struktur Pengurus**, **Komisi & Program Kerja**, **Tahapan Penanganan**, **FAQ**, **Foto Beranda**. Semua yang kosong tampil sebagai "belum diisi", tidak ada data karangan.

## Fitur v4
- **Polling**: dashboard > Polling. Buat pertanyaan + 2-8 pilihan, tutup/buka kapan saja. Pengunjung memilih tanpa login, satu suara per perangkat dan boleh mengubah pilihan. Tampil di beranda dan halaman Layanan.
- **Halaman per komisi**: isi dari dashboard > Komisi & Program Kerja (nama, deskripsi, fokus, kegiatan). Tiap komisi otomatis punya halaman sendiri. Nama komisi lo yang tentukan.
- Slogan beranda: "Mewakili Suara, Mengawal Perubahan." (ubah di index.html bila perlu)
- Halaman **Layanan Siswa** (aspirasi + polling)

## Alur aspirasi
1. Siswa mengirim di halaman Aspirasi (nama opsional, foto opsional maks 2 MB, EXIF/GPS foto dihapus otomatis).
2. Aspirasi masuk antrean **Menunggu**. Pengurus (Admin ke atas) membukanya di dashboard > Aspirasi Masuk, lalu Setujui atau Tolak.
3. Yang disetujui tampil di forum publik; status (Diterima/Diproses/Selesai) dan tanggapan resmi diatur di tab Disetujui.
4. Pengunjung bisa "Dukung" (like) tanpa login, satu per perangkat.

## Kasta dan hak akses
| Kasta | Aspirasi, Berita, Aktivitas, Galeri | Struktur, Komisi, Tahapan, FAQ, Info org. | Foto beranda, peta, alamat | Kelola kasta |
|---|---|---|---|---|
| Developer | ya | ya | ya | ya |
| Owner, Co-owner | ya | ya | tidak | tidak |
| Admin | ya | tidak | tidak | tidak |
| Anggota | tidak | tidak | tidak | tidak |
| Pengunjung | lihat halaman publik, kirim aspirasi, dukung | | | |

## Batasan yang perlu diketahui
- Anti-spam aspirasi hanya honeypot + jeda 60 detik di browser. Tanpa server sendiri tidak ada pembatasan sungguhan, jadi antrean moderasi adalah pengaman utamanya.
- "Anonim" berarti web tidak meminta nama. Sistem ini tidak menyimpan IP, tapi layanan hosting/Supabase punya log infrastruktur sendiri, jadi jangan menjanjikan anonim absolut ke siswa.
- Jumlah pengunjung dihitung sekali per sesi browser (perkiraan kasar, bukan orang unik).

## Belum dibangun
E-MPK, Evaluasi Gerbang, E-Monitoring OSIS (menunggu spesifikasi). Tempatnya ada di dashboard.
