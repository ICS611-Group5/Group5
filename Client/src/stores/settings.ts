import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useSettingsStore = defineStore('settings', () => {
	const darkMode = useLocalStorage('darkMode', false)

	function toggleDarkMode() {
		darkMode.value = !darkMode.value
	}

	return { darkMode, toggleDarkMode }
})