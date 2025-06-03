import { currentUser, setUsernameInStore, hackerScreenState } from './stores';
import { get } from 'svelte/store';
import { escapeHtml } from './utils';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { fetchModsList, type ApiResponse, type ModItem } from './api';

export interface OutputLine {
	id: number;
	html: string;
	isError?: boolean;
}

let nextOutputId = 0;

const PROMPT_CLASS = 'text-theme-prompt';
const COMMAND_ECHO_CLASS = 'text-theme-command';
const API_RESPONSE_CLASS = 'text-theme-accent';

function createOutputLine(html: string, isError: boolean = false): OutputLine {
	return {
		id: nextOutputId++,
		html,
		isError
	};
}

export function getCommandEchoLine(command: string, username: string): OutputLine {
	return createOutputLine(
		`<span class="${PROMPT_CLASS}">${username}&gt; </span><span class="${COMMAND_ECHO_CLASS}">${escapeHtml(command)}</span>`
	);
}

async function getModListOutput(modListId: string, listName: string): Promise<OutputLine[]> {
	const lines: OutputLine[] = [];
	lines.push(createOutputLine(`Fetching ${listName} mods...`));
	const apiResult = await fetchModsList(modListId);

	if (apiResult && Array.isArray(apiResult) && apiResult.length > 0) {
		lines.push(
			createOutputLine(
				`<span class="${API_RESPONSE_CLASS}">--- Found ${apiResult.length} ${listName} Mods ---</span>`
			)
		);
		apiResult.forEach((mod: ModItem, index: number) => {
			lines.push(createOutputLine(`<span class="${API_RESPONSE_CLASS}">Mod ${index + 1}:</span>`));
			lines.push(
				createOutputLine(
					`  <span class="${API_RESPONSE_CLASS}">Title:</span> ${escapeHtml(mod.title)}`
				)
			);
			lines.push(
				createOutputLine(
					`  <span class="${API_RESPONSE_CLASS}">Author:</span> ${escapeHtml(mod.author)}`
				)
			);
			lines.push(
				createOutputLine(
					`  <span class="${API_RESPONSE_CLASS}">Version:</span> ${escapeHtml(mod.workingVersion)}`
				)
			);
			if (mod.keybind && mod.keybind !== 'None') {
				lines.push(
					createOutputLine(
						`  <span class="${API_RESPONSE_CLASS}">Keybind:</span> ${escapeHtml(mod.keybind)}`
					)
				);
			}
			if (mod.features && mod.features.length > 0) {
				lines.push(
					createOutputLine(
						`  <span class="${API_RESPONSE_CLASS}">Features:</span> ${mod.features.map((f) => escapeHtml(f)).join(', ')}`
					)
				);
			}
			lines.push(
				createOutputLine(
					`  <span class="${API_RESPONSE_CLASS}">Note:</span> ${escapeHtml(mod.note)}`
				)
			);
			if (mod.downloadLinks && mod.downloadLinks.length > 0) {
				lines.push(
					createOutputLine(
						`  <span class="${API_RESPONSE_CLASS}">Downloads:</span> ${mod.downloadLinks.map((link) => `<a href="${escapeHtml(link.url)}" target="_blank" class="underline">${escapeHtml(link.label)}</a>`).join(', ')}`
					)
				);
			}
			lines.push(createOutputLine(' '));
		});
		lines.push(
			createOutputLine(`<span class="${API_RESPONSE_CLASS}">--- End of ${listName} List ---</span>`)
		);
	} else if (apiResult && Array.isArray(apiResult) && apiResult.length === 0) {
		lines.push(createOutputLine(`No mods found in the ${listName} list.`, true));
	} else {
		lines.push(
			createOutputLine(
				`Error fetching data for ${listName} mods. Please check network connection.`,
				true
			)
		);
	}
	return lines;
}

export function processUserCommand(command: string): {
	lines: OutputLine[];
	navigationPath?: string;
	asyncPromise?: Promise<OutputLine[]>;
} {
	const output: OutputLine[] = [];
	const navigationPath: string | undefined = undefined;
	const user = get(currentUser);
	let asyncPromise: Promise<OutputLine[]> | undefined = undefined;

	const lowerCommand = command.toLowerCase().trim();
	const parts = lowerCommand.split(' ');
	const baseCommand = parts[0];

	if (baseCommand !== 'hacker_screen' && baseCommand !== 'stop_hack') {
		hackerScreenState.set({ active: false, durationMs: 0, intervalMs: 0 });
	}

	switch (baseCommand) {
		case 'help':
			output.push(createOutputLine('CyberTerminal v0.0.1   - Available Commands:'));
			output.push(createOutputLine('   help            - Show this help message.'));
			output.push(createOutputLine('   clear           - Clear the terminal screen.'));
			output.push(createOutputLine('   setuser &lt;name&gt;  - Set your username.'));
			output.push(createOutputLine('   whoami          - Display current username.'));
			output.push(createOutputLine('   date            - Display current date and time.'));
			output.push(createOutputLine('   hacker_screen   - Activate random code stream.'));
			output.push(createOutputLine('   stop_hack       - Stop hacker screen simulation.'));
			output.push(createOutputLine('   list_mods_alpha - List Alpha SkaterXL mods.'));
			output.push(createOutputLine('   list_mods_public - List Public SkaterXL mods.'));
			break;
		case 'setuser': {
			const newUsername = command.split(' ').slice(1).join(' ').trim();
			if (newUsername) {
				setUsernameInStore(newUsername);
				output.push(createOutputLine(`Username set to: ${escapeHtml(newUsername)}`));
			} else {
				output.push(createOutputLine('Usage: setuser &lt;your_username&gt;', true));
			}
			break;
		}
		case 'whoami':
			output.push(createOutputLine(escapeHtml(user)));
			break;
		case 'date':
			output.push(createOutputLine(new Date().toLocaleString()));
			break;
		case 'clear':
			break;
		case 'hacker_screen': {
			const fixedDurationSeconds = 15;
			output.push(
				createOutputLine(
					`Initiating hacker screen simulation for ${fixedDurationSeconds} seconds...`
				)
			);
			hackerScreenState.set({
				active: true,
				durationMs: fixedDurationSeconds * 1000,
				intervalMs: 50
			});
			break;
		}
		case 'stop_hack':
			hackerScreenState.set({ active: false, durationMs: 0, intervalMs: 0 });
			output.push(createOutputLine('Hacker screen simulation stopped.'));
			break;
		case 'list_mods_alpha':
			asyncPromise = getModListOutput('12104', 'Alpha');
			break;
		case 'list_mods_public':
			asyncPromise = getModListOutput('1228', 'Public');
			break;
		default:
			if (command.trim() !== '') {
				output.push(
					createOutputLine(`Command not found: ${escapeHtml(command)}. Type 'help'.`, true)
				);
			}
	}
	return { lines: output, navigationPath, asyncPromise };
}
