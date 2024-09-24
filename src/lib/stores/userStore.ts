import { writable } from "svelte/store"
import { Member } from "../../services/WalletService"

export const testUsers = [
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

type TUserStoreState = {
  user: Partial<Member> | Member | null
  playerIndex: number
  isTestUser: boolean
}

const initialValues: TUserStoreState = {
  playerIndex: 0,
  user: null,
  isTestUser: false
}

export const userState = writable(initialValues)

export const setUserState = (user: Member | Partial<Member> | null) => {
  userState.update((state) => {
    return { ...state, user }
  })
}

export const setPlayerIndex = (playerIndex: number) => {
  userState.update((state) => {
    return { ...state, playerIndex }
  })
}

export const setIsTestUser = (isTestUser: boolean) => {
  userState.update((state) => {
    return { ...state, isTestUser }
  })
}

export const logoutUser = () => {
  localStorage.removeItem("token")
  userState.update((state) => {
    return { ...state, isTestUser: false, playerIndex: 0, user: null }
  })
}
