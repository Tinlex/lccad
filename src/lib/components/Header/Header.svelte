<script>
  import logo from "../../../assets/images/logo.png"
  import HeaderDesktopButtons from "./HeaderDesktopButtons/HeaderDesktopButtons.svelte"
  import HeaderLinks from "./HeaderLinks/HeaderLinks.svelte"
  import HeaderMobileButtons from "./HeaderMobileButtons/HeaderMobileButtons.svelte"
</script>

<header class="w-full flex flex-col relative bg-background-primary">
  <a
    href="/"
    class="logo z-10 absolute left-[20px] sm:left-[20px] top-[4px] h-[100px] w-[100px] md:h-[120px] md:w-[120px] xl:h-[120px] xl:w-[150px]"
  >
    <img src={logo} alt="lccad-logo" class="w-full h-full object-contain" />
  </a>
  <div
    class="top bg-background-primary h-[114px] xl:h-[60px] flex justify-end max-w-container container"
  >
    <HeaderMobileButtons />
    <HeaderDesktopButtons />
  </div>
  <HeaderLinks />
</header>

<style>
</style>
