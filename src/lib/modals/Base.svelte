<script>
  import { fly } from 'svelte/transition';
</script>

<!-- This is the Base modal. All other modals should inherit the styles and
other attributes of this modal, but provide their own content -->

<div
  role="dialog"
  class="pointer-events-none fixed inset-0 z-50 flex items-center justify-center px-4"
  transition:fly={{ duration: 200, y: 200 }}
>
  <div
    class="pointer-events-auto flex max-h-full min-w-[20rem] max-w-md flex-col gap-2 rounded bg-base02 p-2"
    tabindex="-1"
  >
    <slot />
  </div>
</div>
