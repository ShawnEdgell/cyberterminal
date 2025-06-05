// src/lib/types.ts

export interface OutputLine {
	id: number;
	html: string;
	isError?: boolean;
	isGameOutput?: boolean; // NEW: Add this property for game rendering
	isTrustedHtml?: boolean; // NEW: Add this property for trusted HTML content
}

export interface ModItem {
	badge?: string;
	title: string;
	author: string;
	workingVersion: string;
	gameVersion: string;
	keybind?: string;
	features: string[];
	note: string;
	downloadLinks: Array<{
		url: string;
		label: string;
	}>;
}

export type ApiResponse = ModItem[];

export interface Command {
	name: string;
	description: string;
	aliases?: string[];
	usage?: string;
	execute: (
		args: string[],
		user: string,
		fullCommand: string
	) =>
		| Promise<{
				lines: OutputLine[];
				navigationPath?: string;
		  }>
		| {
				lines: OutputLine[];
				navigationPath?: string;
		  };
}
