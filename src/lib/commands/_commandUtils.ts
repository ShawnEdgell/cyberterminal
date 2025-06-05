// src/lib/commands/_commandUtils.ts
import type { OutputLine } from '../types';
import { escapeHtml } from '../utils'; // escapeHtml is imported here for internal use, not re-exported

let nextOutputId = 0;

const PROMPT_CLASS = 'text-theme-prompt';
const COMMAND_ECHO_CLASS = 'text-theme-command';
export const API_RESPONSE_CLASS = 'text-theme-accent';

export function createOutputLine(
	html: string,
	isError: boolean = false,
	isGameOutput: boolean = false,
	isTrustedHtml: boolean = false
): OutputLine {
	return {
		id: nextOutputId++,
		html,
		isError,
		isGameOutput,
		isTrustedHtml
	};
}

export function getCommandEchoLine(command: string, username: string): OutputLine {
	return createOutputLine(
		`<span class="${PROMPT_CLASS}">${username}&gt; </span><span class="${COMMAND_ECHO_CLASS}">${escapeHtml(command)}</span>`,
		false,
		false,
		true
	);
}
