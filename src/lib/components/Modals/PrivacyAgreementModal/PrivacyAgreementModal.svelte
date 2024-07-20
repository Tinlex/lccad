<script>
  import Modal from "../../Modal/Modal.svelte"
  import closeIcon from "../../../../assets/icons/close.svg"
  import { modalsState, toggleModalState } from "../../../stores/modalsStore"

  const closeModal = () => {
    toggleModalState("privacyAgreementModalOpen", false)
  }
</script>

<Modal
  className="privacyAgreementModal"
  isCentered={true}
  on:close={closeModal}
  isModalOpen={$modalsState.privacyAgreementModalOpen}
>
  <div class="header">
    <h1 class="header-title">Hint</h1>
  </div>
  <div class="content">
    <p>Please agree to Privacy &amp; Terms</p>
  </div>
  <div class="footer">
    <button type={"Close"} on:click={closeModal} class="primary-button">
      Close
    </button>
  </div>
  <img
    on:click={closeModal}
    class="close-button"
    src={closeIcon}
    alt="close modal"
  />
</Modal>

<style>
  :global(.privacyAgreementModal) {
    border: none !important;
    border-radius: 10px !important;
    width: 518px !important;
    padding-bottom: 40px;
    background-color: rgb(7, 26, 47, 0.8) !important;
  }
  .header {
    padding: 21px 25px 21px !important;
    text-align: left;
    background: transparent !important;
    box-shadow: inset 0 -1px #fff;
  }
  .header-title {
    color: white;
    padding-left: 0;
    margin-bottom: 0;
    font-size: 18px;
    line-height: 1;
  }

  .content {
    padding: 36px 36px !important;
    font-size: 16px !important;
  }
  .content p {
    color: white;
  }

  .footer {
    padding: 0px 36px 0;
    text-align: right;
  }

  .close-button {
    position: absolute;
    top: 15px;
    width: 25px;
    height: 25px;
    right: 15px;
    cursor: pointer;
  }

  .footer button {
    height: 50px;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.1s;
    font-weight: 500;
    padding: 12px 20px;
    font-size: 18px;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    color: white;
    background: linear-gradient(to right, #e2035e, #fea302);
    border: none;
    width: 45%;
    margin-left: auto;
  }
</style>
