import type { OutputLine, Command } from '../types';
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
import listDecalsCommand from './list_decals';
import guideStartCommand from './guide_start';
import rickCommand from './rick';
import youtubeCommand from './youtube';

export const getCommandEchoLine = _getCommandEchoLine;

// Register all commands here
export const commands: Command[] = [
	helpCommand,
	clearCommand,
	setuserCommand,
	whoamiCommand,
	dateCommand,
	// Hacker Tools
	hackerScreenCommand,
	stopHackCommand,
	// Mod Listing
	listModsAlphaCommand,
	listModsPublicCommand,
	listDecalsCommand,
	// Guides
	guideStartCommand,
	// Fun
	rickCommand,
	youtubeCommand
	// NEW: Game Commands
	// Add new commands here in the desired order
];

const commandMap = new Map<string, Command>();
commands.forEach((cmd) => {
	commandMap.set(cmd.name.toLowerCase(), cmd);
	if (cmd.aliases) {
		cmd.aliases.forEach((alias) => commandMap.set(alias.toLowerCase(), cmd));
	}
});

export async function processUserCommand(
	command: string,
	currentUser: string
): Promise<{
	lines: OutputLine[];
	navigationPath?: string;
	asyncPromise?: Promise<OutputLine[]>;
}> {
	const output: OutputLine[] = [];
	const lowerCommand = command.toLowerCase().trim();
	const parts = lowerCommand.split(' ');
	const baseCommand = parts[0];
	const args = parts.slice(1);

	const commandModule = commandMap.get(baseCommand);

	if (commandModule) {
		const rawResult = commandModule.execute(args, currentUser, command);

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
