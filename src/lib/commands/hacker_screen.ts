// src/lib/commands/hacker_screen.ts
import { hackerScreenState } from '../stores';
import { createOutputLine } from './_commandUtils';
import type { Command } from './index';

const hackerScreenCommand: Command = {
	name: 'hacker_screen',
	description: 'Activate random code stream.',
	execute: async (args) => {
		const lines = [];
		let durationSeconds = 15; // Default duration
		// Re-adding logic for secret duration, but not in help
		if (args.length > 0) {
			const parsedDuration = parseInt(args[0], 10);
			if (!isNaN(parsedDuration) && parsedDuration > 0) {
				durationSeconds = parsedDuration;
			} else {
				lines.push(createOutputLine('Invalid duration. Using default 15 seconds.', true));
			}
		}
		lines.push(
			createOutputLine(`Initiating hacker screen simulation for ${durationSeconds} seconds...`)
		);
		hackerScreenState.set({ active: true, durationMs: durationSeconds * 1000, intervalMs: 50 });
		return { lines };
	}
};

export default hackerScreenCommand;
