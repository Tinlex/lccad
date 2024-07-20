// src/stores/languageStore.js
import { writable } from 'svelte/store'

export const languages = [
  { title: 'English', lang: 'En' },
  { title: 'Korean', lang: 'Ko' },
  { title: 'Cambodian', lang: 'Km' },
  { title: 'Thai', lang: 'Th' },
  { title: 'Vietnamese', lang: 'Vi' }
]

export const currentLanguage = writable({ title: 'English', lang: 'En' })

export const dropdownOpen = writable(false)
