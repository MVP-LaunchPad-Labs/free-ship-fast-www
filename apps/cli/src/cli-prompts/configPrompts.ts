import { cancel, group } from "@clack/prompts";
import pc from "picocolors";
import type {
	Analytics,
	Auth,
	Database,
	PackageManager,
	Payment,
	ProjectConfig,
} from "../types";
import { getAnalyticsChoice } from "./analytics.js";
import { getAuthChoice } from "./auth.js";
import { getDatabaseChoice } from "./database.js";
import { getGitChoice } from "./git.js";
import { getInstallChoice } from "./install.js";
import { getPackageManagerChoice } from "./package-manager.js";
import { getPaymentChoice } from "./payment.js";
import { getEmailChoice } from "./email";

type PromptGroupResults = {
	database: Database;
	auth: Auth;
	analytics: Analytics;
	payment: Payment;
	git: boolean;
	packageManager: PackageManager;
	install: boolean;
	email: boolean;
};

export async function gatherConfig(
	flags: Partial<ProjectConfig>,
	projectName: string,
	projectDir: string,
	relativePath: string,
): Promise<ProjectConfig> {
	const result = await group<PromptGroupResults>(
		{
			database: () => getDatabaseChoice(flags.database),
			auth: ({ results }) => getAuthChoice(flags.auth, results.database),
			analytics: () => getAnalyticsChoice(flags.analytics),
			payment: () => getPaymentChoice(flags.payment),
			git: () => getGitChoice(flags.git),
			packageManager: () => getPackageManagerChoice(flags.packageManager),
			install: () => getInstallChoice(flags.install),
			email: () => getEmailChoice(flags.email),
		},
		{
			onCancel: () => {
				cancel(pc.red("Operation cancelled"));
				process.exit(0);
			},
		},
	);

	return {
		projectName: projectName,
		projectDir: projectDir,
		relativePath: relativePath,
		database: result.database,
		auth: result.auth,
		analytics: result.analytics,
		payment: result.payment,
		git: result.git,
		email: result.email,
		packageManager: result.packageManager,
		install: result.install,
	};
}
