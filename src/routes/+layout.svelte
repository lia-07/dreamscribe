<script lang="ts">
  // Import the CSS for ALL routes
  import '../app.postcss';

  // Import transition
  import { fade, fly, slide } from 'svelte/transition';
  // import modal stuff
  import { Modals, closeModal } from 'svelte-modals';

  // Import my journal entry array, which is saved in a local storage store.
  import { journalEntries } from '$lib/stores/journalEntries';

  // Import my universal store for the current date
  import { currentDate } from '$lib/stores/currentDate';

  // Import my icon file
  import Icon from '$lib/assets/Icon.svelte';

  // defines if the 'drawer', which contains the previous journal entries, is
  // currently shown on mobile.
  let drawerShown = false;

  // inverts the 'drawerShown' boolean. For example, if it's true it will be set
  // to false
  function drawerInvert() {
    drawerShown = drawerShown != true;
    console.log(drawerShown);
  }
</script>

<!-- Important for the modal(s) -->
<Modals>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    aria-hidden="true"
    slot="backdrop"
    class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
    transition:fade
    on:click={closeModal}
  />
</Modals>

<!-- The header -->
<header
  class="fixed inset-0 z-40 flex h-16 items-center border-b border-base01/50 bg-base03/50 backdrop-blur-sm md:h-16"
>
  <div class="mx-auto flex w-full items-center justify-between gap-2 px-4 md:container">
    <a href="/" class="flex w-fit items-center gap-2">
      <h1 class="font-cabinet text-2xl">dreamscribe</h1>
      <Icon name="feather" sizeInRem={1.25} class=" fill-base2 " />
    </a>
    <div class="flex items-center gap-8">
      <a
        href="/privacy"
        class="opacity-50 transition-all hover:underline hover:opacity-100 md:text-sm">Privacy</a
      >
      <!-- The button that opens the drawer with the dream journal entries.
      Only shown on mobile -->
      <button
        class="flex appearance-none pr-2 opacity-50 transition-all hover:underline hover:opacity-100 md:hidden"
        on:click={drawerInvert}
      >
        <Icon name="list" sizeInRem={1.25} />
      </button>
    </div>
  </div>
</header>
<div class="mx-auto flex h-screen gap-3 md:container">
  <main class="h-full flex-1">
    <slot />
  </main>

  <!-- The dream journal entries panel for desktop -->
  <aside
    class="no-scrollbar hidden h-screen w-80 shrink-0 flex-col overflow-y-auto pb-60 pt-28 opacity-50 transition-all duration-200 hover:opacity-100 md:flex"
  >
    {#if $journalEntries.length > 0}
      <h1 class="text-cabinet mb-1 pl-2 text-2xl font-bold opacity-90">
        Journal {$journalEntries.length == 1 ? 'Entry' : 'Entries'}:
      </h1>
    {/if}
    {#each $journalEntries as journalEntry}
      {@const journalEntryDate = journalEntry.date.split(' ')}
      {@const currentYear = $currentDate.split(' ')[2]}

      <a
        transition:fly={{ y: -20 }}
        href={journalEntry.date == $currentDate ? '/' : journalEntry.date}
        class="active-journal-entry group relative isolate flex h-fit w-full gap-3 rounded-md p-2 opacity-75 transition-all hover:bg-base02 hover:opacity-90 active:scale-95"
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

    <!-- If there are more than 7 dream journal entries, show a fade effect
    at the bottom -->
    {#if $journalEntries.length > 7}
      <div
        class="pointer-events-none absolute bottom-0 h-60 w-80 shrink-0 bg-gradient-to-t from-base03 via-base03/75 to-transparent"
      />
    {/if}
  </aside>
  <!-- The dream journal entries drawer for mobile -->
  {#if drawerShown}
    <div
      class="absolute inset-0 z-50 h-screen w-screen bg-black/50 backdrop-blur-sm"
      aria-hidden="true"
      on:click={drawerInvert}
    >
      <div
        class="absolute bottom-0 right-0 top-0 box-content h-screen overflow-clip"
        transition:slide={{ axis: 'x' }}
      >
        <aside
          class="no-scrollbar box-content flex h-screen w-80 shrink-0 flex-col overflow-y-auto rounded-l-xl bg-base03 p-4 transition-all"
        >
          {#if $journalEntries.length > 0}
            <hgroup
              class="text-cabinet mb-1 flex w-full items-center justify-between pl-2 text-2xl font-bold opacity-90"
            >
              <h1>Journal {$journalEntries.length == 1 ? 'Entry' : 'Entries'}:</h1>
              <button class="flex h-8 w-8 appearance-none items-center justify-center"
                ><Icon name="x" sizeInRem={1.25} /></button
              >
            </hgroup>
          {/if}
          {#each $journalEntries as journalEntry}
            {@const journalEntryDate = journalEntry.date.split(' ')}
            {@const currentYear = $currentDate.split(' ')[2]}
            <a
              transition:fly={{ y: -20 }}
              href={journalEntry.date == $currentDate ? '/' : journalEntry.date}
              class="active-journal-entry group relative isolate flex h-fit w-full shrink-0 gap-3 rounded-md p-2 opacity-75 transition-all hover:bg-base02 hover:opacity-90 active:scale-95"
            >
              <div
                class="flex h-16 w-16 shrink-0 flex-col items-center justify-center self-center rounded bg-base2 text-base03"
              >
                <span class="-mb-2 font-cabinet text-4xl font-bold">{journalEntryDate[0]}</span>
                <span
                  class="font-cabinet font-bold"
                  class:text-sm={currentYear != journalEntryDate[2]}
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
          {#if $journalEntries.length > 7}
            <div
              class="pointer-events-none absolute bottom-0 h-60 w-80 shrink-0 bg-gradient-to-t from-base03 via-base03/75 to-transparent"
            />
          {/if}
        </aside>
      </div>
    </div>
  {/if}
</div>
