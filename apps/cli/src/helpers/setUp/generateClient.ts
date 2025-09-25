import path from "node:path";
import { spinner } from "@clack/prompts";
import consola from "consola";
import fs from "fs-extra";
import pc from "picocolors";
import { $ } from "execa";
import type { ProjectConfig } from "../../types";

export async function generateClient(config: ProjectConfig) {
	const { database, projectDir } = config;
	const s = spinner();

	try {
		if (database === "postgres") {
			s.start("Generating Prisma client...");
			
			// Generate Prisma client
			await $({ cwd: projectDir })`npx prisma generate`;
			
			s.stop(pc.green("Prisma client generated successfully"));
		}
		// Add other database client generation logic here if needed
	} catch (error) {
		s.stop(pc.red("Failed to generate client"));
		if (error instanceof Error) {
			consola.error(pc.red(error.message));
		}
		throw error;
	}
}
