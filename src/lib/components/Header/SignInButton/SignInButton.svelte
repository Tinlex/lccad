<script>
  import mobileSigninIcon from "../../../../assets/icons/sign-in.png"
  import { toggleModalState } from "../../../stores/modalsStore"
  import { userState } from "../../../stores/userStore"
</script>

<button
  class="header-button"
  on:click={() => toggleModalState("isAuthModalOpen", true)}
>
  {$userState.user ? $userState.user.username : "Sign in"}
  <img src={mobileSigninIcon} alt="sign-in-button" class="header-button-icon" />
</button>

<style>
</style>
