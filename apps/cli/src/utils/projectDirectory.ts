import { consola } from 'consola';
import path from 'node:path';
import { cancel, isCancel, log, select, spinner } from '@clack/prompts';
import fs from 'fs-extra';
import pc from 'picocolors';
import { getProjectName } from '../cli-prompts/projectName';
import { directoryExistsAndNotEmpty } from './fs';
export async function handleDirectoryConflict(
	currentPathInput: string
): Promise<{
	finalPathInput: string;
	shouldClearDirectory: boolean;
}> {
	while (true) {
		const dirIsNotEmpty = directoryExistsAndNotEmpty(currentPathInput);

		if (!dirIsNotEmpty) {
			return { finalPathInput: currentPathInput, shouldClearDirectory: false };
		}

		log.warn(
			`Directory "${pc.yellow(
				currentPathInput
			)}" already exists and is not empty.`
		);

		const action = await select<'overwrite' | 'merge' | 'rename' | 'cancel'>({
			message: 'What would you like to do?',
			options: [
				{
					value: 'overwrite',
					label: 'Overwrite',
					hint: 'Empty the directory and create the project',
				},
				{
					value: 'merge',
					label: 'Merge',
					hint: 'Create project files inside, potentially overwriting conflicts',
				},
				{
					value: 'rename',
					label: 'Choose a different name/path',
					hint: 'Keep the existing directory and create a new one',
				},
				{ value: 'cancel', label: 'Cancel', hint: 'Abort the process' },
			],
			initialValue: 'rename',
		});

		if (isCancel(action)) {
			cancel(pc.red('Operation cancelled.'));
			process.exit(0);
		}

		switch (action) {
			case 'overwrite':
				return { finalPathInput: currentPathInput, shouldClearDirectory: true };
			case 'merge':
				log.info(
					`Proceeding into existing directory "${pc.yellow(
						currentPathInput
					)}". Files may be overwritten.`
				);
				return {
					finalPathInput: currentPathInput,
					shouldClearDirectory: false,
				};
			case 'rename': {
				log.info('Please choose a different project name or path.');
				const newPathInput = await getProjectName(undefined);
				return await handleDirectoryConflict(newPathInput);
			}
			case 'cancel':
				cancel(pc.red('Operation cancelled.'));
				process.exit(0);
		}
	}
}

export async function setupProjectDirectory(
	finalPathInput: string,
	shouldClearDirectory: boolean
): Promise<{ finalResolvedPath: string; finalBaseName: string }> {
	const finalResolvedPath = path.resolve(process.cwd(), finalPathInput);
	const finalBaseName = path.basename(finalResolvedPath);

	if (shouldClearDirectory) {
		const s = spinner();
		s.start(`Clearing directory "${finalResolvedPath}"...`);
		try {
			await fs.emptyDir(finalResolvedPath);
			s.stop(`Directory "${finalResolvedPath}" cleared.`);
		} catch (error) {
			s.stop(pc.red(`Failed to clear directory "${finalResolvedPath}".`));
			consola.error(error);
			process.exit(1);
		}
	} else {
		await fs.ensureDir(finalResolvedPath);
	}

	return { finalResolvedPath, finalBaseName };
}
