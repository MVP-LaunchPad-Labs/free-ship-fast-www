import path from 'node:path';
import { cancel, intro, log, outro } from '@clack/prompts';
import pc from 'picocolors';
import { DEFAULT_CONFIG } from '../../constants';
import type {CreateInput, ProjectConfig } from '../../types';
import { displayConfig } from '../../utils/displayConfig';
import {
	handleDirectoryConflict,
	setupProjectDirectory,
} from '../../utils/projectDirectory';
import { getProvidedFlags, processAndValidateFlags } from '../../validation';
import { createProject } from './createProject';
import { renderTitle } from '../../utils/renderTitle';
import { directoryExistsAndNotEmpty } from '../../utils/fs';
import { getProjectName } from '../../cli-prompts/projectName';
import { gatherConfig } from '../../cli-prompts/configPrompts';

export async function createProjectHandler(
	input: CreateInput 
) {
	const startTime = Date.now();

	try {
		renderTitle();
		intro(pc.blue('Creating a new free ship fast SaaS'));

		let currentPathInput: string;
		if (input.yes && input.projectName) {
			currentPathInput = input.projectName;
		} else if (input.yes) {
			let defaultName = DEFAULT_CONFIG.relativePath;
			let counter = 1;
			while (
				directoryExistsAndNotEmpty(defaultName)
			) {
				defaultName = `${DEFAULT_CONFIG.projectName}-${counter}`;
				counter++;
			}
			currentPathInput = defaultName;
		} else {
			currentPathInput = await getProjectName(input.projectName);
		}

		const { finalPathInput, shouldClearDirectory } =
			await handleDirectoryConflict(currentPathInput);

		const { finalResolvedPath, finalBaseName } = await setupProjectDirectory(
			finalPathInput,
			shouldClearDirectory
		);

		const cliInput = {
			...input,
			projectDirectory: input.projectName || DEFAULT_CONFIG.projectName,
		};

		const providedFlags = getProvidedFlags(cliInput);
		const flagConfig = processAndValidateFlags(
			cliInput,
			providedFlags,
			finalBaseName
		);
		const { projectName: _projectNameFromFlags, ...otherFlags } = flagConfig;

		if (!input.yes && Object.keys(otherFlags).length > 0) {
			log.info(pc.yellow('Using these pre-selected options:'));
			log.message(displayConfig(otherFlags));
			log.message('');
		}

		let config: ProjectConfig;
		if (input.yes) {
			config = {
				...DEFAULT_CONFIG,
				...flagConfig,
				projectName: finalBaseName,
				projectDir: finalResolvedPath,
				relativePath: finalPathInput,
			};

		
			log.info(
				pc.yellow('Using default/flag options (config prompts skipped):')
			);
			log.message(displayConfig(config));
			log.message('');
		} else {
			config = await gatherConfig(
				flagConfig,
				finalBaseName,
				finalResolvedPath,
				finalPathInput
			);
		}

		await createProject(config);

		// await trackProjectCreation(config);

		const elapsedTimeInSeconds = ((Date.now() - startTime) / 1000).toFixed(2);
		outro(
			pc.magenta(
				`Project created successfully in ${pc.bold(
					elapsedTimeInSeconds
				)} seconds!`
			)
		);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}
