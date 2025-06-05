import { createOutputLine } from './_commandUtils';
import type { Command } from '../types';
import { commands } from './index'; // Import the commands array

const COMMAND_NAME_PADDING = 17;

const helpCommand: Command = {
	name: 'help',
	description: 'Show this help message.',
	execute: async (_args: string[], _user: string, _fullCommand: string) => {
		const lines = [];
		lines.push(createOutputLine('CyberTerminal v0.0.1   - Available Commands:'));

		const sortedCommands = [...commands].sort((a, b) => a.name.localeCompare(b.name));

		sortedCommands.forEach((cmd) => {
			const rawCommandUsage = cmd.usage || cmd.name;
			const paddedCommand = rawCommandUsage.padEnd(COMMAND_NAME_PADDING);
			const htmlEncodedPaddedCommand = paddedCommand.replace(/</g, '&lt;').replace(/>/g, '&gt;');

			const aliasPart =
				cmd.aliases && cmd.aliases.length > 0 ? ` (Aliases: ${cmd.aliases.join(', ')})` : '';

			lines.push(
				createOutputLine(
					` <span class="text-theme-prompt">${htmlEncodedPaddedCommand}</span> - <span class="text-theme-alt-text">${cmd.description}${aliasPart}</span>`,
					false, // isError
					false, // isGameOutput
					true // isTrustedHtml
				)
			);
		});

		return { lines };
	}
};

export default helpCommand;
