import { cancel, isCancel, select } from "@clack/prompts";
import pc from "picocolors";
import type { Database } from "../types";

export async function getDatabaseChoice(
	database?: Database,
): Promise<Database> {
	if (database !== undefined) return database;

	const databaseOptions: Array<{
		value: Database;
		label: string;
		hint: string;
	}> = [
		{
			value: "postgres",
			label: "PostgreSQL",
			hint: "powerful, open source object-relational database system",
		},
		{
			value: "supabase",
			label: "Supabase",
			hint: "open source Firebase alternative with built-in auth",
		},
		{
			value: "mongodb",
			label: "MongoDB",
			hint: "open-source NoSQL database that stores data in JSON-like documents",
		},
	];

	const response = await select<Database>({
		message: "Select database",
		options: databaseOptions,
		initialValue: "postgres",
	});

	if (isCancel(response)) {
		cancel(pc.red("Operation cancelled"));
		process.exit(0);
	}

	return response;
} 