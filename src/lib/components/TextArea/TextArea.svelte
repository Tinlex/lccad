<script>
  import { slide } from "svelte/transition"

  export let placeholder = ""
  export let value = ""
  export let label = ""
  export let variant = ""
  export let textareaClassName = ""
  export let textareaName = ""
  export let labelClassName = ""
  export let containerClassName = ""
  export let handleChange = () => {}
  export let handleBlur = () => {}
  export let handleFocus = () => {}
  export let handleClick = () => {}
  export let handleKeyDown = () => {}
  export let iconSrc = ""
  export let iconAlt = ""
  export let errorMsg = ""
  export let errorMsgAbsolute = false

  // When error message is passed set a "error" className to the textarea
  $: errorClassName = Boolean(errorMsg) ? "error" : ""
</script>

{#if label}
  <p class={`${labelClassName} label`}>{label}</p>
{/if}
<div class={`${containerClassName} textareaContainer`}>
  {#if iconSrc}
    <img class="textarea-icon" src={iconSrc} alt={iconAlt} />
  {/if}
  <textarea
    name={textareaName}
    {placeholder}
    autocomplete="off"
    bind:value
    class={`textarea ${variant} ${textareaClassName} ${errorClassName}`}
    on:change={handleChange}
    on:blur={handleBlur}
    on:focus={handleFocus}
    on:keydown={handleKeyDown}
    on:click={handleClick}
  />
</div>
{#if errorMsg}
  <p
    class={`errorMsg ${errorMsgAbsolute ? "absoluteError" : ""}`}
    transition:slide={{ y: -10, duration: 200 }}
  >
    {errorMsg}
  </p>
{/if}

<style>
  .label {
    margin-bottom: 4px;
    font-size: 16px;
    color: dark;
  }
  .errorMsg {
    color: #ea2e49;
    font-size: 14px;
    margin-top: 4px;
  }
  .absoluteError {
    margin-top: 0px !important;
    position: absolute;
  }
  .textareaContainer {
    position: relative;
  }
  .textarea {
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    outline: none;
    border-bottom: 3px solid #ffffff00;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  .textarea:focus {
  }
  .textarea.error {
    border-bottom: none;
    box-shadow: 0 0 0 1px #ea2e49 !important;
  }
  .textarea-icon {
    position: absolute;
    left: 1.25rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1rem;
    height: 1.2rem;
  }

  .primary {
    color: #606266;
    border: 1px solid #dcdfe6;
    min-height: 50px;
    padding: 10px 16px;
    font-size: 14px;
    width: 100%;
  }
  .primary::placeholder {
    color: #606266;
    font-size: 14px;
  }

  /* Chrome, Safari, Edge, Opera */
  textarea::-webkit-outer-spin-button,
  textarea::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  textarea[type="number"] {
    -moz-appearance: textfield;
  }
</style>
