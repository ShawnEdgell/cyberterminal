// src/lib/commands/list_mods_public.ts
import { createOutputLine, API_RESPONSE_CLASS } from './_commandUtils';
import { fetchModsList } from '../api';
import type { ModItem } from '../api';
import { escapeHtml } from '../utils'; // Import escapeHtml from global utils
import type { Command } from './index';

const listModsPublicCommand: Command = {
	name: 'list_mods_public',
	description: 'List Public SkaterXL mods.',
	execute: async () => {
		const lines = [];
		const modListId = '1228';
		const listName = 'Public';
		lines.push(createOutputLine(`Fetching ${listName} mods...`));

		const apiResult = await fetchModsList(modListId);

		if (apiResult && Array.isArray(apiResult) && apiResult.length > 0) {
			lines.push(
				createOutputLine(
					`<span class="${API_RESPONSE_CLASS}">--- Found ${apiResult.length} ${listName} Mods ---</span>`
				)
			);
			apiResult.forEach((mod: ModItem, index: number) => {
				lines.push(
					createOutputLine(`<span class="${API_RESPONSE_CLASS}">Mod ${index + 1}:</span>`)
				);
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
				createOutputLine(
					`<span class="${API_RESPONSE_CLASS}">--- End of ${listName} List ---</span>`
				)
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
		return { lines };
	}
};

export default listModsPublicCommand;
