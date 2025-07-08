# ☕ Aplikasi Kasir Caffe

Aplikasi kasir sederhana berbasis web untuk kebutuhan operasional sebuah caffe. Dibangun menggunakan Vue 3, Pinia, dan JSON Server sebagai REST API.

---

## 📃 Deskripsi

Aplikasi ini memungkinkan pengguna untuk:

* Melihat dan memilih menu berdasarkan kategori (Minuman, Makanan Ringan, Makanan Berat)
* Menambahkan item ke keranjang
* Melakukan checkout transaksi beserta input nama pelanggan
* Melihat daftar transaksi yang sedang dikerjakan (status: false)
* Menyelesaikan transaksi (status: true)
* Melihat laporan transaksi selesai dan total pemasukan

---

## 📒 Fitur Lengkap

### 🍼 Menu

* Menampilkan menu dari berbagai kategori
* Sidebar kategori sticky di sebelah kiri
* Tombol "Tambah ke Keranjang"
* Keranjang dengan indikator jumlah item

### 🛋️ Keranjang

* Menampilkan daftar item yang dipilih
* Menghapus item dari keranjang
* Input nama pelanggan
* Tombol "Checkout" untuk menyimpan transaksi dengan status pengerjaan `false`

### ⚖️ Pengerjaan

* Menampilkan transaksi yang belum selesai
* Tombol untuk mengubah status menjadi selesai (update `status: true` di API)

### 📅 Riwayat / Laporan

* Menampilkan transaksi yang selesai (`status: true`)
* Tabel transaksi selesai
* Menampilkan total pemasukan dari transaksi

---

## 📊 Struktur Routing

| Path          | Komponen       | Deskripsi                               |
| ------------- | -------------- | --------------------------------------- |
| `/`           | Menu.vue       | Halaman daftar menu utama               |
| `/keranjang`  | Keranjang.vue  | Halaman keranjang belanja               |
| `/pengerjaan` | Pengerjaan.vue | Daftar transaksi yang sedang dikerjakan |
| `/laporan`    | Laporan.vue    | Laporan dan riwayat transaksi selesai   |

---

## 📝 Contoh Endpoint (JSON Server)

```json
GET     /menu
GET     /transaksi
POST    /transaksi
PATCH   /transaksi/:id
```

Struktur transaksi:

```json
{
  "id": "123456789",
  "pelanggan": "Budi",
  "waktu": "2025-07-06T08:00:00.000Z",
  "status": false,
  "items": [
    { "id_menu": 1, "nama": "Latte", "harga": 24000, "jumlah": 2 }
  ],
  "total": 48000
}
```

---

## 📆 Masalah yang Diselesaikan

* Mencatat transaksi penjualan harian dengan mudah
* Melacak status pengerjaan pesanan
* Menghitung total pemasukan secara otomatis

---

## 🚀 Cara Menjalankan

1. Clone repository
2. Install dependency `npm install`
3. Jalankan JSON Server

```bash
npx json-server --watch db.json --port 3000
```

4. Jalankan Vue Project

```bash
npm run dev
```

---

## 🌐 Tampilan

* Sidebar kategori
* Komponen sticky

---

## 🙏 Kontribusi & Lisensi

Silakan gunakan, modifikasi, dan kembangkan aplikasi ini sesuai kebutuhan.
Lisensi: MIT
