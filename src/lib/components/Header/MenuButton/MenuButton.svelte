<script>
  import mobileMenuIcon from "../../../../assets/icons/header-menu.png"
  import { setMobileMenu } from "../../../stores/mobileMenuStore"
  import MobileMenu from "../MobileMenu/MobileMenu.svelte"
</script>

<button class="header-button" on:click={() => setMobileMenu(true)}>
  Menu
  <img
    src={mobileMenuIcon}
    alt="menu-mobile-button"
    class="header-button-icon-small"
  />

  <MobileMenu />
</button>

<style>
</style>
