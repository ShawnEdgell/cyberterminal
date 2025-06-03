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

const API_BASE_URL = 'https://skatebit-api.vercel.app/api/mods/';

export async function fetchModsList(modListId: string): Promise<ApiResponse | null> {
	try {
		const response = await fetch(`${API_BASE_URL}${modListId}`);
		if (!response.ok) {
			console.error(`API Error: ${response.status} ${response.statusText}`);
			return null;
		}
		const data: ApiResponse = await response.json();
		return data;
	} catch (error) {
		console.error('Failed to fetch mod data:', error);
		return null;
	}
}
