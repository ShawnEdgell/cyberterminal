import { type ApiResponse } from './types';

const API_BASE_URL = 'https://skatebit-api.vercel.app/api/mods/';

export async function fetchModsList(modListId: string): Promise<ApiResponse | null> {
	try {
		const response = await fetch(`${API_BASE_URL}${modListId}`);
		if (!response.ok) {
			console.error(`API Error for ${modListId}: ${response.status} ${response.statusText}`);
			return null;
		}
		const data: ApiResponse = await response.json();
		return data;
	} catch (error) {
		console.error(`Failed to fetch mod data for ${modListId}:`, error);
		return null;
	}
}
