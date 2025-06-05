<script lang="ts">
	import { onMount, tick, onDestroy } from 'svelte';
	import { goto } from '$app/navigation';
	import { currentUser, hackerScreenState } from '$lib/stores';
	import { processUserCommand, getCommandEchoLine } from '$lib/commands/index';
	import type { OutputLine } from '$lib/types';
	import OutputLineDisplay from './OutputLine.svelte';
	import HackerScreen from './HackerScreen.svelte';

	export let initialOutputLines: OutputLine[] = [];

	let outputContainerElement: HTMLDivElement;
	let commandInputElement: HTMLInputElement;

	let displayedLines: OutputLine[] = [];
	let currentInput: string = '';
	let commandHistory: string[] = [];
	let historyPointer: number = -1;

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
		hackerScreenState.set({ active: false, durationMs: 0, intervalMs: 0 });
	});

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
			// Ensure the DOM has rendered before scrolling to the bottom
			setTimeout(() => {
				outputContainerElement.scrollTop = outputContainerElement.scrollHeight;
			}, 0);
		}
	}

	async function handleCommandSubmit() {
		const commandToProcess = currentInput.trim();
		if (commandToProcess === '') return;

		const lowerCaseCommand = commandToProcess.toLowerCase();

		if (lowerCaseCommand !== 'stop_hack' && lowerCaseCommand !== 'clear') {
			if ($hackerScreenState.active) {
				console.log('[Terminal] Stopping hacker screen due to new command.');
				hackerScreenState.set({ active: false, durationMs: 0, intervalMs: 0 });
				addOutputLine({
					id: Date.now(),
					html: 'Hacker screen simulation interrupted.',
					isError: true
				});
			}
		}

		if (lowerCaseCommand === 'clear') {
			console.log('[Terminal] Clear command received.');
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

		console.log('[Terminal] Processing regular command:', commandToProcess);
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
			setTimeout(() => {
				if (
					(result.navigationPath as string).startsWith('http://') ||
					(result.navigationPath as string).startsWith('https://')
				) {
					window.location.href = result.navigationPath as string;
				} else {
					goto(result.navigationPath as string);
				}
			}, 300);
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
			console.log('[Terminal] Ctrl+L pressed.');
			displayedLines = [...getWelcomeMessageLines()];
			hackerScreenState.set({ active: false, durationMs: 0, intervalMs: 0 });
			scrollToBottom();
		} else if (event.key === 'C' && event.shiftKey) {
			event.preventDefault();
			console.log('[Terminal] Shift+C pressed.');
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
			<span class="text-theme-prompt whitespace-nowrap">{$currentUser}> </span>
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

	{#if $hackerScreenState.active}
		<HackerScreen {addOutputLine} />
	{/if}
</div>

<style>
	.input-prompt input:focus {
		caret-color: currentColor;
	}
</style>
