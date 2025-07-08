<template>
  <nav class="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-14 items-center">
        <div class="flex space-x-6">
          <RouterLink
            v-for="link in navLinks"
            :key="link.name"
            :to="link.path"
            class="text-gray-600 hover:text-purple-600 font-medium"
            :class="{ 'text-purple-600 font-bold border-b-2 border-purple-600 pb-1': $route.path === link.path }"
          >
            {{ link.name }}
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
const navLinks = [
  { name: 'Menu', path: '/' },
  { name: 'Laporan', path: '/laporan' },
  { name: 'Pesanan', path: '/pesanan' },
  { name: 'Keranjang', path: '/keranjang' }
]
</script>

<style scoped>
/* Pastikan sticky berfungsi dengan z-index */
nav {
  backdrop-filter: blur(10px);
}
</style>
