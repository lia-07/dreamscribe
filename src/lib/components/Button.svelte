<script lang="ts">
  // This lets the parent component of the button specify which button
  // variant to use.
  export let variant: 'primary' | 'secondary' | 'destructive' | 'disabled';
</script>

<!-- The 'class:' attribute is special Svelte syntax that allows CSS classes to 
be applied if a certain condition is met -->
<button
  class:btn-primary={variant == 'primary'}
  class:btn-secondary={variant == 'secondary'}
  class:btn-destructive={variant == 'destructive'}
  class:btn-disabled={variant == 'disabled'}
  class="flex h-10 min-w-[5rem] items-center justify-center gap-2 rounded px-4 font-bold shadow transition-all hover:opacity-80 hover:shadow-xl focus:scale-90 focus:opacity-80 active:scale-90"
>
  <!-- Named slots for the icon and text. Both are optional, which means you can 
  have a button with just text inside, a button with just a button inside, or 
  a button with both inside -->
  <slot name="icon" />
  <slot name="text" />
</button>
