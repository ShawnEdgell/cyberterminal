// src/lib/commands/whoami.ts
import { get } from 'svelte/store';
import { currentUser } from '../stores';
import { createOutputLine } from './_commandUtils'; // Now only importing createOutputLine
import { escapeHtml } from '../utils'; // FIX: Import escapeHtml directly from '../utils'
import type { Command } from './index';

const whoamiCommand: Command = {
	name: 'whoami',
	description: 'Display current username.',
	// FIX: Prefix unused parameters with an underscore
	execute: async (_args, _user, _fullCommand) => {
		const lines = [];
		const user = get(currentUser);
		lines.push(createOutputLine(escapeHtml(user)));
		return { lines };
	}
};

export default whoamiCommand;
