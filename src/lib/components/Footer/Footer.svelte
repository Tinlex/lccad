<script>
  import bottomLogo from "../../../assets/images/logo_bottom.png"
  import is18oldIcon from "../../../assets/icons/18old.png"
  import { footerColumns } from "./footer-columns"
</script>

<footer class="bg-background-secondary flex flex-col items-center py-8">
  <!-- Top part of footer -->
  <div
    class="flex flex-col lg:flex-row items-start justify-between w-full max-w-screen-xl px-4 gap-8 lg:gap-4 pb-8"
  >
    <img
      src={bottomLogo}
      alt="autumn-logo"
      class="max-w-auto sm:max-w-[387px] h-auto mx-auto"
    />
    <div
      class="flex flex-col sm:flex-wrap sm:flex-row gap-5 lg:gap-0 lg:flex-row justify-between w-full max-w-full lg:max-w-2xl"
    >
      {#each footerColumns as column}
        <div
          class="footer-column text-white flex flex-col items-start mx-0 sm:mx-4 border-b border-solid border-b-[var(--color-background-secondary-light)] pb-4 sm:border-none sm:pb-0"
        >
          <h1 class="text-lg font-bold mb-2">{column.title}</h1>
          <div class="flex flex-col space-y-1">
            {#each column.links as link}
              <a
                class="footer-link flex items-center gap-2 text-sm text-footer-link hover:underline relative"
                href={link.path}
              >
                <span
                  class="h-[10px] w-[10px] border rounded-[50%] border-solid border-[footer-link]"
                ></span>
                {link.title}
              </a>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
  <!-- Bottom part of footer -->
  <div
    class="flex flex-col w-full max-w-screen-xl pt-[24px] border-t border-solid border-t-[var(--color-background-secondary-light)] px-4 sm:px-8"
  >
    <div class="flex flex-col gap-1">
      <h1 class="text-lg font-bold text-white">Responsible betting</h1>
      <p class="text-sm text-footer-link">
        LCCAD takes a strong Play Responsibly stand. Our game rules do not allow
        any person under the age of 18 to place a bet or claim a winning ticket
        prize. Account betting is only available to those above 21 years old.
      </p>
    </div>
    <div class="flex mt-[38px] items-center gap-3">
      <img src={is18oldIcon} alt="18 old" />
      <span class="text-white text-sm"
        >© LCCAD | 2024 | All Rights Reserved</span
      >
    </div>
  </div>
</footer>

<style>
  .footer-column:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
</style>
