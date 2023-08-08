<script lang="ts">
  let input: string;
</script>

<div class="flex h-screen w-full">
  <form class="relative flex h-full flex-1 flex-col">
    <div
      class=" pointer-events-none absolute inset-0 h-80 w-full bg-gradient-to-b from-base03 to-transparent"
    />
    <textarea
      class="w-full flex-1 resize-none scroll-pb-16 overflow-y-auto scroll-smooth whitespace-pre-wrap border-none bg-transparent pb-32 pl-4 pr-8 pt-32 font-supreme text-xl leading-8 tracking-wider text-opacity-75 outline-none focus:ring-0"
      placeholder="Start typing what you dreamed..."
      id="main"
      bind:value={input}
    />
      <Button variant="primary"><span slot="text">Save</span></Button>
    </div>
  </form>
  <div class="h-full w-80 bg-purple-300" />
</div>
