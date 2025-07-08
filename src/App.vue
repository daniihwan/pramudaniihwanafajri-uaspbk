<script setup>
import Navbar from './components/Navbar.vue';
import Header from './components/Header.vue';
</script>

<template>
  <Header />
  <Navbar />
  <div class="min-h-screen">
    <router-view />
  </div>
</template>

<style scoped></style>
