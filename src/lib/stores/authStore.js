import { writable } from "svelte/store"

const initialValues = {
  isAuthorizing: false
}

export const authStore = writable(initialValues)

export const updateAuthStoreProperty = (key, value) => {
  authStore.update((state) => {
    return { ...state, [key]: value }
  })
}
