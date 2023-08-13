<script lang="ts">
  // Get the data from '+page.ts'
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<p>{data.journalEntry?.content}</p>
