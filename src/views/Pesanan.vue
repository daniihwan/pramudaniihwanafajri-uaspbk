<template>
  <div class="p-6 min-h-screen bg-yellow-50">
    <h1 class="text-2xl font-bold text-yellow-800 mb-6">🛠️ Pengerjaan Pesanan</h1>

    <div v-if="loading" class="text-yellow-600 text-center py-10">
      Memuat data pesanan...
    </div>

    <div v-else-if="pengerjaan.length === 0" class="text-gray-500 text-center mt-10">
      Tidak ada pesanan yang sedang dikerjakan.
    </div>

    <div v-else class="space-y-6">
      <div
        v-for="trx in pengerjaan"
        :key="trx.id"
        class="bg-white rounded-xl shadow border border-yellow-300 p-4"
      >
        <div class="flex justify-between items-center mb-2">
          <div>
            <p class="text-sm text-gray-500">
              Tanggal: {{ formatTanggal(trx.waktu) }}
            </p>
            <p class="font-bold">ID: {{ trx.id }}</p>
            <p class="text-sm text-gray-700">Pelanggan: {{ trx.pelanggan || '-' }}</p>
          </div>
          <button
            @click="tandaiSelesai(trx.id)"
            class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Tandai Selesai
          </button>
        </div>

        <ul class="mt-2 space-y-1 text-sm text-gray-700">
          <li
            v-for="item in trx.items"
            :key="item.id_menu"
            class="flex justify-between"
          >
            <span>{{ item.nama }} x{{ item.jumlah }}</span>
            <span>Rp {{ (item.harga * item.jumlah).toLocaleString() }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useTransaksiStore } from '@/stores/transaksiStore'

const transaksiStore = useTransaksiStore()
const loading = ref(true)

onMounted(async () => {
  loading.value = true
  await transaksiStore.fetchPengerjaan()
  loading.value = false
})

const pengerjaan = computed(() => transaksiStore.pengerjaan)

const tandaiSelesai = async (id) => {
  await transaksiStore.tandaiSelesai(id)
}
  
const formatTanggal = (isoString) => {
  const date = new Date(isoString)
  return date.toLocaleString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
