<script>
  import { userState } from "../../../stores/userStore"
  export let game
</script>

<a href={game.link[$userState.playerIndex]}>
  <li
    class="group h-full w-full shadow-md hover:shadow-lg ring-offset-2 outline-none focus:ring-cardinal-500/40 focus:ring-2 rounded-xl overflow-hidden border border-gray-300 bg-white flex flex-col hover:scale-105 transition-all duration-200 cursor-pointer"
  >
    <div class="relative w-full bg-neutral-400">
      <img
        alt={game.title}
        srcset={game.thumbnail}
        src={game.thumbnail}
        decoding="async"
        data-nimg="fill"
        loading="lazy"
        class="w-full h-full min-h-[250px] object-fill"
      />
    </div>
  </li>
</a>

<style>
  .group:hover .group-hover\:mix-blend-color-dodge {
    mix-blend-mode: color-dodge;
  }
  .group:hover .group-hover\:opacity-100 {
    opacity: 1;
  }
  .line-clamp-5 {
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .text-cardinal-custom {
    color: #eb4c48;
  }
</style>
