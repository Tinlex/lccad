<script>
  import Slider from "../lib/components/Slider/Slider.svelte"
  import GameThumbnails from "../lib/components/GamesThumbnails/GamesThumbnails.svelte"
  import AuthModal from "../lib/components/Modals/AuthModal/AuthModal.svelte"
</script>

<section class="bg-background-primary">
  <Slider />
  <GameThumbnails />
</section>
<!-- Modals -->
<AuthModal />

<style>
</style>
