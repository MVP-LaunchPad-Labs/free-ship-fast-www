import { cancel, isCancel, select } from "@clack/prompts";
import pc from "picocolors";

export async function getEmailChoice(email?: boolean): Promise<boolean> {
	if (email !== undefined) return email;

	const response = await select<boolean>({
		message: "Include email functionality?",
		options: [
			{
				value: true,
				label: "Yes",
				hint: "Add Resend for transactional emails",
			},
			{
				value: false,
				label: "No",
				hint: "Skip email setup",
			},
		],
		initialValue: true,
	});

	if (isCancel(response)) {
		cancel(pc.red("Operation cancelled"));
		process.exit(0);
	}

	return response;
}
