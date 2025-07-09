<template>     
  <div class="min-h-screen relative overflow-hidden">
    <!-- Background Image with Blur -->
    <div 
      class="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    >
      <!-- Blur Overlay -->
      <div class="absolute inset-0 backdrop-blur-sm bg-black/30"></div>
    </div>
    
    <!-- Content Overlay -->
    <div class="relative z-10 min-h-screen flex items-center justify-center">
      <div class="text-center px-6 max-w-4xl mx-auto">
        <!-- Main Heading -->
        <h1 class="text-6xl md:text-8xl font-bold text-white mb-6 drop-shadow-2xl">
          <span class="bg-gradient-to-r from-amber-300 to-orange-400 bg-clip-text text-transparent">
            Selamat Datang
          </span>
        </h1>
        
        <!-- Subheading -->
        <h2 class="text-3xl md:text-4xl font-semibold text-amber-100 mb-8 drop-shadow-xl">
          di Café Terbaik Kami
        </h2>
        
        <!-- Description -->
        <p class="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto drop-shadow-lg">
          Nikmati pengalaman kuliner yang tak terlupakan dengan menu pilihan terbaik, 
          suasana yang nyaman, dan pelayanan yang istimewa
        </p>
        
        
        <!-- Decorative Elements -->
        <div class="mt-16 flex justify-center items-center gap-4">
          <div class="w-16 h-0.5 bg-gradient-to-r from-transparent to-amber-400"></div>
          <div class="text-4xl">☕</div>
          <div class="w-16 h-0.5 bg-gradient-to-l from-transparent to-amber-400"></div>
        </div>
      </div>
    </div>
    
    <!-- Floating Decorative Elements -->
    <div class="absolute top-20 left-10 text-6xl text-white/20 animate-float">☕</div>
    <div class="absolute top-40 right-20 text-4xl text-white/20 animate-float-delayed">🥐</div>
    <div class="absolute bottom-40 left-20 text-5xl text-white/20 animate-float">🍰</div>
    <div class="absolute bottom-20 right-10 text-3xl text-white/20 animate-float-delayed">🥛</div>
    
    <!-- Scroll Down Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
      <div class="flex flex-col items-center gap-2">
        <span class="text-sm font-medium">Scroll Down</span>
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import banner from '../assets/banner.jpg'
const backgroundImage = ref(banner)




</script>

<style scoped>
/* Custom animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes float-delayed {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 8s ease-in-out infinite 2s;
}

/* Custom shadow */
.shadow-3xl {
  box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
}

/* Smooth text shadows */
.drop-shadow-2xl {
  filter: drop-shadow(0 25px 25px rgba(0, 0, 0, 0.5));
}

.drop-shadow-xl {
  filter: drop-shadow(0 20px 13px rgba(0, 0, 0, 0.4));
}

.drop-shadow-lg {
  filter: drop-shadow(0 10px 8px rgba(0, 0, 0, 0.3));
}
</style>