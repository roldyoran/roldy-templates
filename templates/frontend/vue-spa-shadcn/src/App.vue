<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { Menu } from 'lucide-vue-next'
</script>

<template>
  <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
    <div class="container flex items-center justify-between py-4 px-6">
      <!-- Brand -->
      <RouterLink to="/" class="flex items-center space-x-2">
        <div class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <span class="font-bold text-lg">V</span>
        </div>
        <span class="font-bold text-lg">Vue SPA</span>
      </RouterLink>

      <!-- Navigation -->
      <nav class="hidden md:flex space-x-8">
        <RouterLink to="/" class="text-sm font-medium hover:underline">Inicio</RouterLink>
        <RouterLink to="/second" class="text-sm font-medium hover:underline">Second</RouterLink>
        <RouterLink to="/contact" class="text-sm font-medium hover:underline">Contacto</RouterLink>
      </nav>

      <!-- Mobile Menu -->
      <button class="md:hidden">
        <Menu class="h-6 w-6" />
      </button>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
