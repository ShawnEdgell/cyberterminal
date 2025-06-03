// src/lib/commands/stop_hack.ts
import { hackerScreenState } from '../stores';
import { createOutputLine } from './_commandUtils';
import type { Command } from './index';

const stopHackCommand: Command = {
	name: 'stop_hack',
	description: 'Stop hacker screen simulation.',
	execute: async () => {
		const lines = [];
		hackerScreenState.set({ active: false, durationMs: 0, intervalMs: 0 });
		lines.push(createOutputLine('Hacker screen simulation stopped.'));
		return { lines };
	}
};

export default stopHackCommand;
