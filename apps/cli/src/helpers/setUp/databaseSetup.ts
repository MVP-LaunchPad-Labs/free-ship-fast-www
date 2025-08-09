import path from "node:path";
import { spinner } from "@clack/prompts";
import consola from "consola";
import fs from "fs-extra";
import pc from "picocolors";
import type { ProjectConfig } from "../../types";
import { addPackageDependency } from "../../utils/addPackageDeps";
import { setupDbTemplates } from "../projectGeneration/templateManager";
export async function setupDatabase(config: ProjectConfig) {
	const { database , projectDir } = config;


	const s = spinner();
	
	try {
		if (database === "postgres") {
			await addPackageDependency({
				dependencies: ["@prisma/client"],
				devDependencies: ["prisma"],
				projectDir: projectDir,
			});
		} else if (database === "supabase") {
			await addPackageDependency({
				dependencies: ["@supabase/ssr"],
				devDependencies: [],
				projectDir: projectDir,
			});
		} else if (database === "mongodb") {
			await addPackageDependency({
				dependencies: ["mongoose",'mongodb'],
				devDependencies: [],
				projectDir: projectDir,
			});
		}
		await setupDbTemplates(projectDir, config);
		
	} catch (error) {
		s.stop(pc.red("Failed to set up database"));
		if (error instanceof Error) {
			consola.error(pc.red(error.message));
		}
	}
}
