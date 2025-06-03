<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { terminalTheme } from '$lib/stores';

	onMount(() => {
		// Ensure the initial theme class is applied when the component mounts
		// The store's subscribe already handles this, but explicitly calling .set
		// ensures it runs even if the value hasn't "changed" but needs the class applied.
		// It's a belt-and-suspenders approach. The subscribe method is sufficient.
		// The following line is technically redundant due to the subscribe in stores.ts,
		// but harmless.
		document.body.className = `theme-${$terminalTheme}`;
	});
</script>

<slot />
