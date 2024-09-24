/*
 * Wallet Service API version 1.3.0
 *
 * Changelog:
 *   - 1.1.0
 *     - Added bearer token support
 *   - 1.2.0
 *     - Added service token support
 *     - Bearer token can now be set using the setBearerToken method
 *   - 1.2.1
 *     - Removed X-Api-Key as a holder for service token
 *     - Service tokens are now used in Authorization header, the same way as regular user tokens
 *     - Removed obsolete "email" field from wallet update call
 *   - 1.2.2
 *     - Changed "email" back to "username" in Wallet schema
 *   - 1.3.0
 *     - Updated purse proxy create call to include new "product" field
 *     - Updated purse proxy update call to include new "total_bet" field
 *     - Added default values to purse proxy update call (temporarily)
 *     - Improved error handling
 */

export interface Member {
  state: any
  uri: string
  username: string
  purse_proxy_uri: string | null
}

export interface Wallet {
  state: any
  uri: string
  currency: string
  username: string
  withheld: string
  escrow: string
  deposit: string
}

export interface PurseProxy {
  state: string
  uri: string
  currency: string
  username: string
  withheld: string
  escrow: string
  deposit: string
  busy_on: string
}

interface IWalletService {
  member: {
    register: (
      username: string,
      password: string
    ) => Promise<{ uri: string; token: string }>
    auth: (
      username: string,
      password: string
    ) => Promise<{ uri: string; token: string }>
    me: (check_user_token?: string) => Promise<Member>
    getByUri: (uri: string) => Promise<Member>
    getAll: () => Promise<Member[]>
    updateUsername: (uri: string, email: string) => Promise<Member>
  }

  wallet: {
    create: (
      member_uri: string,
      balance: number,
      currency: string
    ) => Promise<Wallet>
    makeTransaction: (
      wallet_uri: string,
      type: "credit" | "debit",
      amount: number,
      currency: string
    ) => Promise<Wallet>
    getMemberWallets: (member_uri: string) => Promise<Wallet[]>
  }

  purseProxy: {
    create: (
      product: string,
      wallet_uri: string,
      start_balance: number
    ) => Promise<{
      state: string
      balance: string
      currency: string
      purse_proxy_uri: string
    }>
    update: (
      proxy_uri: string,
      action: "round_end" | "process",
      amount?: number,
      currency?: string,
      total_bet?: number
    ) => Promise<PurseProxy>
    getByUri: (uri: string) => Promise<PurseProxy>
    getMemberPurseProxies: (member_uri: string) => Promise<PurseProxy[]>
  }
}

class WalletServiceError extends Error {
  status: number
  detail: string

  constructor(status: number, message: string) {
    super(`Error ${status}: ${message}`)

    this.status = status
    this.detail = message
  }
}

class WalletService implements IWalletService {
  readonly baseUrl: string = ""

  private _bearerToken: string = ""

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  setBearerToken(token: string) {
    this._bearerToken = token
  }

  member = {
    register: async (username: string, password: string) => {
      const res = await this._request("POST", "member/register", {
        username: username,
        password: password
      })

      return res.data as { uri: string; token: string }
    },

    auth: async (username: string, password: string) => {
      const res = await this._request("POST", "member/auth", {
        username: username,
        password: password
      })

      return res.data as { uri: string; token: string }
    },

    me: async (check_user_token?: string) => {
      const res = await this._request(
        "GET",
        "member/me",
        undefined,
        check_user_token || undefined
      )

      return res.data as Member
    },

    getByUri: async (uri: string) => {
      const res = await this._request("GET", `member/${uri}`)

      return res.data as Member
    },

    getAll: async () => {
      const res = await this._request("GET", "member/list")

      return res.data as Member[]
    },

    updateUsername: async (uri: string, email: string) => {
      const res = await this._request("PATCH", `member/${uri}`, {
        member: {
          email: email,
          state: ""
        }
      })

      return res.data as Member
    }
  }

  wallet = {
    create: async (member_uri: string, balance: number, currency: string) => {
      const res = await this._request("POST", "wallet", {
        wallet: {
          member_uri: member_uri,
          balance: balance.toString(),
          default_currency: currency
        }
      })

      return res.data as Wallet
    },

    makeTransaction: async (
      wallet_uri: string,
      type: "credit" | "debit",
      amount: number,
      currency: string
    ) => {
      const res = await this._request("PATCH", `wallet`, {
        action: {
          amount: amount.toString(),
          currency: currency,
          transaction: type
        },
        wallet: {
          uri: wallet_uri
        }
      })

      return res.data.wallet as Wallet
    },

    getMemberWallets: async (member_uri: string) => {
      const res = await this._request("GET", `member/${member_uri}/wallet`)

      return res.wallets as Wallet[]
    }
  }

  purseProxy = {
    create: async (
      product: string,
      wallet_uri: string,
      start_balance: number
    ) => {
      const res = await this._request("POST", "purse_proxy", {
        purse_proxy: {
          product: product,
          start_balance: start_balance.toString(),
          wallet_uri: wallet_uri
        }
      })

      return res.data.purse_proxy as {
        state: string
        balance: string
        currency: string
        purse_proxy_uri: string
      }
    },

    update: async (
      proxy_uri: string,
      action: "round_end" | "process",
      amount?: number,
      currency?: string,
      total_bet?: number
    ) => {
      const res = await this._request(
        "PATCH",
        `purse_proxy/${proxy_uri}/${action}`,
        {
          amount: amount?.toString() || "0",
          currency: currency || "USD",
          total_bet: total_bet?.toString() || "0"
        }
      )

      return res.data.purse_proxy as PurseProxy
    },

    getByUri: async (uri: string) => {
      const res = await this._request("GET", `purse_proxy/${uri}`)

      return res.data as PurseProxy
    },

    getMemberPurseProxies: async (member_uri: string) => {
      const res = await this._request(
        "GET",
        `member/${member_uri}/purse_proxies`
      )

      return res.purse_proxies as PurseProxy[]
    }
  }

  private async _request(
    method: "GET" | "POST" | "PATCH" | "DELETE",
    path: string,
    data?: any,
    auth?: string
  ) {
    const bearerToken = auth ? auth : this._bearerToken
    const headers: any = {}

    if (data) {
      headers["Content-Type"] = "application/json"
    }

    if (bearerToken) {
      headers["Authorization"] = `Bearer ${bearerToken}`
    }

    const res = await fetch(`${this.baseUrl}/${path}`, {
      method: method,
      headers: headers,
      body: JSON.stringify(data)
    })

    if (res.ok) {
      return await res.json()
    }

    let error: any

    try {
      error = await res.json()
    } catch (error) {
      throw new WalletServiceError(res.status, res.statusText)
    }

    throw new WalletServiceError(
      res.status,
      error.feedback?.[0].message || res.statusText || "Unknown error"
    )
  }
}

export { WalletServiceError }
export default WalletService
