<script>
  import { slide } from "svelte/transition"

  export let placeholder = ""
  export let value = ""
  export let label = ""
  export let type = ""
  export let variant = ""
  export let inputClassName = ""
  export let inputName = ""
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
  export let readonly = false
  export let errorMsgAbsolute = false

  // Workaround to avoid error when passing type directly as a prop to input
  function typeAction(node) {
    node.type = type
  }

  // When error message is passed set a "error" className to the input
  $: errorClassName = Boolean(errorMsg) ? "error" : ""
</script>

{#if label}
  <p class={`${labelClassName} label`}>{label}</p>
{/if}
<div class={`${containerClassName} inputContainer`}>
  {#if iconSrc}
    <img class="input-icon" src={iconSrc} alt={iconAlt} />
  {/if}
  <input
    use:typeAction
    name={inputName}
    {placeholder}
    autocomplete="off"
    bind:value
    class={`input ${variant} ${inputClassName} ${errorClassName}`}
    class:noIcon={!iconSrc}
    on:change={handleChange}
    on:blur={handleBlur}
    on:focus={handleFocus}
    on:keydown={handleKeyDown}
    on:click={handleClick}
    {readonly}
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
  .inputContainer {
    position: relative;
  }
  .input {
    outline: none;
    border-bottom: 3px solid #ffffff00;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  .input:focus {
  }
  .input.error {
    border-bottom: none;
    box-shadow: 0 0 0 1px #ea2e49 !important;
  }
  .input-icon {
    position: absolute;
    left: 1.25rem;
    top: 50%;
    transform: translateY(-50%);
    width: 1rem;
    height: 1.2rem;
  }

  .primary {
    color: #606266;
    line-height: 40px;
    border: 1px solid #dcdfe6;
    height: 50px;
    padding: 0 40px;
    font-size: 14px;
    min-width: 100%;
  }
  .primary::placeholder {
    color: #606266;
    font-size: 14px;
  }

  /* Chrome, Safari, Edge, Opera */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="date"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    min-width: 95%;
  }

  .noIcon {
    padding-left: 16px;
    padding-right: 16px;
  }
</style>
