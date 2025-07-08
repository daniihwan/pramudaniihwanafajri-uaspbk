// src/stores/menuStore.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    daftarMenu: [],
    loading: false,
    error: null
  }),

  getters: {
    kategoriList: (state) => {
      return [...new Set(state.daftarMenu.map(menu => menu.kategori))]
    },
    menuByKategori: (state) => {
      return (kategori) => state.daftarMenu.filter(menu => menu.kategori === kategori)
    }
  },

  actions: {
    async fetchMenu() {
      this.loading = true
      this.error = null
      try {
        const res = await axios.get('http://localhost:3000/menu')
        this.daftarMenu = res.data
      } catch (err) {
        this.error = 'Gagal memuat menu'
        console.error(err)
      } finally {
        this.loading = false
      }
    }
  }
})
