<template>
  <div class="mx-auto py-10 px-6 min-h-screen bg-[#f8f1e4]">
    <h1 class="text-3xl font-bold text-[#6B4226] mb-6">🛒 Keranjang</h1>

    <!-- Keranjang Kosong -->
    <div v-if="keranjang.length === 0" class="text-center text-[#6B4226]">
      Keranjang kamu masih kosong. Ayo pilih menu dulu 🍽️
    </div>

    <!-- Isi Keranjang -->
    <div v-else class="space-y-4">
      <div
        v-for="item in keranjang"
        :key="item.id_menu"
        class="flex justify-between items-center bg-white p-4 rounded-lg shadow"
      >
        <div>
          <h2 class="font-bold text-[#6B4226] text-lg">{{ item.nama_menu }}</h2>
          <p class="text-sm text-gray-600">Rp {{ item.harga.toLocaleString() }} x {{ item.jumlah }}</p>
        </div>
        <div class="flex items-center gap-4">
          <p class="font-semibold text-[#8B5E3C]">
            Rp {{ (item.harga * item.jumlah).toLocaleString() }}
          </p>
          <button
            @click="hapusDariKeranjang(item.id_menu)"
            class="text-red-500 hover:text-red-700 text-sm"
          >
            Hapus
          </button>
        </div>
      </div>

      <!-- Total -->
      <div class="flex justify-between items-center mt-6 border-t pt-4 border-[#d7c7a3]">
        <h2 class="text-xl font-bold text-[#6B4226]">Total</h2>
        <p class="text-xl font-bold text-[#8B5E3C]">Rp {{ totalHarga.toLocaleString() }}</p>
      </div>

      <!-- Aksi -->
      <div class="flex justify-end gap-4 mt-6">
        <button
          @click="kosongkanKeranjang"
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Kosongkan
        </button>
        <button
          @click="checkout"
          class="bg-[#6B4226] text-white px-4 py-2 rounded hover:bg-[#4e2f1f]"
        >
          Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTransaksiStore } from '@/stores/transaksiStore'

const transaksiStore = useTransaksiStore()

const keranjang = computed(() => transaksiStore.keranjang)
const totalHarga = computed(() => transaksiStore.totalHarga)

const hapusDariKeranjang = (id_menu) => {
  transaksiStore.hapusDariKeranjang(id_menu)
}

const kosongkanKeranjang = () => {
  transaksiStore.kosongkanKeranjang()
}

const checkout = async () => {
  if (keranjang.value.length === 0) {
    alert('Keranjang kosong!')
    return
  }

  const pelanggan = prompt('Masukkan nama pelanggan:')
  if (!pelanggan) return

  await transaksiStore.checkout(pelanggan)
  alert('Transaksi berhasil disimpan!')
}
</script>
