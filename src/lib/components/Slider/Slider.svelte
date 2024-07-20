<script>
  import { slides } from "./slides"
  // import function to register Swiper custom elements
  import { register } from "swiper/element/bundle"
  // register Swiper custom elements
  register()
</script>

<swiper-container
  slides-per-view="1"
  space-between={0}
  loop="true"
  autoplay-delay="3000"
  autoplay-disable-on-interaction="false"
  pagination-clickable="true"
  centered-slides="true"
  class="w-full h-full relative"
>
  {#each slides as slide}
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <swiper-slide class="flex justify-center items-center w-full h-auto">
      <img
        src={slide.desktop}
        alt="Slide image desktop"
        class="test hidden md:block w-full h-auto object-cover max-h-[475px]"
      />
      <img
        src={slide.mobile}
        alt="Slide image mobile"
        class="block md:hidden w-full h-auto object-cover max-h-[475px]"
      />
    </swiper-slide>
  {/each}
  <div
    class="swiper-pagination absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2.5"
  ></div>
</swiper-container>

<style>
</style>
