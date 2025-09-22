import path from "node:path";
import fs from "fs-extra";
import type { ProjectConfig } from "../../types";

export interface EnvVariable {
	key: string;
	value: string | null | undefined;
	condition: boolean;
}

function generateAuthSecret(): string {
	return require("crypto").randomBytes(32).toString("hex");
}

export async function addEnvVariablesToFile(
	filePath: string,
	variables: EnvVariable[],
) {
	await fs.ensureDir(path.dirname(filePath));

	let envContent = "";
	if (await fs.pathExists(filePath)) {
		envContent = await fs.readFile(filePath, "utf8");
	}

	let modified = false;
	let contentToAdd = "";
	const exampleVariables: string[] = [];

	for (const { key, value, condition } of variables) {
		if (condition) {
			const regex = new RegExp(`^${key}=.*$`, "m");
			const valueToWrite = value ?? "";
			exampleVariables.push(`${key}=`);

			if (regex.test(envContent)) {
				const existingMatch = envContent.match(regex);
				if (existingMatch && existingMatch[0] !== `${key}=${valueToWrite}`) {
					envContent = envContent.replace(regex, `${key}=${valueToWrite}`);
					modified = true;
				}
			} else {
				contentToAdd += `${key}=${valueToWrite}\n`;
				modified = true;
			}
		}
	}

	if (contentToAdd) {
		if (envContent.length > 0 && !envContent.endsWith("\n")) {
			envContent += "\n";
		}
		envContent += contentToAdd;
	}

	if (modified) {
		await fs.writeFile(filePath, envContent.trimEnd());
	}

	const exampleFilePath = filePath.replace(/\.env$/, ".env.example");
	let exampleEnvContent = "";
	if (await fs.pathExists(exampleFilePath)) {
		exampleEnvContent = await fs.readFile(exampleFilePath, "utf8");
	}

	let exampleModified = false;
	let exampleContentToAdd = "";

	for (const exampleVar of exampleVariables) {
		const key = exampleVar.split("=")[0];
		const regex = new RegExp(`^${key}=.*$`, "m");
		if (!regex.test(exampleEnvContent)) {
			exampleContentToAdd += `${exampleVar}\n`;
			exampleModified = true;
		}
	}

	if (exampleContentToAdd) {
		if (exampleEnvContent.length > 0 && !exampleEnvContent.endsWith("\n")) {
			exampleEnvContent += "\n";
		}
		exampleEnvContent += exampleContentToAdd;
	}

	if (exampleModified || !(await fs.pathExists(exampleFilePath))) {
		await fs.writeFile(exampleFilePath, exampleEnvContent.trimEnd());
	}
}

export async function setupEnvironmentVariables(config: ProjectConfig) {
	const { database, auth, payment, email, projectDir } = config;

	const envPath = path.join(projectDir, ".env");

	let databaseUrl: string | null = null;
	switch (database) {
		case "postgres":
			databaseUrl = "postgresql://user:password@host:5432/database";
			break;
		case "mongodb":
			databaseUrl = "mongodb+srv://user:password@cluster.mongodb.net/database";
			break;
		case "supabase":
			// Supabase uses its own connection via client, no DATABASE_URL needed
			databaseUrl = null;
			break;
	}

	const envVars: EnvVariable[] = [
		// App URLs
		{
			key: "NEXT_PUBLIC_APP_URL",
			value: "http://localhost:3000",
			condition: true,
		},
		{
			key: "SITE_URL",
			value: "http://localhost:3000",
			condition: true,
		},
		// Better Auth
		{
			key: "BETTER_AUTH_SECRET",
			value: generateAuthSecret(),
			condition: auth === "betterAuth",
		},
		{
			key: "BETTER_AUTH_URL",
			value: "http://localhost:3000",
			condition: auth === "betterAuth",
		},
		{
			key: "NEXT_PUBLIC_BETTER_AUTH_URL",
			value: "http://localhost:3000",
			condition: auth === "betterAuth",
		},
		// Google OAuth
		{
			key: "GOOGLE_CLIENT_ID",
			value: "your-google-client-id",
			condition: auth === "betterAuth",
		},
		{
			key: "GOOGLE_CLIENT_SECRET",
			value: "your-google-client-secret",
			condition: auth === "betterAuth",
		},
		// Database
		{
			key: "DATABASE_URL",
			value: databaseUrl,
			condition: database === "postgres",
		},
		{
			key: "MONGODB_URI",
			value: databaseUrl,
			condition: database === "mongodb",
		},
		{
			key: "NEXT_PUBLIC_SUPABASE_URL",
			value: "https://your-project.supabase.co",
			condition: database === "supabase",
		},
		{
			key: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
			value: "your-anon-key",
			condition: database === "supabase",
		},
		{
			key: "SUPABASE_SERVICE_ROLE_KEY",
			value: "your-service-role-key",
			condition: database === "supabase",
		},
		// Email
		{
			key: "RESEND_API_KEY",
			value: "your-resend-api-key",
			condition: email === true,
		},
		{
			key: "RESEND_FROM_EMAIL",
			value: "no-reply@yourdomain.com",
			condition: email === true,
		},
		// Rate Limiting
		{
			key: "UPSTASH_REDIS_REST_URL",
			value: "your-upstash-redis-url",
			condition: true,
		},
		{
			key: "UPSTASH_REDIS_REST_TOKEN",
			value: "your-upstash-redis-token",
			condition: true,
		},
		// Stripe
		{
			key: "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
			value: "pk_test_xxx",
			condition: payment === "stripe",
		},
		{
			key: "STRIPE_SECRET_KEY",
			value: "sk_test_xxx",
			condition: payment === "stripe",
		},
		{
			key: "STRIPE_WEBHOOK_SECRET",
			value: "whsec_xxx",
			condition: payment === "stripe",
		},
		// Lemon Squeezy
		{
			key: "LEMON_SQUEEZY_API_KEY",
			value: "your-api-key",
			condition: payment === "lemonsqueezy",
		},
		{
			key: "LEMON_SQUEEZY_STORE_ID",
			value: "your-store-id",
			condition: payment === "lemonsqueezy",
		},
		{
			key: "LEMON_SQUEEZY_SECRET_KEY",
			value: "sk_live_xxx",
			condition: payment === "lemonsqueezy",
		},
		{
			key: "LEMON_SQUEEZY_WEBHOOK_SECRET",
			value: "whsec_xxx",
			condition: payment === "lemonsqueezy",
		},
	];

	await addEnvVariablesToFile(envPath, envVars);
}
