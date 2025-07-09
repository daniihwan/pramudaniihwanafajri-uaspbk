<template>   
  <nav class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-amber-200 shadow-lg">     
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">       
      <div class="flex justify-between h-16 items-center">         
        <!-- Logo/Brand -->
        <div class="flex items-center">
          <h1 class="text-2xl font-bold text-amber-900 flex items-center gap-2">
            <span class="bg-gradient-to-r from-amber-700 to-orange-600 bg-clip-text text-transparent">
              Selow Café
            </span>
          </h1>
        </div>
        
        <!-- Navigation Links -->
        <div class="flex space-x-1">           
          <RouterLink             
            v-for="link in navLinks"             
            :key="link.name"             
            :to="link.path"             
            class="relative px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center gap-2"             
            :class="getNavLinkClass(link.path)"           
          >             
            <span class="text-xl">{{ link.icon }}</span>
            <span>{{ link.name }}</span>
            
            <!-- Active indicator -->
            <div 
              v-if="$route.path === link.path"
              class="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-600 rounded-lg -z-10"
            ></div>
          </RouterLink>         
        </div>
        
        <!-- Mobile menu button (for future mobile implementation) -->
        <div class="md:hidden">
          <button class="text-amber-700 hover:text-amber-900 p-2">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>     
    </div>   
  </nav> 
</template>  

<script setup> 
import { useRoute } from 'vue-router'

const route = useRoute()

const navLinks = [   
  { name: 'Menu', path: '/', icon: '🍽️' },   
  { name: 'Keranjang', path: '/keranjang', icon: '🛒' },   
  { name: 'Pesanan', path: '/pesanan', icon: '📋' },   
  { name: 'Laporan', path: '/laporan', icon: '📊' } 
]

const getNavLinkClass = (path) => {
  const isActive = route.path === path
  
  if (isActive) {
    return 'text-white font-bold shadow-lg relative z-10'
  }
  
  return 'text-amber-700 hover:text-white hover:bg-amber-600/20 hover:shadow-md'
}
</script>  

<style scoped> 
/* Enhanced backdrop blur effect */ 
nav {   
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Smooth transition for active states */
.router-link-active {
  transition: all 0.3s ease;
}

/* Subtle gradient overlay for depth */
nav::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(251, 191, 36, 0.05) 0%, rgba(249, 115, 22, 0.05) 100%);
  pointer-events: none;
}
</style>