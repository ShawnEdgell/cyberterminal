<script lang="ts">
	import type { OutputLine } from '$lib/types';
	import { onMount } from 'svelte';

	export let line: OutputLine;
</script>

<div class:text-theme-error={line.isError}>
	{#if line.isTrustedHtml}
		{@html line.html}
	{:else}
		{line.html}
	{/if}
</div>
