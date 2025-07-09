<template>   
  <div class="p-8 min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">     
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-amber-900 mb-4">📊 Laporan Penjualan</h1>
        <p class="text-lg text-amber-700">Ringkasan performa penjualan café</p>
        <div class="w-24 h-1 bg-gradient-to-r from-amber-600 to-orange-600 mx-auto mt-6 rounded-full"></div>
      </div>
      
      <!-- Ringkasan Total -->     
      <div class="bg-gradient-to-r from-emerald-500 to-teal-600 p-8 rounded-2xl shadow-xl mb-12 text-white relative overflow-hidden">
        <div class="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div class="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
        <div class="relative z-10">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-2xl font-semibold mb-3 flex items-center gap-3">
                <span class="text-3xl">💰</span>
                <span>Total Pemasukan</span>
              </h2>       
              <p class="text-5xl font-bold mb-2">         
                Rp {{ laporanTotal.toLocaleString() }}       
              </p>
              <p class="text-emerald-100">Dari {{ riwayatSelesai.length }} transaksi selesai</p>
            </div>
            <div class="text-right">
              <div class="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <p class="text-sm text-emerald-100 mb-1">Rata-rata per transaksi</p>
                <p class="text-2xl font-bold">
                  Rp {{ riwayatSelesai.length > 0 ? Math.round(laporanTotal / riwayatSelesai.length).toLocaleString() : '0' }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>      
      
      <!-- Tabel Riwayat Transaksi -->     
      <div class="bg-white rounded-2xl shadow-xl border border-amber-200 overflow-hidden">       
        <div class="bg-gradient-to-r from-amber-100 to-orange-100 p-6 border-b border-amber-200">
          <h2 class="text-2xl font-semibold text-amber-900 flex items-center gap-3">
            <span class="text-2xl">📋</span>
            <span>Riwayat Transaksi Selesai</span>
          </h2>
          <p class="text-amber-700 mt-2">Daftar semua transaksi yang telah diselesaikan</p>
        </div>
        
        <div class="p-6">
          <div v-if="riwayatSelesai.length === 0" class="text-center py-16">
            <div class="text-6xl mb-6">📝</div>
            <p class="text-xl text-amber-800 font-medium mb-4">Belum ada transaksi yang selesai</p>
            <p class="text-amber-600">Transaksi akan muncul di sini setelah pelanggan melakukan pembelian</p>
          </div>        
          
          <div v-else class="overflow-x-auto">         
            <table class="min-w-full text-left table-auto">           
              <thead class="bg-gradient-to-r from-amber-600 to-orange-600 text-white">             
                <tr>               
                  <th class="py-4 px-6 font-semibold text-sm uppercase tracking-wider rounded-tl-xl">No</th>               
                  <th class="py-4 px-6 font-semibold text-sm uppercase tracking-wider">Tanggal</th>               
                  <th class="py-4 px-6 font-semibold text-sm uppercase tracking-wider">Pelanggan</th>               
                  <th class="py-4 px-6 font-semibold text-sm uppercase tracking-wider">Total</th>               
                  <th class="py-4 px-6 font-semibold text-sm uppercase tracking-wider rounded-tr-xl">Detail Pesanan</th>             
                </tr>           
              </thead>           
              <tbody class="divide-y divide-amber-100">             
                <tr               
                  v-for="(trx, index) in riwayatSelesai"               
                  :key="trx.id"               
                  class="hover:bg-amber-50 transition-colors duration-200"             
                >               
                  <td class="py-4 px-6 font-medium text-amber-900">
                    <span class="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {{ index + 1 }}
                    </span>
                  </td>               
                  <td class="py-4 px-6 text-amber-800">
                    <div class="flex flex-col">
                      <span class="font-medium">{{ formatTanggal(trx.waktu).split(',')[0] }}</span>
                      <span class="text-sm text-amber-600">{{ formatTanggal(trx.waktu).split(',')[1] }}</span>
                    </div>
                  </td>               
                  <td class="py-4 px-6">
                    <div class="flex items-center gap-2">
                      <span class="text-2xl">👤</span>
                      <span class="font-medium text-amber-900">{{ trx.pelanggan }}</span>
                    </div>
                  </td>               
                  <td class="py-4 px-6">
                    <span class="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-4 py-2 rounded-xl font-bold text-lg shadow-md">
                      Rp {{ trx.total.toLocaleString() }}
                    </span>
                  </td>               
                  <td class="py-4 px-6">                 
                    <div class="space-y-2 max-w-sm">
                      <div 
                        v-for="item in trx.items" 
                        :key="item.id_menu"
                        class="bg-amber-50 border border-amber-200 rounded-lg p-3"
                      >
                        <div class="flex justify-between items-start">
                          <div>
                            <p class="font-medium text-amber-900">{{ item.nama }}</p>
                            <p class="text-sm text-amber-600">
                              {{ item.jumlah }} × Rp {{ item.harga.toLocaleString() }}
                            </p>
                          </div>
                          <span class="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-sm font-semibold">
                            Rp {{ (item.harga * item.jumlah).toLocaleString() }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>             
                </tr>           
              </tbody>         
            </table>       
          </div>
        </div>     
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
  transaksiStore.riwayat.filter(trx => trx.status === true).reverse() 
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