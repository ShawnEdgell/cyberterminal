import type { Command } from '../types';
import { createOutputLine } from './_commandUtils';
import { createYouTubeEmbedHtml } from '../utils/videoEmbed';

const youtubeCommand: Command = {
	name: 'youtube',
	description: 'Plays a YouTube video.',
	aliases: ['yt'],
	execute: (args) => {
		if (args.length === 0) {
			return {
				lines: [createOutputLine('Usage: youtube [video_id_or_url]', true)]
			};
		}

		let videoId = args[0];
		const youtubeUrlRegex =
			/(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})(?:\S+)?/;
		const match = videoId.match(youtubeUrlRegex);

		if (match && match[1]) {
			videoId = match[1];
		} else if (videoId.length !== 11) {
			return {
				lines: [createOutputLine('Invalid YouTube video ID or URL.', true)]
			};
		}

		return {
			lines: [
				createOutputLine('Playing YouTube video...', false),
				createOutputLine(createYouTubeEmbedHtml(videoId), false, false, true)
			]
		};
	}
};

export default youtubeCommand;
