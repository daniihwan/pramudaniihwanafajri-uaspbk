<template>   
  <div class="flex min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 font-sans">     
    <!-- Sidebar -->     
    <aside class="w-64 bg-gradient-to-b from-amber-100 to-amber-200 sticky top-13 h-136 border-r border-amber-300 p-6 space-y-6 shadow-xl">       
      <div class="text-center mb-8">
        <h2 class="text-2xl font-bold text-amber-900 mb-2">Kategori</h2>
        <div class="w-16 h-1 bg-amber-600 mx-auto rounded-full"></div>
      </div>
      
      <ul class="space-y-3">         
        <li           
          v-for="kategori in kategoriList"           
          :key="kategori"           
          @click="selectedKategori = kategori"           
          :class="[             
            'cursor-pointer px-4 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105',             
            selectedKategori === kategori               
              ? 'bg-amber-800 text-white shadow-lg ring-2 ring-amber-600'               
              : 'text-amber-800 hover:bg-amber-200 hover:shadow-md bg-white/50 backdrop-blur-sm'           
          ]"         
        >           
          {{ kategori }}         
        </li>          
        
        <!-- Tombol Keranjang -->         
        <li class="pt-4 border-t border-amber-300">           
          <button             
            @click="$router.push('/keranjang')"             
            class="w-full flex justify-between items-center px-4 py-3 bg-gradient-to-r from-amber-700 to-amber-800 hover:from-amber-800 hover:to-amber-900 text-white rounded-lg font-medium transition-all duration-200 transform hover:scale-105 shadow-lg relative group"           
          >             
            <span class="flex items-center gap-2">
              <span class="text-lg">🛒</span>
              <span>Keranjang</span>
            </span>
            <span               
              v-if="totalItem > 0"               
              class="bg-red-500 text-white text-sm w-6 h-6 flex items-center justify-center rounded-full shadow-md animate-pulse"             
            >               
              {{ totalItem }}             
            </span>           
          </button>         
        </li>       
      </ul>     
    </aside>      
    
    <!-- Main Content -->     
    <main class="flex-1 p-8">       
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">         
          <h1 class="text-5xl font-bold text-amber-900 mb-4">Menu Café</h1>
          <p class="text-lg text-amber-700 max-w-2xl mx-auto">
            Nikmati koleksi minuman dan makanan terbaik kami yang dibuat dengan penuh cinta
          </p>
          <div class="w-24 h-1 bg-gradient-to-r from-amber-600 to-orange-600 mx-auto mt-6 rounded-full"></div>
        </div>        
        
        <div v-if="menuStore.loading" class="text-center py-20">         
          <div class="inline-flex items-center gap-3 text-amber-800">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-800"></div>
            <span class="text-xl font-medium">Memuat menu...</span>
          </div>
        </div>        
        
        <div v-else class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">         
          <div           
            v-for="menu in menuByKategori"           
            :key="menu.id"           
            class="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col overflow-hidden group"         
          >           
            <div class="relative overflow-hidden">
              <img             
                :src="menu.image"             
                :alt="menu.nama"             
                class="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"           
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            
            <div class="p-6 flex flex-col flex-1">
              <h3 class="text-xl font-bold text-amber-900 mb-2 group-hover:text-amber-800 transition-colors">
                {{ menu.nama }}
              </h3>           
              <p class="text-sm text-amber-600 italic mb-3 font-medium" v-if="menu.subkategori">             
                {{ menu.subkategori }}           
              </p>           
              <p class="text-2xl font-bold text-orange-600 mb-4 flex items-center gap-1">
                <span class="text-sm font-normal">Rp</span>
                {{ menu.harga.toLocaleString() }}
              </p>           
              <button             
                @click="tambahKeKeranjang(menu)"             
                class="mt-auto bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg font-medium flex items-center justify-center gap-2"           
              >             
                <span>➕</span>
                <span>Tambah ke Keranjang</span>
              </button>         
            </div>
          </div>       
        </div>
      </div>     
    </main>   
  </div> 
</template>   

<script setup> 
import { ref, computed, onMounted, watchEffect } from 'vue' 
import { useMenuStore } from '@/stores/menuStore' 
import { useTransaksiStore } from '@/stores/transaksiStore'  

const menuStore = useMenuStore() 
const transaksiStore = useTransaksiStore()  

onMounted(() => {     
  menuStore.fetchMenu() 
})  

const selectedKategori = ref(null) 
const kategoriList = computed(() => menuStore.kategoriList)  

watchEffect(() => {     
  if (!selectedKategori.value && kategoriList.value.length > 0) {         
    selectedKategori.value = kategoriList.value[0]     
  } 
})  

const menuByKategori = computed(() => {     
  return selectedKategori.value         
    ? menuStore.menuByKategori(selectedKategori.value)         
    : [] 
})  

const tambahKeKeranjang = (menu) => {     
  transaksiStore.tambahKeKeranjang(menu) 
}  

const totalItem = computed(() => transaksiStore.totalItem) 
</script>  

<style scoped> 
aside::-webkit-scrollbar {     
  width: 6px; 
}  

aside::-webkit-scrollbar-thumb {     
  background-color: rgba(217, 119, 6, 0.5);     
  border-radius: 4px; 
}

aside::-webkit-scrollbar-track {
  background-color: rgba(251, 191, 36, 0.1);
}
</style>