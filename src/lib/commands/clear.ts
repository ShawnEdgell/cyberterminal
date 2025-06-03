// src/lib/commands/clear.ts
import type { Command } from './index';

const clearCommand: Command = {
	name: 'clear',
	description: 'Clears the terminal screen.',
	execute: async () => {
		// This command's primary effect (clearing screen) is handled by Terminal.svelte
		// We just return an empty array here.
		return { lines: [] };
	}
};

export default clearCommand;
