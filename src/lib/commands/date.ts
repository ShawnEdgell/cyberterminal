// src/lib/commands/date.ts
import { createOutputLine } from './_commandUtils';
import type { Command } from './index';

const dateCommand: Command = {
	name: 'date',
	description: 'Display current date and time.',
	execute: async () => {
		const lines = [];
		lines.push(createOutputLine(new Date().toLocaleString()));
		return { lines };
	}
};

export default dateCommand;
