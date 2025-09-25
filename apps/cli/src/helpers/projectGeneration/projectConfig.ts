import path from "node:path";
import { log } from "@clack/prompts";
import { execa } from "execa";
import fs from "fs-extra";
import type { ProjectConfig } from "../../types";

export async function updatePackageConfigurations(
	projectDir: string,
	options: ProjectConfig,
) {
	await updateRootPackageJson(projectDir, options);
}

async function updateRootPackageJson(
	projectDir: string,
	options: ProjectConfig,
) {
	const rootPackageJsonPath = path.join(projectDir, "package.json");
	if (!(await fs.pathExists(rootPackageJsonPath))) return;

	const packageJson = await fs.readJson(rootPackageJsonPath);
	packageJson.name = options.projectName;

	if (!packageJson.scripts) {
		packageJson.scripts = {};
	}
	const scripts = packageJson.scripts;

	// Basic development scripts
	scripts.dev = "next dev";
	scripts.build = "next build";
	scripts.start = "next start";
	scripts.lint = "next lint";
	scripts["type-check"] = "tsc --noEmit";

	// Add database scripts if database is configured
	if (options.database === "postgres" || options.database === "mongodb") {
		scripts["db:studio"] = "prisma studio";
		scripts["db:push"] = "prisma db push";
		scripts["db:generate"] = "prisma generate";
		scripts["db:migrate"] = "prisma migrate dev";
		scripts["db:seed"] = "prisma db seed";
	} else if (options.database === "supabase") {
		// Supabase doesn't use local Prisma commands
		scripts["db:types"] = "supabase gen types typescript --project-id YOUR_PROJECT_ID > types/supabase.ts";
	}

	try {
		const { stdout } = await execa(options.packageManager, ["-v"], {
			cwd: projectDir,
		});
		packageJson.packageManager = `${options.packageManager}@${stdout.trim()}`;
	} catch (_e) {
		log.warn(`Could not determine ${options.packageManager} version.`);
	}

	// Remove workspaces since it's not a monorepo
	if (packageJson.workspaces) {
		delete packageJson.workspaces;
	}

	await fs.writeJson(rootPackageJsonPath, packageJson, { spaces: 2 });
}
