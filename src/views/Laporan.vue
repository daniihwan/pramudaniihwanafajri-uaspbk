<template>
  <div class="p-6 min-h-screen bg-gray-50">
    <h1 class="text-2xl font-bold text-purple-700 mb-6">📊 Laporan Penjualan</h1>

    <!-- Ringkasan Total -->
    <div class="bg-white p-6 rounded-xl shadow border border-gray-200 mb-10">
      <h2 class="text-lg font-semibold text-gray-700 mb-2">Total Pemasukan</h2>
      <p class="text-3xl font-bold text-green-600">
        Rp {{ laporanTotal.toLocaleString() }}
      </p>
    </div>

    <!-- Tabel Riwayat Transaksi -->
    <div class="bg-white p-6 rounded-xl shadow border border-gray-200">
      <h2 class="text-lg font-semibold text-gray-700 mb-4">Riwayat Transaksi Selesai</h2>

      <div v-if="riwayatSelesai.length === 0" class="text-gray-500 text-center py-6">
        Belum ada transaksi yang selesai.
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full text-left table-auto border-collapse">
          <thead class="bg-purple-100 text-purple-800 text-sm uppercase">
            <tr>
              <th class="py-3 px-4 border-b">No</th>
              <th class="py-3 px-4 border-b">Tanggal</th>
              <th class="py-3 px-4 border-b">Pelanggan</th>
              <th class="py-3 px-4 border-b">Total</th>
              <th class="py-3 px-4 border-b">Detail Pesanan</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(trx, index) in riwayatSelesai"
              :key="trx.id"
              class="hover:bg-purple-50 transition"
            >
              <td class="py-2 px-4 border-b">{{ index + 1 }}</td>
              <td class="py-2 px-4 border-b">{{ formatTanggal(trx.waktu) }}</td>
              <td class="py-2 px-4 border-b">{{ trx.pelanggan }}</td>
              <td class="py-2 px-4 border-b text-green-600 font-semibold">Rp {{ trx.total.toLocaleString() }}</td>
              <td class="py-2 px-4 border-b">
                <ul class="text-sm text-gray-700 list-disc pl-5 space-y-1">
                  <li v-for="item in trx.items" :key="item.id_menu">
                    {{ item.nama }} x{{ item.jumlah }} - Rp {{ (item.harga * item.jumlah).toLocaleString() }}
                  </li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue'
import { useTransaksiStore } from '@/stores/transaksiStore'

const transaksiStore = useTransaksiStore()

onMounted(() => {
  transaksiStore.fetchLaporanTotal()
  transaksiStore.fetchRiwayat()
})

const laporanTotal = computed(() => transaksiStore.laporanTotal)
const riwayatSelesai = computed(() =>
  transaksiStore.riwayat.filter(trx => trx.status === true)
)

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
