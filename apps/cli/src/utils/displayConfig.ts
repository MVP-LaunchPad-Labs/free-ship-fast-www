import pc from "picocolors";
import type { ProjectConfig } from "../types";

export function displayConfig(config: Partial<ProjectConfig>) {
	const configDisplay: string[] = [];

	if (config.projectName) {
		configDisplay.push(`${pc.blue("Project Name:")} ${config.projectName}`);
	}

	if (config.database !== undefined) {
		configDisplay.push(`${pc.blue("Database:")} ${String(config.database)}`);
	}

	if (config.auth !== undefined) {
		const authText =
			typeof config.auth === "boolean"
				? config.auth
					? "Yes"
					: "No"
				: String(config.auth);
		configDisplay.push(`${pc.blue("Authentication:")} ${authText}`);
	}

	if (config.analytics !== undefined) {
		configDisplay.push(`${pc.blue("Analytics:")} ${String(config.analytics)}`);
	}

	if (config.payment !== undefined) {
		configDisplay.push(`${pc.blue("Payment:")} ${String(config.payment)}`);
	}

	if (config.git !== undefined) {
		const gitText =
			typeof config.git === "boolean"
				? config.git
					? "Yes"
					: "No"
				: String(config.git);
		configDisplay.push(`${pc.blue("Git Init:")} ${gitText}`);
	}

	if (config.packageManager !== undefined) {
		configDisplay.push(
			`${pc.blue("Package Manager:")} ${String(config.packageManager)}`,
		);
	}

	if (config.install !== undefined) {
		const installText =
			typeof config.install === "boolean"
				? config.install
					? "Yes"
					: "No"
				: String(config.install);
		configDisplay.push(`${pc.blue("Install Dependencies:")} ${installText}`);
	}

	if (configDisplay.length === 0) {
		return pc.yellow("No configuration selected.");
	}

	return configDisplay.join("\n");
}
