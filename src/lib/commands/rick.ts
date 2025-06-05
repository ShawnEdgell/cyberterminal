import { createOutputLine, API_RESPONSE_CLASS } from './_commandUtils';
import type { Command } from '../types';
import { createYouTubeEmbedHtml } from '../utils/videoEmbed';

const rickCommand: Command = {
	name: 'rick',
	description: 'Initiate a critical system integrity scan.',
	usage: 'rick',
	execute: async (_args: string[], _user: string, _fullCommand: string) => {
		const lines = [];

		lines.push(createOutputLine('Initiating deep-level system integrity scan...'));
		lines.push(createOutputLine('Analyzing encrypted data streams for anomalies...'));
		lines.push(
			createOutputLine(
				`<span class="${API_RESPONSE_CLASS}">[WARNING] Unexpected visual anomaly detected. Displaying decrypted stream for manual verification...</span>`,
				false,
				false,
				true
			)
		);

		lines.push(createOutputLine(createYouTubeEmbedHtml('dQw4w9WgXcQ'), false, false, true));

		lines.push(
			createOutputLine(
				'Visual anomaly analysis complete. System integrity check continuing in background...'
			)
		);
		lines.push(createOutputLine('Type "clear" to dismiss the anomaly display.'));

		return { lines };
	}
};

export default rickCommand;
