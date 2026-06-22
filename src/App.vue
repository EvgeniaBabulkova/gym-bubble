<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloMessage from './components/HelloMessage.vue'
</script>

<template>
  <!-- todo: Extract Navbar into component -->
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="30" height="30" />
    <HelloMessage msg="yoo" />
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header>
  <!-- this is where the rest of the components are rendered, it's like Outlet: -->
  <!-- for more flexibility main tag usually goes in the components themselves (bc of layouts etc) -->
  <main>
    <RouterView />
  </main>
</template>

<!-- i guess i could u se this instead of tailwind for now.. -->
<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
  display: flex;
  background-color: var(--col-surface-secondary);
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--col-text-secondary);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
}
</style>
