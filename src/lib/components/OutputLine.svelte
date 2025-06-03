<script lang="ts">
	import type { OutputLine } from '$lib/commands';

	export let line: OutputLine;
</script>

<div class:text-theme-error={line.isError}>
	{@html line.html}
</div>
