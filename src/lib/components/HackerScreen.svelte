<script lang="ts">
	import { onDestroy } from 'svelte';
	import { hackerScreenState } from '$lib/stores';
	import {
		getRandomInt,
		generateRandomHex,
		generateRandomIP,
		generateRandomFilePath,
		generateRandomLogLine,
		generateRandomString
	} from '$lib/utils';
	import type { OutputLine } from '$lib/types';

	export let addOutputLine: (line: OutputLine) => void;

	let hackerScreenInterval: number | null = null;
	let hackerScreenTimeout: number | null = null;

	onDestroy(() => {
		if (hackerScreenInterval) clearInterval(hackerScreenInterval);
		if (hackerScreenTimeout) clearTimeout(hackerScreenTimeout);
		hackerScreenState.set({ active: false, durationMs: 0, intervalMs: 0 });
	});

	// Reactive block for Hacker Screen - ONLY manages its own interval/timeout
	$: {
		if ($hackerScreenState.active) {
			console.log(
				'[HackerScreen] Hacker screen reactive block triggered. Active:',
				$hackerScreenState.active
			);
			if (hackerScreenInterval) clearInterval(hackerScreenInterval);
			if (hackerScreenTimeout) clearTimeout(hackerScreenTimeout);

			hackerScreenInterval = window.setInterval(() => {
				addOutputLine(generateRandomHackerLine());
			}, $hackerScreenState.intervalMs);

			hackerScreenTimeout = window.setTimeout(() => {
				if (hackerScreenInterval) clearInterval(hackerScreenInterval);
				hackerScreenState.set({ active: false, durationMs: 0, intervalMs: 0 });
				addOutputLine({ id: Date.now(), html: 'Hacker screen simulation ended.', isError: false });
			}, $hackerScreenState.durationMs);
		} else {
			if (hackerScreenInterval) clearInterval(hackerScreenInterval);
			if (hackerScreenTimeout) clearTimeout(hackerScreenTimeout);
			hackerScreenInterval = null;
			hackerScreenTimeout = null;
		}
	}

	function generateRandomHackerLine(): OutputLine {
		const lineTypes = [
			() => `[${generateRandomHex(8)}] ${generateRandomLogLine()}`,
			() => `0x${generateRandomHex(16)} ${generateRandomHex(16)} ${generateRandomHex(16)}`,
			() => `Connecting to ${generateRandomIP()}...`,
			() => `Downloading ${generateRandomFilePath()}... ${getRandomInt(1, 100)}%`,
			() => `Compiling ${generateRandomString(getRandomInt(5, 15))}.c...`,
			() => `Scanning port ${getRandomInt(1, 65535)} on ${generateRandomIP()}`,
			() =>
				`[${generateRandomHex(4)}] ACCESS ${Math.random() > 0.5 ? 'GRANTED' : 'DENIED'} - ${generateRandomString(getRandomInt(10, 20))}`,
			() => `DATA: ${generateRandomHex(32)}`
		];
		const randomType = lineTypes[getRandomInt(0, lineTypes.length - 1)];
		return { id: Date.now(), html: randomType(), isError: Math.random() < 0.1 };
	}
</script>
