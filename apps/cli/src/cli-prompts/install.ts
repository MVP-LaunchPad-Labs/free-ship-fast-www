import { cancel, confirm, isCancel } from "@clack/prompts";
import pc from "picocolors";

export async function getInstallChoice(install?: boolean): Promise<boolean> {
	if (install !== undefined) return install;

	const response = await confirm({
		message: "Install dependencies?",
		initialValue: true,
	});

	if (isCancel(response)) {
		cancel(pc.red("Operation cancelled"));
		process.exit(0);
	}

	return response;
} 