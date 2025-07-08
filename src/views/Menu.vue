<template>
  <div class="flex min-h-screen bg-[#f8f1e4] font-sans">
    <!-- Sidebar -->
    <aside class="w-60 bg-[#e7d9c2] sticky top-13 h-136 border-r border-[#d6c7a1] p-4 space-y-4 shadow-md">
      <h2 class="text-xl font-bold text-[#6B4226] mb-4">Kategori</h2>
      <ul class="space-y-2">
        <li
          v-for="kategori in kategoriList"
          :key="kategori"
          @click="selectedKategori = kategori"
          :class="[
            'cursor-pointer px-3 py-2 rounded font-medium transition',
            selectedKategori === kategori
              ? 'bg-[#6B4226] text-white'
              : 'text-[#6B4226] hover:bg-[#d1bfa5]'
          ]"
        >
          {{ kategori }}
        </li>

        <!-- Tombol Keranjang -->
        <li>
          <button
            @click="$router.push('/keranjang')"
            class="w-full flex justify-between items-center px-3 py-2 bg-[#6B4226] hover:bg-[#4e2f1f] text-white rounded font-medium transition relative"
          >
            🛒 Keranjang
            <span
              v-if="totalItem > 0"
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow"
            >
              {{ totalItem }}
            </span>
          </button>
        </li>
      </ul>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-3xl font-bold text-[#6B4226]">☕ Menu Café</h1>
      </div>

      <div v-if="menuStore.loading" class="text-center py-10 text-[#6B4226]">
        Memuat menu...
      </div>

      <div v-else class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="menu in menuByKategori"
          :key="menu.id"
          class="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition flex flex-col"
        >
          <img
            :src="menu.image"
            :alt="menu.nama"
            class="w-full h-32 object-cover rounded-md mb-3"
          />
          <h3 class="text-lg font-bold text-[#6B4226]">{{ menu.nama }}</h3>
          <p class="text-sm text-gray-600 italic mb-1" v-if="menu.subkategori">
            {{ menu.subkategori }}
          </p>
          <p class="font-semibold text-[#8B5E3C] mb-3">Rp {{ menu.harga.toLocaleString() }}</p>
          <button
            @click="tambahKeKeranjang(menu)"
            class="mt-auto bg-[#6B4226] text-white px-3 py-2 rounded hover:bg-[#4e2f1f] transition"
          >
            Tambah ke Keranjang
          </button>
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
    background-color: rgba(124, 58, 237, 0.3);
    border-radius: 4px;
}
</style>
