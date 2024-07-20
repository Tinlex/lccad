<script>
  import GameThumbnail from "./GameThumbnail/GameThumbnail.svelte"
  import { games } from "./games"
</script>

<section class="relative py-10 sm:py-20 mx-auto max-w-7xl px-4 sm:px-6">
  <ul class="flex flex-wrap -mx-3 justify-center">
    {#each games as game}
      <li class="px-3 w-full sm:w-1/2 lg:w-1/3 mb-10">
        <GameThumbnail {game} />
      </li>
    {/each}
  </ul>
</section>

<style>
</style>
