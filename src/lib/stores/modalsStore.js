import { writable } from "svelte/store"

export const modalsState = writable({
  isAuthModalOpen: false,
  privacyAgreementModalOpen: false
})

export const toggleModalState = (key, value) => {
  modalsState.update((state) => {
    return { ...state, [key]: value }
  })
}
