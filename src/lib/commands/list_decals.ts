// src/lib/commands/list_decals.ts
import { createOutputLine, API_RESPONSE_CLASS } from './_commandUtils';
import { fetchModsList } from '../api';
import type { ModItem, Command } from '../types';
import { escapeHtml } from '../utils'; // Import escapeHtml from global utils

const listDecalsCommand: Command = {
	name: 'list_decals',
	description: 'List SkaterXL decals.',
	execute: async () => {
		const lines = [];
		const modListId = 'decals'; // Changed from '1228' or '12104' to 'decals'
		const listName = 'Decals';
		lines.push(createOutputLine(`Fetching ${listName} list...`));

		const apiResult = await fetchModsList(modListId);

		if (apiResult && Array.isArray(apiResult) && apiResult.length > 0) {
			lines.push(
				createOutputLine(
					`<span class="${API_RESPONSE_CLASS}">--- Found ${apiResult.length} ${listName} ---</span>`
				)
			);
			apiResult.forEach((item: ModItem, index: number) => {
				lines.push(
					createOutputLine(`<span class="${API_RESPONSE_CLASS}">Item ${index + 1}:</span>`)
				);
				lines.push(
					createOutputLine(
						`  <span class="${API_RESPONSE_CLASS}">Title:</span> ${escapeHtml(item.title)}`
					)
				);
				lines.push(
					createOutputLine(
						`  <span class="${API_RESPONSE_CLASS}">Author:</span> ${escapeHtml(item.author)}`
					)
				);
				lines.push(
					createOutputLine(
						`  <span class="${API_RESPONSE_CLASS}">Version:</span> ${escapeHtml(item.workingVersion)}`
					)
				);
				if (item.keybind && item.keybind !== 'None') {
					lines.push(
						createOutputLine(
							`  <span class="${API_RESPONSE_CLASS}">Keybind:</span> ${escapeHtml(item.keybind)}`
						)
					);
				}
				if (item.features && item.features.length > 0) {
					lines.push(
						createOutputLine(
							`  <span class="${API_RESPONSE_CLASS}">Features:</span> ${item.features.map((f) => escapeHtml(f)).join(', ')}`
						)
					);
				}
				lines.push(
					createOutputLine(
						`  <span class="${API_RESPONSE_CLASS}">Note:</span> ${escapeHtml(item.note)}`
					)
				);
				if (item.downloadLinks && item.downloadLinks.length > 0) {
					lines.push(
						createOutputLine(
							`  <span class="${API_RESPONSE_CLASS}">Downloads:</span> ${item.downloadLinks.map((link) => `<a href="${escapeHtml(link.url)}" target="_blank" class="underline">${escapeHtml(link.label)}</a>`).join(', ')}`
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
			lines.push(createOutputLine(`No ${listName.toLowerCase()} found.`, true));
		} else {
			lines.push(
				createOutputLine(
					`Error fetching data for ${listName.toLowerCase()}. Please check network connection.`,
					true
				)
			);
		}
		return { lines };
	}
};

export default listDecalsCommand;
