<script lang="ts">
  export let variant: 'primary' | 'secondary' | 'destructive' | 'disabled';
</script>

<button
  class:btn-primary={variant == 'primary'}
  class:btn-secondary={variant == 'secondary'}
  class:btn-destructive={variant == 'destructive'}
  class:btn-disabled={variant == 'disabled'}
  class="flex h-8 min-w-[5rem] items-center justify-center gap-2 rounded px-4 font-bold shadow transition-all hover:opacity-80 hover:shadow-xl focus:scale-90 focus:opacity-80 active:scale-90"
>
  <slot name="icon" />

  <slot name="text" />
</button>
