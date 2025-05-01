<script setup lang="ts">
import '@/assets/main.css'
import {ref, computed, watch} from 'vue'
import { useRoute } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'
import { useItemStore } from '@/stores/itemStore'
import {QBtn} from "quasar";



// STORES / STATE MANAGEMENT
const route = useRoute()
const settingsStore = useSettingsStore()
const itemStore = useItemStore()

const isDarkMode = computed(() => settingsStore.darkMode)

const toggleDarkMode = () => {
  settingsStore.toggleDarkMode()
}

watch(isDarkMode, (newVal) => {
  if (newVal) {
    document.body.setAttribute('data-dark', 'true')
  } else {
    document.body.removeAttribute('data-dark')
  }
}, { immediate: true })

</script>

<template>
  <nav :class="{'dark-mode-theme': isDarkMode}" class="py-10 px-8 border-b border-gray-200">
    <div class="max-w-7xl mx-auto">
      <div class="flex items-center justify-between">
        <div class="menu-left">
          <router-link to="/about" class="main-text">Group 5</router-link>
        </div>
        <div class="menu-center">
          <RouterLink to="/home" active-class="active-link">
            <q-icon name="mdi-home-outline" size="lg"/>
            <q-tooltip>Home</q-tooltip>
          </RouterLink>
          <RouterLink to="/items" active-class="active-link">
            <q-icon name="mdi-clipboard-outline" size="lg"/>
            <q-tooltip>Items</q-tooltip>
          </RouterLink>
          <q-btn @click="itemStore.toggleSuperUser">
            {{ itemStore.isSuperUser ? 'Switch to User' : 'Switch to SuperUser' }}
          </q-btn>
        </div>

        <div class="menu-right">
          <q-btn @click="toggleDarkMode" icon="mdi-theme-light-dark" class="mr-4"></q-btn>


        </div>
      </div>
    </div>
  </nav>

  <main class="main-content">
    <RouterView />
  </main>

</template>
<style scoped>

.menu-right {
  display: flex;
  flex-direction: row;
  align-items: center;
}


</style>
