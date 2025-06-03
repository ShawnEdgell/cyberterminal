<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let errorMessage: string = 'An unexpected error occurred.';

	onMount(() => {
		// You can access route parameters or query strings for error details
		// For example, if you navigate with goto('/error?message=File%20not%20found')
		const urlParams = new URLSearchParams($page.url.search);
		const msg = urlParams.get('message');
		if (msg) {
			errorMessage = decodeURIComponent(msg);
		}
	});
</script>

<div class="text-theme-error flex h-screen flex-col items-center justify-center p-4">
	<h1 class="mb-4 text-3xl font-bold">SYSTEM ERROR</h1>
	<p class="text-center text-lg">
		{errorMessage}
	</p>
	<p class="mt-8 text-sm">Attempting to re-establish connection...</p>
	<button
		class="bg-theme-error text-theme-bg mt-4 rounded px-4 py-2 hover:opacity-80"
		on:click={() => (window.location.href = '/')}
	>
		Return to Terminal
	</button>
</div>
