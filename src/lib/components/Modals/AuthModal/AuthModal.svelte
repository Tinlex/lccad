<script>
  import Modal from "../../Modal/Modal.svelte"
  import { modalsState, toggleModalState } from "../../../stores/modalsStore"
  import logo from "../../../../assets/images/logo.png"
  import loginText from "../../../../assets/images/login-text.png"
  import registerText from "../../../../assets/images/register-text.png"
  import closeIcon from "../../../../assets/icons/close.svg"
  import PrivacyAgreementModal from "../PrivacyAgreementModal/PrivacyAgreementModal.svelte"
  import RegisterForm from "../../RegisterForm/RegisterForm.svelte"
  import LoginForm from "../../LoginForm/LoginForm.svelte"
  import { onMount } from "svelte"

  let isNotificationShowed = false
  let notificationMessage = ""
  let notificationStatus = ""
  let isRegister = false

  const closeModal = () => {
    toggleModalState("isAuthModalOpen", false)
    hideNotification()
  }

  const hideNotification = () => {
    isNotificationShowed = false
    notificationMessage = ""
    notificationStatus = ""
  }

  const toggleForm = () => {
    isRegister = !isRegister
    console.log("toggle")
    hideNotification()
  }

  const disableScroll = () => {
    document.body.style.overflow = "hidden"
  }

  const enableScroll = () => {
    document.body.style.overflow = ""
  }

  onMount(() => {
    const unsubscribe = modalsState.subscribe((value) => {
      if (value.isAuthModalOpen) {
        disableScroll()
      } else {
        enableScroll()
      }
    })

    return () => {
      unsubscribe()
      enableScroll() // Ensure scroll is enabled if component is unmounted
    }
  })
</script>

<Modal
  on:close={closeModal}
  isCentered={true}
  isModalOpen={$modalsState.isAuthModalOpen}
  className="authModal"
  containerClassName="authModalContainer"
>
  <div class="content">
    <div class="title">
      {#if !isRegister}
        <img src={logo} alt="logo" class="logo-login" />
        <img src={loginText} alt="login" />
      {:else}
        <img src={registerText} alt="register" />
      {/if}
    </div>
    {#if isRegister}
      <RegisterForm {toggleForm} />
    {:else}
      <LoginForm {toggleForm} />
    {/if}

    <img
      on:click={closeModal}
      class="close-button"
      src={closeIcon}
      alt="close modal"
    />
  </div>
</Modal>

<PrivacyAgreementModal />

<style>
  :global(.authModal) {
    background-color: rgba(7, 26, 47, 0.8) !important;
    width: 518px !important;
    border-radius: 10px !important;
    width: 100%;
    min-height: inherit;
    margin-top: auto !important;
    margin-bottom: auto;
  }

  :global(.authModalContainer) {
    overflow-y: auto;
  }

  @media (max-width: 754px) {
    :global(.authModalContainer) {
      width: 100% !important;
    }
    :global(.authModal) {
      width: 100% !important;
      margin: 0 0 auto 0 !important;
      height: 100% !important;
    }
  }

  .checkbox {
    display: inline-block;
    cursor: pointer;
  }
  .content {
    margin: 0 auto;
    padding: 48px 86px;
    height: 100%;
    overflow-y: auto;

    @media (max-width: 754px) {
      padding: 1.5rem 1.5rem 4rem 1.5rem;
    }
  }
  .title {
    display: flex;
    align-items: center;
  }
  .title img {
    height: 100%;
  }
  .title .logo-login {
    width: 85px;
    margin-right: 10px;
  }
  .form {
    display: flex;
    position: relative;
    flex-direction: column;
    margin-top: 64px;
    gap: 25px;
  }
  .buttons {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 45px;
    gap: 30px;
  }
  .buttons.register {
    flex-direction: column-reverse;
  }
  .buttons button {
    width: 100%;
    height: 50px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 14px;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    color: white;
  }
  .buttons .primary {
    background: linear-gradient(to right, #e2035e, #fea302);
    border: none;
  }
  .buttons .secondary {
    background: transparent;
    border: solid 2px #fea501;
  }
  .close-button {
    position: absolute;
    top: 15px;
    width: 25px;
    height: 25px;
    right: 15px;
    cursor: pointer;
  }
</style>
