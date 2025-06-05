export function createYouTubeEmbedHtml(videoId: string): string {
	const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&controls=0&showinfo=0&rel=0&modestbranding=1`;
	return `
        <div class="relative w-full max-w-2xl aspect-video">
            <iframe
                class="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg border-2 border-theme-accent"
                src="${embedUrl}"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                title="YouTube Video Embed"
            ></iframe>
        </div>
    `;
}
