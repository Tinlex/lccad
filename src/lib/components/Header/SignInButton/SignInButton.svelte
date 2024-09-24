<script>
  import mobileSigninIcon from "../../../../assets/icons/sign-in.png"
  import { toggleModalState } from "../../../stores/modalsStore"
  import {
    logoutUser,
    setUserState,
    userState
  } from "../../../stores/userStore"

  $: label = $userState.user ? $userState.user.username : "Sign in"


  const onButtonClick = () => {
    if ($userState.user) {
      logoutUser()
    } else {
      toggleModalState("isAuthModalOpen", true)
    }
  }
</script>

<button class="header-button" on:click={onButtonClick}>
  {label}
  <img src={mobileSigninIcon} alt="sign-in-button" class="header-button-icon" />
</button>

<style>
</style>
