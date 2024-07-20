<script>
  import { headerLinks } from "./header-links"

  let activeLink = headerLinks[0]
  let hoveredLink = null
</script>

<div
  class="header-links-container relative w-full bg-background-secondary justify-start hidden md:flex"
>
  <ul
    class="header-links flex items-center h-[100px] xl:h-[60px] overflow-x-auto overflow-y-hidden box-border mx-auto my-0"
  >
    {#each headerLinks as link}
      <a
        on:focus={() => {}}
        on:mouseleave={() => (hoveredLink = null)}
        on:mouseover={() => (hoveredLink = link)}
        class={`header-link 
          ${hoveredLink?.title === link.title ? "hovered" : ""} 
          ${activeLink?.title === link.title ? "active" : ""} 
          flex items-center gap-2 h-full 
          transition-[var(--transition-light)] 
          cursor-pointer shrink-0 px-[17px] py-0`}
        href="/"
      >
        <span
          class="flex items-center text-[28px] xl:text-lg text-[color:var(--color-header-link)] uppercase font-semibold h-full transition-[var(--transition-light)]"
        >
          {link.title}
        </span>
      </a>
    {/each}
  </ul>
</div>

<style>
  .header-links::-webkit-scrollbar {
    height: 8px;
  }
  .header-links::-webkit-scrollbar-thumb {
    background-color: #808080;
    border-radius: 4px;
  }
  .header-links::-webkit-scrollbar-track {
    background: transparent;
  }

  .header-links .header-link:hover,
  .header-links .header-link.active {
    background: var(--color-background-secondary-light);
    box-shadow: inset 0 -3px 0 #3ee997;
  }
  .header-links .header-link:hover span,
  .header-links .header-link.active span {
    color: var(--color-header-link-active);
  }
</style>
