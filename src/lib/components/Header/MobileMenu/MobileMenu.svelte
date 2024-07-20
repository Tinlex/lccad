<script>
  import { currentLanguage } from "../../../stores/languageStore"
  import { menuOpen, setMobileMenu } from "../../../stores/mobileMenuStore"
  import { toggleModalState } from "../../../stores/modalsStore"

  $: menuOptions = [
    { title: "Home" },
    { title: "COCK BOXING" },
    { title: "Horse Augmented Racing" },
    { title: "2 COLOR GAME" },
    { title: "Bingo Bingo" },
    { title: "Marble Race" },
    { title: "Derby Races" },
    { title: "Classic Horse Races" },
    { title: "Cash In" },
    { title: "Cash Out" },
    { title: `Language: ${$currentLanguage.lang}` },
    {
      title: "Sign up",
      onClick: () => toggleModalState("isAuthModalOpen", true)
    },
    {
      title: "Sign In",
      onClick: () => toggleModalState("isAuthModalOpen", true)
    }
  ]
</script>

{#if $menuOpen}
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    class="fixed top-0 left-0 w-screen h-full z-20"
    on:click={(e) => {
      e.stopPropagation()
      setMobileMenu(false)
    }}
  ></div>
{/if}

{#if $menuOpen}
  <div
    class={`menu flex flex-col items-start w-max absolute right-[0px] top-[100px] bg-[#1c1f26] text-white z-[25] overflow-hidden 
    ${$menuOpen ? "slide-down" : "slide-up"}
    origin-top w-screen xs:w-max`}
  >
    {#each menuOptions as option}
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <li
        on:click={(e) => {
          e.stopPropagation()
          setMobileMenu(false)
          option?.onClick()
        }}
        class="w-full px-5 py-2.5 hover:bg-[#2d3139] transition-colors duration-200"
      >
        {option.title}
      </li>
    {/each}
  </div>
{/if}
