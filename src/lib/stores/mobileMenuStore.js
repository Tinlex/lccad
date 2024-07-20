import { writable } from 'svelte/store'

export const menuOpen = writable(false)

export const setMobileMenu = (value) => {
  menuOpen.set(value)
}
