<script lang="ts">
  let input: string;
</script>

<div class="flex h-screen w-full">
  <form class="relative flex h-full flex-1 flex-col">
    <div
      class=" pointer-events-none absolute inset-0 h-80 w-full bg-gradient-to-b from-base03 to-transparent"
    />
    <textarea
      class="w-full flex-1 resize-none scroll-pb-16 overflow-y-auto scroll-smooth whitespace-pre-wrap border-none bg-transparent pb-32 pl-4 pr-8 pt-32 font-supreme text-xl leading-8 tracking-wider text-opacity-75 focus:ring-0"
      placeholder="Start typing what you dreamed..."
      id="main"
      bind:value={input}
    />
    <div class="flex h-16 items-center px-4">
      <label for="mood">Mood:</label>
      <select name="mood" id="mood" class="rounded-md bg-base3 py-2 pl-3 pr-8 text-base03">
        <option value="" selected disabled>Select a mood</option>
        <option value="Happy">Happy</option>
        <option value="Sad">Sad</option>
        <option value="Anxious">Anxious</option>
        <option value="Scary">Scary</option>
        <option value="Nostalgic">Nostalgic</option>
        <option value="Crazy">Crazy</option>
      </select>
    </div>
  </form>
  <div class="h-full w-80 bg-purple-300" />
</div>
