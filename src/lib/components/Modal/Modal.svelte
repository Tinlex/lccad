<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import { fade, scale } from "svelte/transition"
  import { defaultModalOverlayColor } from "../../constants/constants"

  const dispatch = createEventDispatcher()

  export let isModalOpen = false
  export let isCentered = false
  export let className = ""
  export let containerClassName = ""
  export let backgroundOverlay = defaultModalOverlayColor

  const closeModal = (): void => {
    dispatch("close")
  }
</script>

{#if isModalOpen}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="overlayWrapper">
    <div
      class="overlay"
      on:click={closeModal}
      in:fade={{ duration: 300 }}
      out:fade={{ duration: 300 }}
      style={`background-color: ${backgroundOverlay}`}
    >
      <div class={`modalContainer ${containerClassName}`}>
        <div
          class={`modal ${className}`}
          on:click|stopPropagation
          transition:scale={{ duration: 300 }}
          class:centered={isCentered}
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .overlay {
    position: fixed;
    z-index: 2000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modalContainer {
    display: flex;
    position: relative;
    height: 100%;
  }
  .modal {
    position: relative;
    background-color: #fefefe;
    width: auto;
    border-radius: 1rem;
    box-shadow: 0px 30px 60px rgba(0, 0, 0, 0.2);
    margin: 0 1rem;
  }
  .modal.centered {
    margin: auto;
  }
</style>
