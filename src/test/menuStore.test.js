import { setActivePinia, createPinia } from 'pinia'
import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useMenuStore } from '../stores/menuStore'
import axios from 'axios'

// Mock axios
vi.mock('axios')

describe('menuStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('fetchMenu berhasil mengisi daftarMenu', async () => {
    const mockData = [
      { id: 1, nama: 'Nasi Goreng', kategori: 'Makanan' },
      { id: 2, nama: 'Es Teh', kategori: 'Minuman' }
    ]
    axios.get.mockResolvedValue({ data: mockData })

    const store = useMenuStore()
    await store.fetchMenu()

    expect(store.daftarMenu).toEqual(mockData)
    expect(store.loading).toBe(false)
    expect(store.error).toBe(null)
  })

  it('fetchMenu gagal dan menyimpan error', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'))

    const store = useMenuStore()
    await store.fetchMenu()

    expect(store.daftarMenu).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.error).toBe('Gagal memuat menu')
  })

  it('kategoriList mengembalikan daftar kategori unik', () => {
    const store = useMenuStore()
    store.daftarMenu = [
      { id: 1, nama: 'Nasi Goreng', kategori: 'Makanan' },
      { id: 2, nama: 'Mie Ayam', kategori: 'Makanan' },
      { id: 3, nama: 'Jus Alpukat', kategori: 'Minuman' }
    ]

    expect(store.kategoriList).toEqual(['Makanan', 'Minuman'])
  })

  it('menuByKategori mengembalikan menu sesuai kategori', () => {
    const store = useMenuStore()
    store.daftarMenu = [
      { id: 1, nama: 'Nasi Goreng', kategori: 'Makanan' },
      { id: 2, nama: 'Es Teh', kategori: 'Minuman' }
    ]

    const makanan = store.menuByKategori('Makanan')
    expect(makanan).toEqual([{ id: 1, nama: 'Nasi Goreng', kategori: 'Makanan' }])
  })
})
