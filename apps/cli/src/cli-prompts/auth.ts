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
			value: "none",
			label: "None",
			hint: "no authentication setup",
		},
	];

	// Add betterAuth for postgres and mongodb
	if (database === "postgres" || database === "mongodb") {
		authOptions.unshift({
			value: "betterAuth",
			label: "Better Auth",
			hint: "modern auth solution (works with postgres, mongodb)",
		});
	}

	// Add supabaseAuth only if database is supabase
	if (database === "supabase") {
		authOptions.unshift({
			value: "supabaseAuth",
			label: "Supabase Auth",
			hint: "built-in Supabase authentication (requires Supabase database)",
		});
	}

	const response = await select<Auth>({
		message: "Select authentication",
		options: authOptions,
		initialValue: database === "supabase" ? "supabaseAuth" : 
					 (database === "postgres" || database === "mongodb") ? "betterAuth" : "none",
	});

	if (isCancel(response)) {
		cancel(pc.red("Operation cancelled"));
		process.exit(0);
	}

	return response;
} 