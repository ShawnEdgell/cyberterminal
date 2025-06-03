<script lang="ts">
	import { onMount, tick, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { currentUser, hackerScreenState } from '$lib/stores';
	import { processUserCommand, getCommandEchoLine } from '$lib/commands/index';
	import type { OutputLine } from '$lib/types'; // FIX: Corrected import path for OutputLine
	import OutputLineDisplay from './OutputLine.svelte';
	import {
		getRandomInt,
		generateRandomHex,
		generateRandomIP,
		generateRandomFilePath,
		generateRandomLogLine,
		generateRandomString
	} from '$lib/utils';

	export let initialOutputLines: OutputLine[] = [];

	let outputContainerElement: HTMLDivElement;
	let commandInputElement: HTMLInputElement;

	let displayedLines: OutputLine[] = [];
	let currentInput: string = '';
	let commandHistory: string[] = [];
	let historyPointer: number = -1;

	let hackerScreenInterval: number | null = null;
	let hackerScreenTimeout: number | null = null;

	const getWelcomeMessageLines = (): OutputLine[] => [
		{ id: -1, html: `Welcome to CyberTerminal. Logged in as: ${$currentUser}` },
		{ id: -2, html: `Type 'help' for commands.` }
	];

	onMount(() => {
		if (initialOutputLines.length > 0) {
			displayedLines = initialOutputLines;
		} else {
			displayedLines = [...getWelcomeMessageLines()];
		}
		commandInputElement?.focus();
		scrollToBottom();
	});

	onDestroy(() => {
		if (hackerScreenInterval) clearInterval(hackerScreenInterval);
		if (hackerScreenTimeout) clearTimeout(hackerScreenTimeout);
		hackerScreenState.set({ active: false, durationMs: 0, intervalMs: 0 });
	});

	$: {
		if ($hackerScreenState.active) {
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

	function addOutputLine(line: OutputLine) {
		displayedLines = [...displayedLines, line];
		scrollToBottom();
	}

	function addMultipleOutputLines(lines: OutputLine[]) {
		displayedLines = [...displayedLines, ...lines];
		scrollToBottom();
	}

	async function scrollToBottom() {
		await tick();
		if (outputContainerElement) {
			outputContainerElement.scrollTop = outputContainerElement.scrollHeight;
		}
	}

	async function handleCommandSubmit() {
		const commandToProcess = currentInput.trim();
		if (commandToProcess === '') return;

		if (commandToProcess.toLowerCase() !== 'stop_hack') {
			if ($hackerScreenState.active) {
				hackerScreenState.set({ active: false, durationMs: 0, intervalMs: 0 });
				addOutputLine({
					id: Date.now(),
					html: 'Hacker screen simulation interrupted.',
					isError: true
				});
			}
		}

		if (commandToProcess.toLowerCase() === 'clear') {
			addOutputLine(getCommandEchoLine(commandToProcess, $currentUser));
			displayedLines = [...getWelcomeMessageLines()];
			hackerScreenState.set({ active: false, durationMs: 0, intervalMs: 0 });
			if (commandToProcess !== commandHistory[commandHistory.length - 1]) {
				commandHistory = [...commandHistory, commandToProcess];
			}
			historyPointer = commandHistory.length;
			currentInput = '';
			scrollToBottom();
			return;
		}

		addOutputLine(getCommandEchoLine(commandToProcess, $currentUser));

		const result = await processUserCommand(commandToProcess, $currentUser);

		if (result.asyncPromise) {
			addOutputLine({ id: Date.now(), html: 'Processing API request...', isError: false });
			try {
				const asyncOutput = await result.asyncPromise;
				addMultipleOutputLines(asyncOutput);
			} catch (error: unknown) {
				let errorMessage = 'An unknown error occurred during async operation.';
				if (error instanceof Error) {
					errorMessage = `Error during async operation: ${error.message}`;
				} else if (typeof error === 'string') {
					errorMessage = `Error during async operation: ${error}`;
				}
				addOutputLine({ id: Date.now(), html: errorMessage, isError: true });
			}
		} else {
			addMultipleOutputLines(result.lines);
		}

		if (result.navigationPath && typeof result.navigationPath === 'string') {
			setTimeout(() => goto(result.navigationPath as string), 300);
		}

		if (commandToProcess !== commandHistory[commandHistory.length - 1]) {
			commandHistory = [...commandHistory, commandToProcess];
		}
		historyPointer = commandHistory.length;
		currentInput = '';
	}

	function handleInputKeydown(event: KeyboardEvent) {
		if (event.key === 'Enter') {
			event.preventDefault();
			handleCommandSubmit();
		} else if (event.key === 'ArrowUp') {
			event.preventDefault();
			if (commandHistory.length > 0) {
				if (historyPointer > 0) {
					historyPointer--;
				}
				currentInput = commandHistory[historyPointer];
			}
		} else if (event.key === 'ArrowDown') {
			event.preventDefault();
			if (commandHistory.length > 0) {
				if (historyPointer < commandHistory.length - 1) {
					historyPointer++;
					currentInput = commandHistory[historyPointer];
				} else if (historyPointer === commandHistory.length - 1) {
					currentInput = '';
					historyPointer = commandHistory.length;
				}
			} else {
				currentInput = '';
				historyPointer = commandHistory.length;
			}
		} else if (event.key === 'l' && event.ctrlKey) {
			event.preventDefault();
			displayedLines = [...getWelcomeMessageLines()];
			hackerScreenState.set({ active: false, durationMs: 0, intervalMs: 0 });
			scrollToBottom();
		}
	}

	function focusInputArea() {
		commandInputElement?.focus();
	}

	function handleContainerKeydown(event: KeyboardEvent) {
		if (event.target === commandInputElement) {
			return;
		}

		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			focusInputArea();
		}
	}
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
<div
	class="flex h-screen flex-col p-4"
	role="application"
	aria-label="Cyber Terminal Interface"
	tabindex="0"
	on:click={focusInputArea}
	on:keydown={handleContainerKeydown}
>
	<div
		bind:this={outputContainerElement}
		class="output-area flex-grow overflow-y-auto pr-2 break-words whitespace-pre-wrap"
	>
		{#each displayedLines as line (line.id)}
			<OutputLineDisplay {line} />
		{/each}

		<div class="input-prompt flex items-center">
			<span class="text-theme-prompt whitespace-nowrap">{$currentUser}&gt;&nbsp;</span>
			<input
				type="text"
				bind:this={commandInputElement}
				bind:value={currentInput}
				on:keydown={handleInputKeydown}
				class="text-theme-text flex-grow border-none bg-transparent pl-1 outline-none"
				autocomplete="off"
				spellcheck="false"
			/>
		</div>
	</div>
</div>

<style>
	.input-prompt input:focus {
		caret-color: currentColor;
	}
	.input-prompt {
		padding-top: 0.5rem;
	}
</style>
