import WalletService from "../services/WalletService"

export const wallet = new WalletService("https://wallet.leksster.com/api/v1")

export const gameOrigin = "https://g.autumninteractive.com" // <- this is the origin of the game client we trust
