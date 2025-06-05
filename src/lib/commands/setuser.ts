// src/lib/commands/setuser.ts
import { setUsernameInStore } from '../stores';
import { createOutputLine } from './_commandUtils';
import { escapeHtml } from '../utils'; // FIX: Correct path to escapeHtml
import type { Command } from './index';

const setuserCommand: Command = {
	name: 'setuser',
	description: 'Set your username.',
	usage: 'setuser <name>',
	execute: async (args) => {
		const lines = [];
		const newUsername = args.join(' ').trim();
		if (newUsername) {
			setUsernameInStore(newUsername);
			lines.push(createOutputLine(`Username set to: ${escapeHtml(newUsername)}`));
		} else {
			lines.push(createOutputLine('Usage: setuser &lt;your_username&gt;', true));
		}
		return { lines };
	}
};

export default setuserCommand;
