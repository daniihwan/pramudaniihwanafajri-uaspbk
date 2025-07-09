<template>   
  <div class="mx-auto py-12 px-6 min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">     
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-5xl font-bold text-amber-900 mb-4">🛒 Keranjang</h1>
        <div class="w-24 h-1 bg-gradient-to-r from-amber-600 to-orange-600 mx-auto rounded-full"></div>
      </div>
      
      <!-- Keranjang Kosong -->     
      <div v-if="keranjang.length === 0" class="text-center py-20">
        <div class="bg-white rounded-2xl shadow-lg p-12 max-w-md mx-auto">
          <div class="text-6xl mb-6">🍽️</div>
          <p class="text-xl text-amber-800 font-medium mb-4">
            Keranjang kamu masih kosong
          </p>
          <p class="text-amber-600 mb-6">
            Ayo pilih menu favorit kamu!
          </p>
          <button 
            @click="$router.push('/')"
            class="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-3 rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 shadow-md font-medium"
          >
            Lihat Menu
          </button>
        </div>
      </div>      
      
      <!-- Isi Keranjang -->     
      <div v-else class="space-y-6">       
        <div         
          v-for="item in keranjang"         
          :key="item.id_menu"         
          class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 transform hover:-translate-y-1"       
        >         
          <div class="flex justify-between items-center">
            <div class="flex-1">           
              <h2 class="font-bold text-amber-900 text-xl mb-2">{{ item.nama_menu }}</h2>           
              <div class="flex items-center gap-4 text-amber-700">
                <span class="bg-amber-100 px-3 py-1 rounded-full text-sm font-medium">
                  Rp {{ item.harga.toLocaleString() }}
                </span>
                <span class="text-amber-600">×</span>
                <span class="bg-orange-100 px-3 py-1 rounded-full text-sm font-medium">
                  {{ item.jumlah }} item
                </span>
              </div>
            </div>         
            <div class="flex items-center gap-6">           
              <div class="text-right">
                <p class="text-sm text-amber-600 mb-1">Subtotal</p>
                <p class="text-2xl font-bold text-orange-600">             
                  Rp {{ (item.harga * item.jumlah).toLocaleString() }}           
                </p>
              </div>
              <button             
                @click="hapusDariKeranjang(item.id_menu)"             
                class="bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 p-3 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-sm"           
              >             
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>         
            </div>
          </div>       
        </div>        
        
        <!-- Total -->       
        <div class="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-8 shadow-lg border border-amber-200">         
          <div class="flex justify-between items-center">
            <div>
              <h2 class="text-2xl font-bold text-amber-900 mb-2">Total Pembayaran</h2>
              <p class="text-amber-700">{{ keranjang.length }} item dalam keranjang</p>
            </div>
            <div class="text-right">
              <p class="text-sm text-amber-600 mb-1">Total</p>
              <p class="text-4xl font-bold text-orange-600">
                Rp {{ totalHarga.toLocaleString() }}
              </p>
            </div>
          </div>
        </div>        
        
        <!-- Aksi -->       
        <div class="flex flex-col sm:flex-row justify-end gap-4 mt-8">         
          <button           
            @click="kosongkanKeranjang"           
            class="bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium flex items-center justify-center gap-2"         
          >           
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            <span>Kosongkan Keranjang</span>
          </button>         
          <button           
            @click="checkout"           
            class="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-12 py-4 rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 shadow-lg font-medium flex items-center justify-center gap-2"         
          >           
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
            </svg>
            <span>Checkout Sekarang</span>
          </button>       
        </div>     
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
  if (confirm('Apakah Anda yakin ingin mengosongkan keranjang?')) {
    transaksiStore.kosongkanKeranjang() 
  }
}  

const checkout = async () => {   
  if (keranjang.value.length === 0) {     
    alert('Keranjang kosong!')     
    return   
  }    
  
  const pelanggan = prompt('Masukkan nama pelanggan:')   
  if (!pelanggan) return    
  
  try {
    await transaksiStore.checkout(pelanggan)   
    alert('Transaksi berhasil disimpan!')
  } catch (error) {
    alert('Terjadi kesalahan saat memproses transaksi')
  }
} 
</script>