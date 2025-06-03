import { writable } from 'svelte/store';
import { browser } from '$app/environment';

let initialUserValue = 'GUEST';

if (browser) {
	try {
		initialUserValue = localStorage.getItem('cliUsername') || 'GUEST';
	} catch (e) {
		console.error('Failed to read from localStorage:', e);
		initialUserValue = 'GUEST';
	}
}

export const currentUser = writable<string>(initialUserValue);

currentUser.subscribe((value) => {
	if (browser) {
		try {
			localStorage.setItem('cliUsername', value);
		} catch (e) {
			console.error('Failed to write to localStorage:', e);
		}
	}
});

export function setUsernameInStore(newUsername: string) {
	currentUser.set(newUsername);
}

type TerminalTheme = 'default' | 'error';

let initialThemeValue: TerminalTheme = 'default';
if (browser) {
	try {
		initialThemeValue = (localStorage.getItem('cliTheme') as TerminalTheme) || 'default';
	} catch (e) {
		console.error('Failed to read theme from localStorage:', e);
		initialThemeValue = 'default';
	}
}

export const terminalTheme = writable<TerminalTheme>(initialThemeValue);

terminalTheme.subscribe((value) => {
	if (browser) {
		try {
			localStorage.setItem('cliTheme', value);
			document.body.className = `theme-${value}`;
		} catch (e) {
			console.error('Failed to write theme to localStorage:', e);
		}
	}
});

export interface HackerScreenState {
	active: boolean;
	durationMs: number;
	intervalMs: number;
}

export const hackerScreenState = writable<HackerScreenState>({
	active: false,
	durationMs: 0,
	intervalMs: 0
});
