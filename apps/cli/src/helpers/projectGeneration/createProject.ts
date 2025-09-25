import { cancel, log } from "@clack/prompts";
import fs from "fs-extra";
import pc from "picocolors";
import type { ProjectConfig } from "../../types";
import { copyBaseTemplate, setupAnalyticsTemplate, setupAuthTemplate, setupEmailTemplate, setupPaymentTemplate } from "./templateManager";
import { setupDatabase } from "../setUp/databaseSetup";
import { setupEnvironmentVariables } from "./envSetup";
import { updatePackageConfigurations } from "./projectConfig";
import { createReadme } from "./createReadme";
import { installDependencies } from "./installDependencies";
import { initializeGit } from "./git";
import { displayPostInstallInstructions } from "./postInstallation";
import { setupPageAndComponentsTemplate } from "./templateManager";
import { generateClient } from "../setUp/generateClient";

export async function createProject(options: ProjectConfig) {
	const projectDir = options.projectDir;
	try {
		await fs.ensureDir(projectDir);

		await copyBaseTemplate(projectDir, options);
			await setupDatabase(options);
			await setupAuthTemplate(projectDir, options);


	
		if(options.analytics) {
			await setupAnalyticsTemplate(projectDir, options);
		}
		if(options.payment) {
			await setupPaymentTemplate(projectDir, options);
		}
		if(options.email) {
			await setupEmailTemplate(projectDir, options);
		}
		await setupPageAndComponentsTemplate(projectDir, options);
		
		await setupEnvironmentVariables(options);
		await updatePackageConfigurations(projectDir, options);
		await createReadme(projectDir, options);

		log.success("Project template successfully scaffolded!");

		if (options.install) {
			await installDependencies({
				projectDir,
				packageManager: options.packageManager,
			});
		}

		await initializeGit(projectDir, options.git);
		await generateClient(options);
		await displayPostInstallInstructions({
			...options,
			depsInstalled: options.install,
		});

		return projectDir;
	} catch (error) {
		if (error instanceof Error) {
			cancel(pc.red(`Error during project creation: ${error.message}`));
			console.error(error.stack);
			process.exit(1);
		} else {
			cancel(pc.red(`An unexpected error occurred: ${String(error)}`));
			console.error(error);
			process.exit(1);
		}
	}
}
