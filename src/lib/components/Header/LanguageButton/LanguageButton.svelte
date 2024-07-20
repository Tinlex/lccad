<script>
  import arrowDownIcon from "../../../../assets/icons/arrow-down-light.svg"
  import {
    currentLanguage,
    languages,
    dropdownOpen
  } from "../../../stores/languageStore"

  function setDropdownOpen(value) {
    dropdownOpen.set(value)
  }

  function selectLanguage(lang) {
    currentLanguage.set(lang)
    dropdownOpen.set(false)
  }
</script>

<div class="relative">
  <button class="header-button" on:click={() => setDropdownOpen(true)}>
    {$currentLanguage.lang}
    <img
      src={arrowDownIcon}
      alt="pick-language-dropdown"
      class="header-button-icon"
    />
  </button>

  {#if $dropdownOpen}
    <div
      class={`flex flex-col items-start w-max absolute top-14 right-0 bg-background-secondary text-white z-20 overflow-hidden transition-transform duration-200 transform 
      ${$dropdownOpen ? "slide-down" : "slide-up"}
       origin-top border border-solid border-white`}
    >
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      {#each languages as lang, i}
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="w-full px-5 py-2.5 hover:bg-background-secondary-light cursor-pointer transition-colors duration-200"
          class:border-b-white={i < languages.length - 1}
          class:bg-background-secondary-light={$currentLanguage.lang ===
            lang.lang}
          on:click={() => selectLanguage(lang)}
        >
          {lang.title}
        </div>
      {/each}
    </div>
  {/if}
</div>

{#if $dropdownOpen}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    on:click={() => setDropdownOpen(false)}
    class="fixed top-0 left-0 w-full h-full z-10"
  ></div>
{/if}
