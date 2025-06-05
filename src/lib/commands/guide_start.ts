// src/lib/commands/guide_start.ts
import { createOutputLine } from './_commandUtils';
import type { Command } from '../types';

// Re-using existing theme classes for specific guide roles
const GUIDE_MAIN_HEADER_CLASS = 'text-theme-accent'; // Orange
const GUIDE_STEP_CLASS = 'text-theme-prompt'; // Bright Green
// NEW: Class for main instruction body text (will be white)
const GUIDE_INSTRUCTION_CLASS = 'text-theme-alt-text';
const GUIDE_HIGHLIGHT_CLASS = 'text-theme-command'; // Darker Green for paths, and tips
const GUIDE_TIP_OK_CLASS = 'text-theme-prompt'; // For "OK" status
const GUIDE_TIP_NOT_CLASS = 'text-theme-error'; // For "NOT" status

const guideStartCommand: Command = {
	name: 'guide_start',
	description: 'Display guide: Getting Started with Modding.',
	execute: async () => {
		const lines = [];

		lines.push(
			createOutputLine(
				`<span class="${GUIDE_MAIN_HEADER_CLASS}">--- Getting Started with Skater XL Modding ---</span>`,
				false,
				false,
				true
			)
		);
		lines.push(
			createOutputLine(
				`<span class="${GUIDE_INSTRUCTION_CLASS}">Learn how to install script mods for Skater XL step by step using UnityModManager.</span>`,
				false,
				false,
				true
			)
		);
		lines.push(createOutputLine(' '));

		lines.push(
			createOutputLine(
				`<span class="${GUIDE_STEP_CLASS}">Step 1: Check Your Game Version</span>`,
				false,
				false,
				true
			)
		);
		lines.push(
			createOutputLine(
				`<span class="${GUIDE_INSTRUCTION_CLASS}">  Ensure you know your Skater XL version before moving on, as mod compatibility varies by version.</span>`,
				false,
				false,
				true
			)
		);
		lines.push(
			createOutputLine(
				`<span class="${GUIDE_INSTRUCTION_CLASS}">  - Launch Skater XL</span>`,
				false,
				false,
				true
			)
		);
		lines.push(
			createOutputLine(
				`<span class="${GUIDE_INSTRUCTION_CLASS}">  - Check your game version in the bottom left corner</span>`,
				false,
				false,
				true
			)
		);
		lines.push(createOutputLine(' '));

		lines.push(
			createOutputLine(
				`<span class="${GUIDE_STEP_CLASS}">Step 2: Changing Game Versions (Optional)</span>`
			)
		);
		lines.push(
			createOutputLine(
				`<span class="${GUIDE_INSTRUCTION_CLASS}">  Skater XL 1.2.2.8 (Alpha) and 1.2.10.4 (None/Public) are the most popular versions for modding.</span>`,
				false,
				false,
				true
			)
		);
		lines.push(
			createOutputLine(
				`<span class="${GUIDE_INSTRUCTION_CLASS}">  - Right click Skater XL in Steam</span>`,
				false,
				false,
				true
			)
		);
		lines.push(
			createOutputLine(
				`<span class="${GUIDE_INSTRUCTION_CLASS}">  - Select Properties > Betas</span>`,
				false,
				false,
				true
			)
		);
		lines.push(
			createOutputLine(
				`<span class="${GUIDE_INSTRUCTION_CLASS}">  - Choose your desired version from the dropdown menu</span>`,
				false,
				false,
				true
			)
		);
		lines.push(createOutputLine(' '));

		lines.push(
			createOutputLine(
				`<span class="${GUIDE_STEP_CLASS}">Step 3: Download UnityModManager</span>`,
				false,
				false,
				true
			)
		);
		lines.push(
			createOutputLine(
				`<span class="${GUIDE_INSTRUCTION_CLASS}">  Download the UnityModManager application to start installing mods.</span>`,
				false,
				false,
				true
			)
		);
		lines.push(
			createOutputLine(
				`<span class="${GUIDE_INSTRUCTION_CLASS}">  - Visit the Nexus Mods website</span>`,
				false,
				false,
				true
			)
		);
		lines.push(
			createOutputLine(
				`<span class="${GUIDE_INSTRUCTION_CLASS}">  - Create an account or log in</span>`,
				false,
				false,
				true
			)
		);
		lines.push(
			createOutputLine(
				`<span class="${GUIDE_INSTRUCTION_CLASS}">  - Download the latest version of UnityModManager</span>`,
				false,
				false,
				true
			)
		);
		lines.push(
			createOutputLine(
				`  <a href="https://www.nexusmods.com/site/mods/21" target="_blank" class="underline ${GUIDE_INSTRUCTION_CLASS}">UnityModManager on Nexus Mods</a>`,
				false,
				false,
				true
			)
		);
		lines.push(createOutputLine(' '));

		lines.push(
			createOutputLine(
				`<span class="${GUIDE_STEP_CLASS}">Step 4: UnityModManager Setup</span>`,
				false,
				false,
				true
			)
		);
		lines.push(
			createOutputLine(
				`<span class="${GUIDE_INSTRUCTION_CLASS}">  Follow these steps to set up UnityModManager correctly for Skater XL.</span>`,
				false,
				false,
				true
			)
		);
		lines.push(
			createOutputLine(
				`<span class="${GUIDE_INSTRUCTION_CLASS}">  - Unzip and run UnityModManager.exe</span>`,
				false,
				false,
				true
			)
		);
		lines.push(
			createOutputLine(
				`  <span class="${GUIDE_INSTRUCTION_CLASS}">- Select "Skater XL v1.2.2.8" for Alpha version; otherwise, choose "Skater XL"</span>`,
				false,
				false,
				true
			)
		);
		lines.push(
			createOutputLine(
				`  <span class="${GUIDE_INSTRUCTION_CLASS}">- Set the game path to: <span class="${GUIDE_HIGHLIGHT_CLASS}">C:/ProgramFiles(x86)/Steam/steamapps/common/SkaterXL</span></span>`,
				false,
				false,
				true
			)
		);
		lines.push(
			createOutputLine(
				`<span class="${GUIDE_INSTRUCTION_CLASS}">  - Click Install/Update</span>`,
				false,
				false,
				true
			)
		);
		lines.push(createOutputLine(' '));

		lines.push(
			createOutputLine(
				`<span class="${GUIDE_STEP_CLASS}">Step 5: Install Mods</span>`,
				false,
				false,
				true
			)
		);
		lines.push(
			createOutputLine(
				`<span class="${GUIDE_INSTRUCTION_CLASS}">  Once UnityModManager is installed, you can start adding mods.</span>`,
				false,
				false,
				true
			)
		);
		lines.push(
			createOutputLine(
				`<span class="${GUIDE_INSTRUCTION_CLASS}">  - Select the "Mods" tab in UnityModManager</span>`,
				false,
				false,
				true
			)
		);
		lines.push(
			createOutputLine(
				`<span class="${GUIDE_INSTRUCTION_CLASS}">  - Download your desired mods from the Mods page</span>`,
				false,
				false,
				true
			)
		);
		lines.push(
			createOutputLine(
				`<span class="${GUIDE_INSTRUCTION_CLASS}">  - Drag and drop the downloaded .zip files into the UnityModManager application</span>`,
				false,
				false,
				true
			)
		);
		lines.push(
			createOutputLine(
				`  <span class="${GUIDE_HIGHLIGHT_CLASS}">Tip:</span> <span class="${GUIDE_INSTRUCTION_CLASS}">Status = "<span class="${GUIDE_TIP_OK_CLASS}">OK</span>" means the mod is installed. If the status is blank, your mod is <span class="${GUIDE_TIP_NOT_CLASS}">NOT</span> installed. You can right-click each mod in your list to manually install/uninstall at any time.</span>`,
				false,
				false,
				true
			)
		);
		lines.push(createOutputLine(' '));

		lines.push(
			createOutputLine(
				`<span class="${GUIDE_STEP_CLASS}">Step 6: Launch Skater XL!</span>`,
				false,
				false,
				true
			)
		);
		lines.push(
			createOutputLine(
				`<span class="${GUIDE_INSTRUCTION_CLASS}">  Upon launch, you should notice the Skater XL Mod Menu. If you do not see this menu, please refer back to Step 4.</span>`,
				false,
				false,
				true
			)
		);
		lines.push(
			createOutputLine(
				`<span class="${GUIDE_INSTRUCTION_CLASS}">  Enjoy your mods!</span>`,
				false,
				false,
				true
			)
		);

		return { lines };
	}
};

export default guideStartCommand;
