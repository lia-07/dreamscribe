<script>
  // Import the CSS for ALL routes
  import '../app.postcss';

  // Import a cool transition
  import { slide } from 'svelte/transition';

  // Import my journal entry array, which is saved in a local storage store.
  import { journalEntries } from '$lib/stores/journalEntries';

  // Import my universal store for the current date
  import { currentDate } from '$lib/stores/currentDate';
</script>

<div class="mx-auto md:container">
  <main class="flex h-screen w-full gap-3">
    <slot />
    <aside
      class="no-scrollbar flex h-full w-80 shrink-0 flex-col overflow-y-auto pb-60 pt-20 opacity-75 transition-all duration-200 hover:opacity-100"
    >
      {#if $journalEntries.length > 0}
        <h1 class="text-cabinet mb-2 pl-2 text-2xl font-bold opacity-50 hover:opacity-90">
          Journal {$journalEntries.length == 1 ? 'Entry' : 'Entries'}:
        </h1>
      {/if}
      {#each $journalEntries as journalEntry}
        {@const journalEntryDate = journalEntry.date.split(' ')}
        {@const currentYear = $currentDate.split(' ')[2]}

        <a
          transition:slide
          href={journalEntry.date == $currentDate ? '/' : journalEntry.date}
          class="active-journal-entry group relative isolate flex h-fit w-full gap-3 rounded-md p-2 opacity-50 transition-all hover:bg-base02 hover:opacity-90 active:scale-95"
        >
          <div
            class="flex h-16 w-16 shrink-0 flex-col items-center justify-center self-center rounded bg-base2 text-base03"
          >
            <span class="-mb-2 font-cabinet text-4xl font-bold">{journalEntryDate[0]}</span>
            <span class="font-cabinet font-bold" class:text-sm={currentYear != journalEntryDate[2]}
              >{journalEntryDate[1]}{currentYear != journalEntryDate[2]
                ? " '" + journalEntryDate[2].slice(2)
                : ''}</span
            >
          </div>
          <p class=" line-clamp-3 text-ellipsis text-base3">
            {journalEntry.content}
          </p>
        </a>
      {/each}
      <div
        class="pointer-events-none absolute bottom-0 h-60 w-80 shrink-0 bg-gradient-to-t from-base03 via-base03/75 to-transparent"
      />
    </aside>
  </main>
</div>
