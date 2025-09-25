import { spinner } from "@clack/prompts";
import consola from "consola";
import { $ } from "execa";
import pc from "picocolors";
import type { PackageManager } from "../../types";

export async function installDependencies({
	projectDir,
	packageManager,
}: {
	projectDir: string;
	packageManager: PackageManager;
}) {
	const s = spinner();

	try {
		s.start(`Running ${packageManager} install...`);

		await $({
			cwd: projectDir,
			stderr: "inherit",
		})`${packageManager} install`;

		s.stop("Dependencies installed successfully");
	} catch (error) {
		s.stop(pc.red("Failed to install dependencies"));
		if (error instanceof Error) {
			consola.error(pc.red(`Installation error: ${error.message}`));
		}
	}
}
