import { writable } from "svelte/store"

export const validUsers = [
  {
    username: "test_user1",
    password: "password1"
  },
  {
    username: "player2",
    password: "password2"
  },
  {
    username: "player3",
    password: "password3"
  },
  {
    username: "player4",
    password: "password4"
  },
  {
    username: "player5",
    password: "password5"
  },
  {
    username: "player6",
    password: "password6"
  }
]

export const userState = writable({
  user: null,
  playerIndex: 0
})

export const setUserState = (user) => {
  userState.update((state) => {
    return { ...state, user }
  })
}

export const setPlayerIndex = (playerIndex) => {
  userState.update((state) => {
    return { ...state, playerIndex }
  })
}
