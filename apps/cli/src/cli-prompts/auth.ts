import { cancel, isCancel, select } from "@clack/prompts";
import pc from "picocolors";
import type { Auth, Database } from "../types";

export async function getAuthChoice(
	auth?: Auth,
	database?: Database,
): Promise<Auth> {
	if (auth !== undefined) return auth;

	const authOptions: Array<{
		value: Auth;
		label: string;
		hint: string;
	}> = [
		{
			value: "betterAuth",
			label: "Better Auth",
			hint: "modern auth solution (works with postgres, mongodb)",
		},
		{
			value: "none",
			label: "None",
			hint: "no authentication setup",
		},
	];

	// Add supabaseAuth only if database is supabase
	if (database === "supabase") {
		authOptions.splice(1, 0, {
			value: "supabaseAuth",
			label: "Supabase Auth",
			hint: "built-in Supabase authentication (requires Supabase database)",
		});
	}

	const response = await select<Auth>({
		message: "Select authentication",
		options: authOptions,
		initialValue: database === "supabase" ? "supabaseAuth" : "betterAuth",
	});

	if (isCancel(response)) {
		cancel(pc.red("Operation cancelled"));
		process.exit(0);
	}

	return response;
} 