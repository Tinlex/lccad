<script lang="ts">
  import "../styles/app.css"
  import Header from "../lib/components/Header/Header.svelte"
  import Footer from "../lib/components/Footer/Footer.svelte"
  import { onDestroy, onMount } from "svelte"
  import { gameOrigin, wallet } from "../utils/global"
  import { setUserState } from "../lib/stores/userStore"
  import { browser } from "$app/environment"

  onMount(() => {
    const token: string | null = localStorage.getItem("token")

    const fetchMyUser = async () => {
      try {
        const userInfo = await wallet.member.me(token!)

        if (userInfo.username) {
          setUserState(userInfo)
        }
      } catch (error) {
        console.log(error)
      }
    }

    if (token) {
      fetchMyUser()
      wallet.setBearerToken(token)
    }
  })

  /*
   * Token transfer implementation
   *
   * To open the game in new tabbed window use window.open(url, '_blank');
   * All game clients have been registered to trust https://ryzer-main.vercel.app origin (and http://site1.local but that's only for
   * local development). After game client window is loaded, it will send a message { type: "request_token" } to it's opener window
   * (this window). In onMessage function, you check the origin of the message to make sure it's from the game client,
   * you can set the trusted game clients origin in a variable somewhere (I used gameOrigin here). If the message is from the game client,
   * then the type of message is checked and if it's "request_token" then this window will send a message back to the game client
   * with the type set to 'token' and token set to the user token. It's very important to specify the "targetOrigin" when sending the message
   * back to the game client to make sure that ONLY game origin can receive the message.
   */

  async function onMessage(event: MessageEvent<any>) {
    const userToken = localStorage.getItem("token")

    if (!userToken) return

    if (event.origin != gameOrigin) {
      // very important! this is to prevent any untrusted source from sending messages to this window
      return
    }

    const fetchMyWallets = async () => {
      try {
        const uri: string | null = localStorage.getItem("uri")
        if (!uri) return
        const userWallets = await wallet.wallet.getMemberWallets(uri!)

        if (userWallets?.length) {
          return userWallets
        }
        return null
      } catch (error) {
        console.log(error)
      }
    }

    const userHasWallets = await fetchMyWallets()

    if (!userHasWallets) return

    if (event.data.type == "request_token") {
      event.source?.postMessage(
        {
          type: "token",
          token: userToken
        },
        { targetOrigin: gameOrigin }
      ) // <- also very important! this is to make sure that only game client window can receive the message
    }
  }

  onMount(() => {
    if (browser) {
      window.addEventListener("message", onMessage)
    }
  })

  onDestroy(() => {
    if (browser) {
      window.removeEventListener("message", onMessage)
    }
  })
</script>

<Header />
<slot />
<Footer />
