// src/lib/utils.ts

export function escapeHtml(unsafe: string): string {
	return unsafe
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

export function formatRawOutput(
	text: string,
	isError: boolean = false
): { id: number; html: string; isError?: boolean } {
	return {
		id: -1,
		html: text,
		isError
	};
}

export function getRandomInt(min: number, max: number): number {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomChar(): string {
	const chars =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
	return chars.charAt(getRandomInt(0, chars.length - 1));
}

export function generateRandomString(length: number): string {
	let result = '';
	for (let i = 0; i < length; i++) {
		result += getRandomChar();
	}
	return result;
}

export function generateRandomHex(length: number): string {
	let result = '';
	const hexChars = '0123456789ABCDEF';
	for (let i = 0; i < length; i++) {
		result += hexChars.charAt(getRandomInt(0, hexChars.length - 1));
	}
	return result;
}

export function generateRandomIP(): string {
	return `${getRandomInt(0, 255)}.${getRandomInt(0, 255)}.${getRandomInt(0, 255)}.${getRandomInt(0, 255)}`;
}

export function generateRandomFilePath(): string {
	const segments = ['/usr', '/var', '/opt', '/home', '/etc', '/dev', '/tmp', '/bin'];
	const subSegments = ['log', 'www', 'data', 'config', 'lib', 'cache', 'local', 'share'];
	const files = [
		'index.html',
		'server.js',
		'main.py',
		'config.json',
		'access.log',
		'error.log',
		'temp.dat',
		'program.exe'
	];
	return `${segments[getRandomInt(0, segments.length - 1)]}/${subSegments[getRandomInt(0, subSegments.length - 1)]}/${files[getRandomInt(0, files.length - 1)]}`;
}

export function generateRandomLogLine(): string {
	const prefixes = ['[INFO]', '[WARN]', '[ERROR]', '[DEBUG]', '[CRITICAL]'];
	const messages = [
		'Processing data stream...',
		'Establishing secure connection...',
		'Packet loss detected.',
		'Authenticating user...',
		'Access denied.',
		'Compiling module...',
		'Downloading updates...',
		'Initializing subsystem...',
		'Memory allocation failed.',
		'Port scan detected from',
		'Attempting brute force on',
		'Encrypting payload...',
		'Decryption failed.',
		'System heartbeat nominal.',
		'Resource utilization high.'
	];
	return `${prefixes[getRandomInt(0, prefixes.length - 1)]} ${new Date().toLocaleTimeString()} - ${messages[getRandomInt(0, messages.length - 1)]}`;
}
