<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<!-- like Outlet -->
<!-- for more flexibility main tag usually goes in the components themselves (bc of layouts etc) -->
<template>
  <NavBar />
  <main>
    <RouterView />
  </main>
</template>
