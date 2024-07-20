<script>
  import { registerSchema } from "../../validation-schemas/registerSchema"
  import Input from "../Input/Input.svelte"
  import TextArea from "../TextArea/TextArea.svelte"
  import { setUserState } from "../../stores/userStore"
  import { toggleModalState } from "../../stores/modalsStore"
  import closeIcon from "../../../assets/icons/close.svg"
  import userIcon from "../../../assets/icons/user-icon.png"
  import passIcon from "../../../assets/icons/pass-icon.png"
  import PrivacyAgreementModal from "../Modals/PrivacyAgreementModal/PrivacyAgreementModal.svelte"
  import { DatePicker as DatePickerLibrary } from "@svelte-plugins/datepicker"

  import { format } from "date-fns"
  import DatePicker from "../DatePicker/DatePicker.svelte"

  export let toggleForm

  let isNotificationShowed = false
  let notificationMessage = ""
  let notificationStatus = ""
  let formData = {
    username: "",
    password: "",
    confirmPassword: "",
    policyAgreement: false,
    dateOfBirth: "",
    pcn: "",
    phoneNumber: "",
    address: ""
  }

  let errors = {}

  const handleDateChange = ({ startDate }) => {
    const date = new Date(startDate)
    formData.dateOfBirth = format(date, "yyyy-MM-dd")
  }

  const validate = () => {
    const result = registerSchema.safeParse(formData)
    if (!result.success) {
      errors = result.error.format()
      return false
    }
    errors = {}
    return true
  }

  const handleRegister = () => {
    if (!formData.policyAgreement) {
      toggleModalState("privacyAgreementModalOpen", true)
      return
    }
    notificationMessage = `User, ${formData.username} registered.`
    notificationStatus = "successStatus"
    isNotificationShowed = true
    setUserState({
      username: formData.username,
      password: formData.password
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validate()) return
    handleRegister()
  }

  const closeModal = () => {
    toggleModalState("isAuthModalOpen", false)
    clearFormFieldsAndErrors()
    hideNotification()
  }

  const clearFormFieldsAndErrors = () => {
    errors = {}
    formData.username = ""
    formData.password = ""
    formData.confirmPassword = ""
    formData.policyAgreement = false
    formData.dateOfBirth = ""
    formData.pcn = ""
    formData.phoneNumber = ""
    formData.address = ""
  }

  const hideNotification = () => {
    isNotificationShowed = false
    notificationMessage = ""
    notificationStatus = ""
  }
</script>

<form class="form" on:submit|preventDefault={handleSubmit}>
  <div class="notification {notificationStatus}">{notificationMessage}</div>
  <div class="field">
    <Input
      variant="primary"
      placeholder="Username"
      iconSrc={userIcon}
      errorMsg={errors?.username?._errors[0]}
      bind:value={formData.username}
      errorMsgAbsolute={true}
    />
  </div>
  <div class="field">
    <Input
      variant="primary"
      placeholder="Password"
      iconSrc={passIcon}
      type="password"
      errorMsg={errors?.password?._errors[0]}
      bind:value={formData.password}
      errorMsgAbsolute={true}
    />
  </div>
  <div class="field">
    <Input
      variant="primary"
      placeholder="Confirm Password"
      iconSrc={passIcon}
      type="password"
      errorMsg={errors?.confirmPassword?._errors[0]}
      bind:value={formData.confirmPassword}
      errorMsgAbsolute={true}
    />
  </div>
  <div class="field">
    <DatePicker
      {handleDateChange}
      value={formData.dateOfBirth}
      errorMessage={errors?.dateOfBirth?._errors[0]}
    />
  </div>
  <div class="field">
    <Input
      variant="primary"
      placeholder="Philsys Card No. (PCN)"
      type="text"
      errorMsg={errors?.pcn?._errors[0]}
      bind:value={formData.pcn}
      errorMsgAbsolute={true}
    />
  </div>
  <div class="field">
    <Input
      variant="primary"
      placeholder="Phone Number"
      type="number"
      errorMsg={errors?.phoneNumber?._errors[0]}
      bind:value={formData.phoneNumber}
      errorMsgAbsolute={true}
    />
  </div>
  <div class="field">
    <TextArea
      variant="primary"
      placeholder="Address"
      errorMsg={errors?.address?._errors[0]}
      bind:value={formData.address}
      errorMsgAbsolute={true}
    />
  </div>
  <div class="privacy-agreement">
    <label class="el-checkbox">
      <span
        class="el-checkbox__input"
        class:is-checked={formData.policyAgreement}
        on:click|preventDefault={() => {
          formData.policyAgreement = !formData.policyAgreement
        }}
      >
        <span class="el-checkbox__inner"></span>
        <input
          type="checkbox"
          aria-hidden="false"
          class="el-checkbox__original"
          bind:checked={formData.policyAgreement}
        />
      </span>
    </label>
    <span class="agreement-text">
      I acknowledge and agree to the Privacy Policy & Terms
    </span>
  </div>
  <div class="buttons">
    <button type="submit" class="primary">REGISTER</button>
    <button type="button" on:click={toggleForm} class="secondary">
      LOGIN
    </button>
  </div>
</form>

<img
  on:click={closeModal}
  class="close-button"
  src={closeIcon}
  alt="close modal"
/>

<PrivacyAgreementModal />

<style>
  :global(.authModal) {
    background-color: rgba(7, 26, 47, 0.8) !important;
    width: 518px !important;
    border-radius: 10px !important;
    overflow: auto !important;
  }

  @media (max-width: 754px) {
    :global(.authModal) {
      margin: 0 0 auto 0 !important;
      width: 100% !important;
    }
  }

  .checkbox {
    display: inline-block;
    cursor: pointer;
  }
  .content {
    margin: 0 auto;
    padding: 48px 86px;
    @media (max-width: 754px) {
      padding: 1.5rem 1.5rem;
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
  .field {
    width: 100%;
  }
  .field input {
    width: 100% !important;
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
  .error {
    color: red;
    font-size: 12px;
    margin-top: -20px;
    margin-bottom: 20px;
  }

  .privacy-agreement {
    display: flex;
    align-items: center;
  }

  .agreement-text {
    font-size: 14px;
    color: white;
    margin-left: 10px;
  }

  .el-checkbox {
    color: #606266;
    font-weight: 500;
    font-size: 14px;
    cursor: pointer;
    user-select: none;
  }
  .el-checkbox__input {
    cursor: pointer;
    outline: 0;
    line-height: 1;
    vertical-align: middle;
    display: inline-block;
    position: relative;
    white-space: nowrap;
  }
  .el-checkbox__inner {
    display: inline-block;
    position: relative;
    border: 1px solid #dcdfe6;
    border-radius: 2px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    background-color: #fff;
    z-index: 1;
    -webkit-transition:
      border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
      background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
    transition:
      border-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46),
      background-color 0.25s cubic-bezier(0.71, -0.46, 0.29, 1.46);
  }
  .el-checkbox__original {
    opacity: 0;
    outline: 0;
    position: absolute;
    margin: 0;
    width: 0;
    height: 0;
    z-index: -1;
  }

  .el-checkbox__input.is-checked .el-checkbox__inner::after {
    -webkit-transform: rotate(45deg) scaleY(1);
    transform: rotate(45deg) scaleY(1);
  }
  .el-checkbox__inner::after {
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    content: "";
    border: 1px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 7px;
    left: 4px;
    position: absolute;
    top: 1px;
    -webkit-transform: rotate(45deg) scaleY(0);
    transform: rotate(45deg) scaleY(0);
    width: 3px;
    -webkit-transition: -webkit-transform 0.15s ease-in 0.05s;
    transition: -webkit-transform 0.15s ease-in 0.05s;
    transition: transform 0.15s ease-in 0.05s;
    transition:
      transform 0.15s ease-in 0.05s,
      -webkit-transform 0.15s ease-in 0.05s;
    -webkit-transform-origin: center;
    transform-origin: center;
  }
  .el-checkbox__input.is-checked .el-checkbox__inner,
  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #409eff;
    border-color: #409eff;
  }

  .notification {
    width: 100%;
    height: 30px;
    position: absolute;
    background-color: white;
    top: -50px;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0;
    font-size: 16px;
    opacity: 0;
    transition: 0.2s ease-out all;
  }

  .notification.successStatus {
    background-color: green;
    color: white;
    opacity: 1;
  }
  .notification.errorStatus {
    color: white;
    background-color: rgb(225, 85, 85);
    opacity: 1;
  }
</style>
