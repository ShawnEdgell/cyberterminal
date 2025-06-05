import type { Command } from '../types';
import { createOutputLine } from './_commandUtils';

const youtubeCommand: Command = {
	name: 'youtube',
	description: 'Plays a YouTube video.',
	aliases: ['yt'],
	execute: (args) => {
		if (args.length === 0) {
			return {
				lines: [createOutputLine('Usage: youtube [video_id]', true)]
			};
		}

		const videoId = args[0];
		const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=0&showinfo=0&rel=0&modestbranding=1`;

		return {
			lines: [
				createOutputLine('Playing YouTube video...', false),
				createOutputLine(`Opening: ${embedUrl}`, false)
			],
			navigationPath: embedUrl
		};
	}
};

export default youtubeCommand;
