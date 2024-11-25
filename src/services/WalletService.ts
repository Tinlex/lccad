/* 
 * Wallet Service API version 1.4.0
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
 *   - 1.4.0
 *     - Updated return types for all methods
 *     - Added dedicated WalletError
 *     - Exported all interfaces
 *     - 4xx error now throw right away instead of retrying
 */

interface Member {
    state: any;
    uri: string;
    username: string;
    purse_proxy_uri: string | null;
  }
  
  interface Wallet {
    state: any;
    uri: string;
    currency: string;
    username: string;
    withheld: string;
    escrow: string;
    deposit: string;
  }
  
  interface PurseProxy {
    state: string;
    uri: string;
    currency: string;
    username: string;
    withheld: string;
    escrow: string;
    deposit: string;
    busy_on: string;
  }
  
  class WalletError extends Error {
    code: number;
  
    constructor(code: number, message: string) {
        super(message);
        this.code = code;
    }
  }
  
  class WalletService {
    readonly baseUrl: string = "";
    private _bearerToken: string = "";
  
    private _maxRetries = 10;
  
    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }
  
    setBearerToken(token: string) {
        this._bearerToken = token;
    }
  
    member = {
        register: (username: string, password: string) => {
            return this._request<{ uri: string, token: string }>('POST', "member/register", {
                username: username,
                password: password
            });
        },
  
        auth: (username: string, password: string) => {
            return this._request<{ uri: string, token: string }>("POST", "member/auth", {
                username: username,
                password: password
            });
        },
  
        me: (check_user_token?: string) => {
            return this._request<Member>('GET', "member/me", undefined, check_user_token || undefined);
        },
  
        getByUri: (uri: string) => {
            return this._request<Member>('GET', `member/${uri}`);
        },
  
        getAll: () => {
            return this._request<Member[]>('GET', "member/list");
        },
  
        updateUsername: (uri: string, email: string) => {
            return this._request<Member>('PATCH', `member/${uri}`, {
                email: email,
                state: ""
            });
        }
    }
  
    wallet = {
        create: (member_uri: string, balance: number, currency: string) => {
            return this._request<Wallet>('POST', "wallet", {
                member_uri: member_uri,
                balance: balance.toString(),
                default_currency: currency
            });
        },
  
        makeTransaction: (wallet_uri: string, type: "credit" | "debit", amount: number, currency: string) => {
            return this._request<Wallet>('PATCH', `wallet`, {
                action: {
                    amount: amount.toString(),
                    currency: currency,
                    transaction: type
                },
                wallet: {
                    uri: wallet_uri
                }
            });
        },
  
        getMemberWallets: (member_uri: string) => {
            return this._request<Wallet[]>('GET', `member/${member_uri}/wallets`);
        }
    }
  
    purseProxy = {
        create: (product: string, wallet_uri: string, start_balance: number) => {
            return this._request<{ state: string, balance: string, currency: string, purse_proxy_uri: string }>('POST', "purse_proxy", {
                product: product,
                start_balance: start_balance.toString(),
                wallet_uri: wallet_uri
            });
        },
  
        update: (proxy_uri: string, action: "round_end" | "process", amount?: number, currency?: string, total_bet?: number) => {
            return this._request<PurseProxy>('PATCH', `purse_proxy/${proxy_uri}/${action}`, {
                amount: amount?.toString() || "0",
                currency: currency || "USD",
                total_bet: total_bet?.toString() || "0"
            });
        },
  
        getByUri: (uri: string) => {
            return this._request<PurseProxy>('GET', `purse_proxy/${uri}`);
        },
  
        getMemberPurseProxies: (member_uri: string) => {
            return this._request<PurseProxy[]>('GET', `member/${member_uri}/purse_proxies`);
        }
    }
  
    private async _request<T>(method: "GET" | "POST" | "PATCH" | "DELETE", path: string, data?: any, auth?: string) {
        const bearerToken = auth ? auth : this._bearerToken;
        const headers: { [key: string]: string } = {};
  
        if(data) {
            headers['Content-Type'] = 'application/json';
        }
  
        if(bearerToken) {
            headers['Authorization'] = `Bearer ${bearerToken}`;
        }
  
        console.log(`Requesting ${method} ${path} with data: ${JSON.stringify(data)}`);
  
        let tries = 0;
        while(true) {
            try {
                const response = await fetch(`${this.baseUrl}/${path}`, {
                    method: method,
                    headers: headers,
                    body: JSON.stringify(data)
                });
        
                if(!response.ok) {
                    throw new WalletError(response.status, response.statusText);
                }
        
                return await response.json() as T;
            } catch(error: any) {
                if(error instanceof WalletError) {
                    throw error;
                }
  
                if(tries++ < this._maxRetries) {
                    console.debug(`Request ${method} ${path} failed, retrying...`);
                    console.error(error);
  
                    await new Promise(resolve => setTimeout(resolve, tries * 2000));
                    continue;
                }
  
                throw new WalletError(520, error?.message || "Unknown error");
            }
        }
    }
  }
  
  export { WalletError };
  export default WalletService;