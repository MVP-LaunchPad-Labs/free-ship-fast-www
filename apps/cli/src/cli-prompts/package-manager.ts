import { cancel, isCancel, select } from "@clack/prompts";
import pc from "picocolors";
import type { PackageManager } from "../types";

export async function getPackageManagerChoice(
	packageManager?: PackageManager,
): Promise<PackageManager> {
	if (packageManager !== undefined) return packageManager;

	const response = await select<PackageManager>({
		message: "Choose package manager",
		options: [
			{ value: "npm", label: "npm", hint: "Node Package Manager" },
			{
				value: "pnpm",
				label: "pnpm",
				hint: "Fast, disk space efficient package manager",
			},
			{
				value: "bun",
				label: "bun",
				hint: "All-in-one JavaScript runtime & toolkit",
			},
		],
		initialValue: "npm",
	});

	if (isCancel(response)) {
		cancel(pc.red("Operation cancelled"));
		process.exit(0);
	}

	return response;
} 