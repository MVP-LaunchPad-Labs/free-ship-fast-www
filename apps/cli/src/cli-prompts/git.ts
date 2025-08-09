import { cancel, confirm, isCancel } from "@clack/prompts";
import pc from "picocolors";

export async function getGitChoice(git?: boolean): Promise<boolean> {
	if (git !== undefined) return git;

	const response = await confirm({
		message: "Initialize git repository?",
		initialValue: true,
	});

	if (isCancel(response)) {
		cancel(pc.red("Operation cancelled"));
		process.exit(0);
	}

	return response;
} 