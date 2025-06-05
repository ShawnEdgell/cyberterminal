// src/lib/commands/list_mods_public.ts
import { createOutputLine, API_RESPONSE_CLASS } from './_commandUtils';
import { fetchModsList } from '../api';
import type { ModItem, Command } from '../types';
import { escapeHtml } from '../utils'; // Import escapeHtml from global utils

const listModsPublicCommand: Command = {
	name: 'list_mods_public',
	description: 'List Public SkaterXL mods.',
	execute: async () => {
		const lines = [];
		const modListId = '12104';
		const listName = 'Public';
		lines.push(createOutputLine(`Fetching ${listName} mods...`));

		const apiResult = await fetchModsList(modListId);

		if (apiResult && Array.isArray(apiResult) && apiResult.length > 0) {
			lines.push(
				createOutputLine(
					`<span class="${API_RESPONSE_CLASS}">--- Found ${apiResult.length} ${listName} Mods ---</span>`,
					false,
					false,
					true
				)
			);
			apiResult.forEach((mod: ModItem, index: number) => {
				lines.push(
					createOutputLine(
						`<span class="${API_RESPONSE_CLASS}">Mod ${index + 1}:</span>`,
						false,
						false,
						true
					)
				);
				lines.push(
					createOutputLine(
						`  <span class="${API_RESPONSE_CLASS}">Title:</span> ${escapeHtml(mod.title)}`,
						false,
						false,
						true
					)
				);
				lines.push(
					createOutputLine(
						`  <span class="${API_RESPONSE_CLASS}">Author:</span> ${escapeHtml(mod.author)}`,
						false,
						false,
						true
					)
				);
				lines.push(
					createOutputLine(
						`  <span class="${API_RESPONSE_CLASS}">Version:</span> ${escapeHtml(mod.workingVersion)}`,
						false,
						false,
						true
					)
				);
				if (mod.keybind && mod.keybind !== 'None') {
					lines.push(
						createOutputLine(
							`  <span class="${API_RESPONSE_CLASS}">Keybind:</span> ${escapeHtml(mod.keybind)}`,
							false,
							false,
							true
						)
					);
				}
				if (mod.features && mod.features.length > 0) {
					lines.push(
						createOutputLine(
							`  <span class="${API_RESPONSE_CLASS}">Features:</span> ${mod.features.map((f: string) => escapeHtml(f)).join(', ')}`,
							false,
							false,
							true
						)
					);
				}
				lines.push(
					createOutputLine(
						`  <span class="${API_RESPONSE_CLASS}">Note:</span> ${escapeHtml(mod.note)}`,
						false,
						false,
						true
					)
				);
				if (mod.downloadLinks && mod.downloadLinks.length > 0) {
					lines.push(
						createOutputLine(
							`  <span class="${API_RESPONSE_CLASS}">Downloads:</span> ${mod.downloadLinks.map((link: { url: string; label: string }) => `<a href="${escapeHtml(link.url)}" target="_blank" class="underline">${escapeHtml(link.label)}</a>`).join(', ')}`,
							false,
							false,
							true
						)
					);
				}
				lines.push(createOutputLine(' '));
			});
			lines.push(
				createOutputLine(
					`<span class="${API_RESPONSE_CLASS}">--- End of ${listName} List ---</span>`,
					false,
					false,
					true
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
