// eslint.config.js
import prettier from 'eslint-config-prettier';
import js from '@eslint/js';
import { includeIgnoreFile } from '@eslint/compat';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js'; // Assuming this is correct and necessary

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default ts.config(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	...ts.configs.recommended, // Includes @typescript-eslint/no-unused-vars
	...svelte.configs.recommended,
	prettier,
	...svelte.configs.prettier,
	{
		languageOptions: {
			globals: { ...globals.browser, ...globals.node }
		},
		rules: {
			'no-undef': 'off', // Keep this if you need it
			// FIX: Configure the no-unused-vars rule here
			'@typescript-eslint/no-unused-vars': [
				'warn', // Can be 'error' if you want it to fail builds
				{
					argsIgnorePattern: '^_', // Ignore variables starting with _ in function arguments
					varsIgnorePattern: '^_', // Ignore local variables starting with _
					caughtErrorsIgnorePattern: '^_', // Ignore caught error variables starting with _
					ignoreRestSiblings: true // Good practice for object destructuring
				}
			]
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts', '**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
				projectService: true,
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig // Assuming this is correct
			}
		},
		rules: {
			// If you have specific Svelte rules for no-unused-vars, configure them here too
			// For example, if Svelte plugin has its own rule that overrides the TS one
			// 'svelte/no-unused-vars': [
			//   'warn',
			//   {
			//     'argsIgnorePattern': '^_',
			//     'varsIgnorePattern': '^_',
			//   }
			// ]
		}
	}
);
