import { cancel, isCancel, select } from "@clack/prompts";
import pc from "picocolors";
import type { Analytics } from "../types";

export async function getAnalyticsChoice(
	analytics?: Analytics,
): Promise<Analytics> {
	if (analytics !== undefined) return analytics;

	const analyticsOptions: Array<{
		value: Analytics;
		label: string;
		hint: string;
	}> = [
		{
			value: "none",
			label: "None",
			hint: "no analytics setup",
		},
		{
			value: "posthog",
			label: "PostHog",
			hint: "open-source product analytics platform",
		},
		{
			value: "umami",
			label: "Umami",
			hint: "simple, fast, privacy-focused analytics",
		},
	];

	const response = await select<Analytics>({
		message: "Select analytics",
		options: analyticsOptions,
		initialValue: "none",
	});

	if (isCancel(response)) {
		cancel(pc.red("Operation cancelled"));
		process.exit(0);
	}

	return response;
} 