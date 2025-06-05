import { createOutputLine, API_RESPONSE_CLASS } from './_commandUtils';
import type { Command } from '../types';

const rick_EMBED_URL =
	'https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1&controls=0&showinfo=0&rel=0&modestbranding=1';

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
				`<span class="${API_RESPONSE_CLASS}">[WARNING] Unexpected visual anomaly detected. Displaying decrypted stream for manual verification...</span>`
			)
		);

		lines.push(
			createOutputLine(`
                <div class="relative w-full max-w-2xl aspect-video">
                    <iframe
                        class="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg border-2 border-theme-accent"
                        src="${rick_EMBED_URL}"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                        title="Decrypted System Anomaly"
                    ></iframe>
                </div>
        `)
		);

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
