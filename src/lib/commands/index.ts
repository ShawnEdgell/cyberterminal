// src/lib/commands/index.ts
import type { OutputLine } from '../types';
import { createOutputLine, getCommandEchoLine as _getCommandEchoLine } from './_commandUtils';
import { escapeHtml } from '../utils';

// Import individual command modules
import helpCommand from './help';
import clearCommand from './clear';
import setuserCommand from './setuser';
import whoamiCommand from './whoami';
import dateCommand from './date';
import hackerScreenCommand from './hacker_screen';
import stopHackCommand from './stop_hack';
import listModsAlphaCommand from './list_mods_alpha';
import listModsPublicCommand from './list_mods_public';
import guideStartCommand from './guide_start';

export const getCommandEchoLine = _getCommandEchoLine; // Export for Terminal.svelte

// Define the interface for a command module
export interface Command {
	name: string;
	description: string;
	aliases?: string[]; // Optional aliases for the command
	execute: (
		args: string[],
		user: string,
		fullCommand: string
	) =>
		| Promise<{
				lines: OutputLine[];
				navigationPath?: string;
		  }>
		| {
				lines: OutputLine[];
				navigationPath?: string;
		  };
}

// Register all commands here
const commands: Command[] = [
	helpCommand,
	clearCommand,
	setuserCommand,
	whoamiCommand,
	dateCommand,
	hackerScreenCommand,
	stopHackCommand,
	listModsAlphaCommand,
	listModsPublicCommand,
	guideStartCommand
];

// Map commands by their name and aliases for quick lookup
const commandMap = new Map<string, Command>();
commands.forEach((cmd) => {
	commandMap.set(cmd.name.toLowerCase(), cmd);
	if (cmd.aliases) {
		cmd.aliases.forEach((alias) => commandMap.set(alias.toLowerCase(), cmd));
	}
});

// Centralized processing function
export async function processUserCommand(
	command: string,
	currentUser: string
): Promise<{
	lines: OutputLine[];
	navigationPath?: string;
	asyncPromise?: Promise<OutputLine[]>; // Keep this for now for async commands handled by Terminal
}> {
	const output: OutputLine[] = [];
	const lowerCommand = command.toLowerCase().trim();
	const parts = lowerCommand.split(' ');
	const baseCommand = parts[0];
	const args = parts.slice(1);

	const commandModule = commandMap.get(baseCommand);

	if (commandModule) {
		const rawResult = commandModule.execute(args, currentUser, command);

		// FIX: Use PromiseLike<unknown> to avoid 'any'
		if (rawResult && typeof (rawResult as PromiseLike<unknown>).then === 'function') {
			const promiseResult = rawResult as Promise<{ lines: OutputLine[]; navigationPath?: string }>;
			return { lines: [], asyncPromise: promiseResult.then((data) => data.lines) };
		} else {
			const syncResult = rawResult as { lines: OutputLine[]; navigationPath?: string };
			return { lines: syncResult.lines, navigationPath: syncResult.navigationPath };
		}
	} else {
		output.push(createOutputLine(`Command not found: ${escapeHtml(command)}. Type 'help'.`, true));
		return { lines: output };
	}
}
