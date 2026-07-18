<script lang="ts" setup></script>

<template>
  <header>
    <RouterLink to="/" class="logoLink">
      <img alt="Bym Bubble logo" class="logo" src="@/assets/logo.svg" width="40" height="40" />
    </RouterLink>
    <nav>
      <RouterLink to="/history">History</RouterLink>
      <RouterLink to="/analytics">Analytics</RouterLink>
    </nav>
  </header>
</template>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  background-color: var(--col-surface-secondary);
  padding: 0 var(--spacing-xxl) 0 var(--spacing-xxl);
  height: 50px;
  align-items: center;
}

nav a.router-link-active {
  color: var(--col-text-secondary);
}

nav {
  display: flex;
  gap: var(--spacing-xl);
}
</style>
