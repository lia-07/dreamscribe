<script>
  // Get important data about the page (HTTP status, error messages, url, etc.)
  import { page } from '$app/stores';

  // I already explained what this does
  import Icon from '$lib/assets/Icon.svelte';
  import Button from '$lib/components/Button.svelte';
</script>

<svelte:head>
  <!-- $page.status contains the HTTP status of the page. -->
  <title>Error {$page.status} | dreamscribe</title>
</svelte:head>

<div class="flex h-full flex-1 flex-col justify-center px-4">
  <div>
    <h1 class="flex items-center gap-2 font-cabinet text-4xl font-bold opacity-90">
      <Icon name="warning" sizeInRem={1.8} /> Error {$page.status}
    </h1>
    <p class="font-supreme text-xl">{$page.error?.message}</p>
    <div class="mt-4 flex gap-2">
      <!-- When this button is clicked it sends the browser window the home page -->
      <Button variant="primary" on:buttonClick={() => (window.location.href = '/')}>
        <span slot="icon"><Icon name="house" /></span><span slot="text">Go home</span></Button
      >
      <!-- When this button is clicked it sends the browser window to it's 
      previous location -->
      <Button variant="secondary" on:buttonClick={() => history.back()}>
        <span slot="icon"><Icon name="arrow-left" /></span>
        <span slot="text">Go back</span></Button
      >
    </div>
  </div>
</div>
