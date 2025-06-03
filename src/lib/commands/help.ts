import { createOutputLine } from './_commandUtils';
import type { Command } from './index';

const helpCommand: Command = {
	name: 'help',
	description: 'Show this help message.',
	execute: async (_args, _user, _fullCommand) => {
		const lines = [];
		lines.push(createOutputLine('CyberTerminal v0.0.1   - Available Commands:'));
		lines.push(createOutputLine('   help             - Show this help message.'));
		lines.push(createOutputLine('   clear            - Clear the terminal screen.'));
		lines.push(createOutputLine('   setuser &lt;name&gt;   - Set your username.'));
		lines.push(createOutputLine('   whoami           - Display current username.'));
		lines.push(createOutputLine('   date             - Display current date and time.'));
		lines.push(createOutputLine('   hacker_screen    - Activate random code stream.'));
		lines.push(createOutputLine('   stop_hack        - Stop hacker screen simulation.'));
		lines.push(createOutputLine('   list_mods_alpha  - List Alpha SkaterXL mods.'));
		lines.push(createOutputLine('   list_mods_public - List Public SkaterXL mods.'));
		lines.push(
			createOutputLine('   guide_start      - Display guide: Getting Started with Modding.')
		);
		return { lines };
	}
};

export default helpCommand;
