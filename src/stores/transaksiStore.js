import { defineStore } from 'pinia'
import axios from 'axios'

export const useTransaksiStore = defineStore('transaksi', {
  state: () => ({
    keranjang: [],
    riwayat: [],
    laporanTotal: 0,
    pengerjaan: [] // daftar pesanan yang belum selesai
  }),

  getters: {
    totalItem: (state) =>
      state.keranjang.reduce((sum, item) => sum + item.jumlah, 0),

    totalHarga: (state) =>
      state.keranjang.reduce((sum, item) => sum + item.harga * item.jumlah, 0)
  },

  actions: {
    tambahKeKeranjang(menu) {
      const existing = this.keranjang.find(item => item.id_menu === menu.id)
      if (existing) {
        existing.jumlah++
      } else {
        this.keranjang.push({
          id_menu: menu.id,
          nama_menu: menu.nama,
          harga: menu.harga,
          jumlah: 1
        })
      }
    },

    hapusDariKeranjang(id_menu) {
      this.keranjang = this.keranjang.filter(item => item.id_menu !== id_menu)
    },

    kosongkanKeranjang() {
      this.keranjang = []
    },

    async checkout(pelanggan) {
      const transaksiBaru = {
        id: Date.now().toString(),
        waktu: new Date().toISOString(),
        pelanggan: pelanggan || 'Umum',
        status: false,
        items: this.keranjang.map(item => ({
          id_menu: item.id_menu,
          nama: item.nama_menu,
          harga: item.harga,
          jumlah: item.jumlah
        })),
        total: this.totalHarga
      }

      try {
        await axios.post('http://localhost:3000/transaksi', transaksiBaru)
        this.kosongkanKeranjang()
        this.fetchRiwayat()
        this.fetchPengerjaan()
      } catch (error) {
        console.error('Gagal melakukan checkout:', error)
      }
    },

    async fetchRiwayat() {
      try {
        const res = await axios.get('http://localhost:3000/transaksi')
        this.riwayat = res.data
      } catch (error) {
        console.error('Gagal mengambil riwayat:', error)
      }
    },

    async fetchPengerjaan() {
      try {
        const res = await axios.get('http://localhost:3000/transaksi')
        this.pengerjaan = res.data.filter(t => t.status === false)
      } catch (err) {
        console.error('Gagal memuat pengerjaan:', err)
      }
    },

    async tandaiSelesai(id) {
      try {
        await axios.patch(`http://localhost:3000/transaksi/${id}`, {
          status: true
        })
        this.fetchPengerjaan()
        this.fetchRiwayat()
      } catch (err) {
        console.error('Gagal menandai selesai:', err)
      }
    },

    async fetchLaporanTotal() {
      try {
        const res = await axios.get('http://localhost:3000/transaksi')
        const data = res.data

        const total = data.reduce((sum, trx) => {
          return sum + trx.items.reduce((itemSum, item) => {
            return itemSum + (item.harga * item.jumlah)
          }, 0)
        }, 0)

        this.laporanTotal = total
      } catch (error) {
        console.error('Gagal mengambil laporan total:', error)
      }
    }
  }
})
