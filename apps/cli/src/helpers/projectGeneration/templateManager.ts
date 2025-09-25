import path from "node:path";
import fs from "fs-extra";
import { PKG_ROOT } from "../../constants";
import type { ProjectConfig } from "../../types";
import { globby } from "globby";
import { processTemplate } from "../../utils/templateProcessor";
import { addPackageDependency } from "../../utils/addPackageDeps";

async function processAndCopyFiles(
	sourcePattern: string | string[],
	baseSourceDir: string,
	destDir: string,
	context: ProjectConfig,
	overwrite = true,
) {
	const sourceFiles = await globby(sourcePattern, {
		cwd: baseSourceDir,
		dot: true,
		onlyFiles: true,
		absolute: false,
	});

	for (const relativeSrcPath of sourceFiles) {
		const srcPath = path.join(baseSourceDir, relativeSrcPath);
		let relativeDestPath = relativeSrcPath;

		if (relativeSrcPath.endsWith(".hbs")) {
			relativeDestPath = relativeSrcPath.slice(0, -4);
		}
		const basename = path.basename(relativeSrcPath);
		if (basename === "_gitignore") {
			relativeDestPath = path.join(path.dirname(relativeSrcPath), ".gitignore");
		} else if (basename === "_npmrc") {
			relativeDestPath = path.join(path.dirname(relativeSrcPath), ".npmrc");
		}

		const destPath = path.join(destDir, relativeDestPath);

		try {
			await fs.ensureDir(path.dirname(destPath));

			if (!overwrite && (await fs.pathExists(destPath))) {
				continue;
			}

			if (srcPath.endsWith(".hbs")) {
				await processTemplate(srcPath, destPath, context);
			} else {
				await fs.copy(srcPath, destPath, { overwrite: true });
			}
		} catch (_error) {}
	}
}

export async function copyBaseTemplate(
	projectDir: string,
	context: ProjectConfig,
) {
	const templateDir = path.join(PKG_ROOT, "templates/base");
	await processAndCopyFiles(["**/*"], templateDir, projectDir, context);
}



export async function setupDbTemplates(
	projectDir: string,
	context: ProjectConfig,
) {
	const dbOrmSrcDir = path.join(
		PKG_ROOT,
		`templates/db/${context.database}`,
	);

	if (await fs.pathExists(dbOrmSrcDir)) {
		await processAndCopyFiles("**/*", dbOrmSrcDir, projectDir, context);
	} else {
	}
}

export async function setupAuthTemplate(
	projectDir: string,
	context: ProjectConfig,
) {
	// Early return if no auth is configured
	if (context.auth === "none") {
		return;
	}

	// Handle Supabase auth
	if (context.auth === "supabaseAuth") {
		const supabaseAuthSrc = path.join(PKG_ROOT, "templates/auth/supabase");
		if (await fs.pathExists(supabaseAuthSrc)) {
			await processAndCopyFiles("**/*", supabaseAuthSrc, projectDir, context);
		}
		
		// Add Supabase dependencies
		await addPackageDependency({
			projectDir,
			dependencies: ["@supabase/ssr"]
		});
		return;
	}

	// Handle better-auth
	if (context.auth === "betterAuth") {
		// First copy the base better-auth files
		const betterAuthBaseSrc = path.join(PKG_ROOT, "templates/auth/betterAuth/base");
		if (await fs.pathExists(betterAuthBaseSrc)) {
			await processAndCopyFiles("**/*", betterAuthBaseSrc, projectDir, context);
		}

		// Then copy database-specific better-auth files
		const betterAuthDbSrc = path.join(
			PKG_ROOT,
			`templates/auth/betterAuth/db/${context.database}`,
		);
		if (await fs.pathExists(betterAuthDbSrc)) {
			await processAndCopyFiles("**/*", betterAuthDbSrc, projectDir, context);
		}

		// Add better-auth dependencies
		await addPackageDependency({
			projectDir,
			dependencies: ["better-auth"]
		});
	}
}

export async function setupAnalyticsTemplate(
	projectDir: string,
	context: ProjectConfig,
) {
	if (context.analytics === "none") {
		return;
	}

	const analyticsSrcDir = path.join(PKG_ROOT, `templates/analytics/${context.analytics}`);
	if (await fs.pathExists(analyticsSrcDir)) {
		await processAndCopyFiles("**/*", analyticsSrcDir, projectDir, context);
	}

	// Add analytics provider dependencies
	if (context.analytics === "posthog") {
		await addPackageDependency({
			projectDir,
			dependencies: ["posthog-js"]
		});
	} else if (context.analytics === "umami") {
		// Umami doesn't require additional dependencies as it uses external script
		// The analytics utility is included in the template files
	}
}

export async function setupPaymentTemplate(
	projectDir: string,
	context: ProjectConfig,
) {
	if (context.payment === "none") {
		return;
	}

	const paymentSrcDir = path.join(PKG_ROOT, `templates/payment/${context.payment}`);
	if (await fs.pathExists(paymentSrcDir)) {
		await processAndCopyFiles("**/*", paymentSrcDir, projectDir, context);
	}

	// Add payment provider dependencies
	if (context.payment === "stripe") {
		await addPackageDependency({
			projectDir,
			dependencies: ["stripe"]
		});
	} else if (context.payment === "lemonsqueezy") {
		await addPackageDependency({
			projectDir,
			dependencies: ["@lemonsqueezy/lemonsqueezy.js"]
		});
	}
}

export async function setupEmailTemplate(
	projectDir: string,
	context: ProjectConfig,
) {
	if (!context.email) {
		return;
	}

	const emailSrcDir = path.join(PKG_ROOT, "templates/email");
	if (await fs.pathExists(emailSrcDir)) {
		await processAndCopyFiles("**/*", emailSrcDir, projectDir, context);
	}

	// Add email provider dependencies
	await addPackageDependency({
		projectDir,
		dependencies: ["resend"]
	});
}
export async function setupPageAndComponentsTemplate(
	projectDir: string,
	options: ProjectConfig,
) {
	const pageAndComponentsSrcDir = path.join(PKG_ROOT, "templates/pageAndComponents");
	if (await fs.pathExists(pageAndComponentsSrcDir)) {
		await processAndCopyFiles("**/*", pageAndComponentsSrcDir, projectDir, options);
	}

	// Add common UI and form dependencies
	await addPackageDependency({
		projectDir,
		dependencies: [
			"@hookform/resolvers",
			"@radix-ui/react-accordion",
			"@radix-ui/react-alert-dialog",
			"@radix-ui/react-aspect-ratio",
			"@radix-ui/react-avatar",
			"@radix-ui/react-checkbox",
			"@radix-ui/react-collapsible",
			"@radix-ui/react-context-menu",
			"@radix-ui/react-dialog",
			"@radix-ui/react-dropdown-menu",
			"@radix-ui/react-hover-card",
			"@radix-ui/react-label",
			"@radix-ui/react-menubar",
			"@radix-ui/react-navigation-menu",
			"@radix-ui/react-popover",
			"@radix-ui/react-progress",
			"@radix-ui/react-radio-group",
			"@radix-ui/react-scroll-area",
			"@radix-ui/react-select",
			"@radix-ui/react-separator",
			"@radix-ui/react-slider",
			"@radix-ui/react-slot",
			"@radix-ui/react-switch",
			"@radix-ui/react-tabs",
			"@radix-ui/react-toggle",
			"@radix-ui/react-toggle-group",
			"@radix-ui/react-tooltip",
			"@upstash/ratelimit",
			"@upstash/redis",
			"axios",
			"class-variance-authority",
			"clsx",
			"cmdk",
			"crisp-sdk-web",
			"date-fns",
			"embla-carousel-react",
			"input-otp",
			"lucide-react",
			"next",
			"next-themes",
			"react",
			"react-day-picker",
			"react-dom",
			"react-hook-form",
			"react-resizable-panels",
			"recharts",
			"sonner",
			"tailwind-merge",
			"vaul",
			"zod"
		],
		devDependencies: [
			"@biomejs/biome",
			"@tailwindcss/postcss",
			"@types/node",
			"@types/react",
			"@types/react-dom",
			"tailwindcss",
			"tw-animate-css",
			"typescript"
		]
	});
}