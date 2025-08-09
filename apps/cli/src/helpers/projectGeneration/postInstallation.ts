import { consola } from "consola";
import pc from "picocolors";
import type { ProjectConfig } from "../../types";

export async function displayPostInstallInstructions(
	config: ProjectConfig & { depsInstalled: boolean },
) {
	const {
		projectName,
		database,
		auth,
		payment,
		email,
		relativePath,
		packageManager,
		depsInstalled,
	} = config;

	const runCmd = packageManager === "npm" ? "npm run" : packageManager;
	const cdCmd = `cd ${relativePath}`;

	let output = `${pc.bold(`🚀 ${projectName} Setup Complete!`)}\n\n`;
	output += `${pc.bold("Next steps:")}\n`;
	output += `${pc.cyan("1.")} ${cdCmd}\n`;

	let stepCounter = 2;

	if (!depsInstalled) {
		output += `${pc.cyan(`${stepCounter++}.`)} ${packageManager} install\n`;
	}

	// Environment setup
	output += `${pc.cyan(`${stepCounter++}.`)} Set up environment variables:\n`;
	output += `   ${pc.white("cp .env.example .env")}\n`;
	output += `   ${pc.dim("Then configure your .env file (see detailed instructions below)")}\n\n`;

	// Database setup
	if (database !== "supabase") {
		output += `${pc.cyan(`${stepCounter++}.`)} Set up database:\n`;
		output += `   ${pc.white(`${runCmd} db:generate`)}\n`;
		output += `   ${pc.white(`${runCmd} db:push`)}\n\n`;
	}

	// Development
	output += `${pc.cyan(`${stepCounter++}.`)} Start development:\n`;
	output += `   ${pc.white(`${runCmd} dev`)}\n\n`;

	output += `${pc.bold("Your app will be available at:")}\n`;
	output += `${pc.cyan("•")} ${pc.white("http://localhost:3000")}\n\n`;

	// Detailed configuration instructions
	output += generateDetailedInstructions(database, auth, payment, email, runCmd);

	// Helpful commands
	output += generateHelpfulCommands(runCmd, database);

	// Next steps
	output += generateNextSteps();

	consola.box(output);
}

function generateDetailedInstructions(
	database: string,
	auth: string,
	payment: string,
	email: boolean,
	runCmd: string,
): string {
	let instructions = `${pc.bold("🔧 Detailed Configuration Instructions:")}\n\n`;

	// Database configuration
	instructions += `${pc.bold("📊 Database Setup:")}\n`;
	
	if (database === "postgres") {
		instructions += `${pc.cyan("PostgreSQL Configuration:")}\n`;
		instructions += `1. Create a PostgreSQL database (local or cloud)\n`;
		instructions += `   ${pc.dim("• Local: Use PostgreSQL app or Docker")}\n`;
		instructions += `   ${pc.dim("• Cloud: Neon, Supabase, PlanetScale, Railway")}\n`;
		instructions += `2. Update your .env file:\n`;
		instructions += `   ${pc.white('DATABASE_URL="postgresql://user:password@host:5432/database"')}\n`;
		instructions += `3. Run database commands:\n`;
		instructions += `   ${pc.white(`${runCmd} db:generate`)} ${pc.dim("# Generate Prisma client")}\n`;
		instructions += `   ${pc.white(`${runCmd} db:push`)} ${pc.dim("# Push schema to database")}\n`;
		instructions += `   ${pc.white(`${runCmd} db:studio`)} ${pc.dim("# Open Prisma Studio")}\n\n`;
	} else if (database === "mongodb") {
		instructions += `${pc.cyan("MongoDB Configuration:")}\n`;
		instructions += `1. Create a MongoDB database:\n`;
		instructions += `   ${pc.dim("• Local: Install MongoDB or use Docker")}\n`;
		instructions += `   ${pc.dim("• Cloud: MongoDB Atlas (recommended)")}\n`;
		instructions += `2. Update your .env file:\n`;
		instructions += `   ${pc.white('MONGODB_URI="mongodb+srv://user:password@cluster.mongodb.net/database"')}\n`;
		instructions += `3. Run database commands:\n`;
		instructions += `   ${pc.white(`${runCmd} db:generate`)} ${pc.dim("# Generate Prisma client")}\n`;
		instructions += `   ${pc.white(`${runCmd} db:push`)} ${pc.dim("# Push schema to database")}\n\n`;
	} else if (database === "supabase") {
		instructions += `${pc.cyan("Supabase Configuration:")}\n`;
		instructions += `1. Create a Supabase project at ${pc.white("https://supabase.com")}\n`;
		instructions += `2. Get your project credentials from Settings > API\n`;
		instructions += `3. Update your .env file:\n`;
		instructions += `   ${pc.white('NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"')}\n`;
		instructions += `   ${pc.white('NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"')}\n`;
		instructions += `   ${pc.white('SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"')}\n`;
		instructions += `4. Set up authentication in Supabase dashboard\n`;
		instructions += `5. Generate types:\n`;
		instructions += `   ${pc.white(`${runCmd} db:types`)} ${pc.dim("# Generate TypeScript types")}\n\n`;
	}

	// Authentication configuration
	if (auth === "betterAuth") {
		instructions += `${pc.bold("🔐 Better Auth Configuration:")}\n`;
		instructions += `1. Generate auth secret:\n`;
		instructions += `   ${pc.white('BETTER_AUTH_SECRET="your-random-secret-key"')} ${pc.dim("# Use a strong random string")}\n`;
		instructions += `   ${pc.white('BETTER_AUTH_URL="http://localhost:3000"')}\n`;
		instructions += `2. Set up Google OAuth:\n`;
		instructions += `   ${pc.dim("• Go to Google Cloud Console")}\n`;
		instructions += `   ${pc.dim("• Create OAuth 2.0 credentials")}\n`;
		instructions += `   ${pc.dim("• Add http://localhost:3000/api/auth/callback/google to authorized redirects")}\n`;
		instructions += `   ${pc.white('GOOGLE_CLIENT_ID="your-google-client-id"')}\n`;
		instructions += `   ${pc.white('GOOGLE_CLIENT_SECRET="your-google-client-secret"')}\n`;
		instructions += `3. Authentication will be available at:\n`;
		instructions += `   ${pc.dim("• /sign-in - Sign in page")}\n`;
		instructions += `   ${pc.dim("• /sign-up - Sign up page")}\n`;
		instructions += `   ${pc.dim("• /api/auth/* - Auth API endpoints")}\n\n`;
	} else if (auth === "supabaseAuth") {
		instructions += `${pc.bold("🔐 Supabase Auth Configuration:")}\n`;
		instructions += `1. Enable authentication in your Supabase project\n`;
		instructions += `2. Configure providers in Authentication > Providers\n`;
		instructions += `3. Set up OAuth providers (Google, GitHub, etc.)\n`;
		instructions += `4. Configure email templates in Authentication > Email Templates\n`;
		instructions += `5. Authentication is automatically configured with your Supabase setup\n\n`;
	}

	// Payment configuration
	if (payment === "stripe") {
		instructions += `${pc.bold("💳 Stripe Configuration:")}\n`;
		instructions += `1. Create a Stripe account at ${pc.white("https://stripe.com")}\n`;
		instructions += `2. Get your API keys from Dashboard > Developers > API keys\n`;
		instructions += `3. Update your .env file:\n`;
		instructions += `   ${pc.white('STRIPE_SECRET_KEY="sk_test_..."')} ${pc.dim("# Secret key")}\n`;
		instructions += `   ${pc.white('STRIPE_PUBLISHABLE_KEY="pk_test_..."')} ${pc.dim("# Publishable key")}\n`;
		instructions += `4. Set up webhooks:\n`;
		instructions += `   ${pc.dim("• Install Stripe CLI: stripe listen --forward-to localhost:3000/api/webhooks/stripe")}\n`;
		instructions += `   ${pc.white('STRIPE_WEBHOOK_SECRET="whsec_..."')} ${pc.dim("# From CLI or dashboard")}\n`;
		instructions += `5. Create products and prices in Stripe Dashboard\n`;
		instructions += `6. Payment endpoints:\n`;
		instructions += `   ${pc.dim("• /api/payments/create-checkout - Create checkout session")}\n`;
		instructions += `   ${pc.dim("• /api/webhooks/stripe - Handle Stripe webhooks")}\n\n`;
	} else if (payment === "lemonsqueezy") {
		instructions += `${pc.bold("💳 LemonSqueezy Configuration:")}\n`;
		instructions += `1. Create a LemonSqueezy account at ${pc.white("https://lemonsqueezy.com")}\n`;
		instructions += `2. Get your API key from Settings > API\n`;
		instructions += `3. Update your .env file:\n`;
		instructions += `   ${pc.white('LEMON_SQUEEZY_SECRET_KEY="sk_live_..."')}\n`;
		instructions += `   ${pc.white('LEMON_SQUEEZY_STORE_ID="your-store-id"')}\n`;
		instructions += `4. Set up webhooks:\n`;
		instructions += `   ${pc.dim("• Add webhook URL: https://yourapp.com/api/webhooks/lemonsqueezy")}\n`;
		instructions += `   ${pc.white('LEMON_SQUEEZY_WEBHOOK_SECRET="whsec_..."')}\n`;
		instructions += `5. Create products in LemonSqueezy dashboard\n`;
		instructions += `6. Payment endpoints:\n`;
		instructions += `   ${pc.dim("• /api/payments/create-checkout - Create checkout")}\n`;
		instructions += `   ${pc.dim("• /api/webhooks/lemonsqueezy - Handle webhooks")}\n\n`;
	}

	// Email configuration
	if (email) {
		instructions += `${pc.bold("📧 Email Configuration (Resend):")}\n`;
		instructions += `1. Create a Resend account at ${pc.white("https://resend.com")}\n`;
		instructions += `2. Add and verify your domain\n`;
		instructions += `3. Get your API key from API Keys section\n`;
		instructions += `4. Update your .env file:\n`;
		instructions += `   ${pc.white('RESEND_API_KEY="re_..."')}\n`;
		instructions += `   ${pc.white('RESEND_FROM_EMAIL="noreply@yourdomain.com"')}\n`;
		instructions += `5. Email templates available in /lib/email/\n`;
		instructions += `6. Send emails using the email utilities in /lib/email/\n\n`;
	}

	// Rate limiting
	instructions += `${pc.bold("🛡️  Rate Limiting (Upstash Redis):")}\n`;
	instructions += `1. Create an Upstash account at ${pc.white("https://upstash.com")}\n`;
	instructions += `2. Create a Redis database\n`;
	instructions += `3. Get REST URL and token from database details\n`;
	instructions += `4. Update your .env file:\n`;
	instructions += `   ${pc.white('UPSTASH_REDIS_REST_URL="https://..."')}\n`;
	instructions += `   ${pc.white('UPSTASH_REDIS_REST_TOKEN="..."')}\n`;
	instructions += `5. Rate limiting is automatically applied to API routes\n\n`;

	return instructions;
}

function generateHelpfulCommands(runCmd: string, database: string): string {
	let commands = `${pc.bold("🛠️  Helpful Commands:")}\n`;
	
	commands += `${pc.cyan("Development:")}\n`;
	commands += `• ${pc.white(`${runCmd} dev`)} - Start development server\n`;
	commands += `• ${pc.white(`${runCmd} build`)} - Build for production\n`;
	commands += `• ${pc.white(`${runCmd} start`)} - Start production server\n`;
	commands += `• ${pc.white(`${runCmd} lint`)} - Run ESLint\n`;
	commands += `• ${pc.white(`${runCmd} type-check`)} - Check TypeScript types\n\n`;

	if (database !== "supabase") {
		commands += `${pc.cyan("Database (Prisma):")}\n`;
		commands += `• ${pc.white(`${runCmd} db:generate`)} - Generate Prisma client\n`;
		commands += `• ${pc.white(`${runCmd} db:push`)} - Push schema changes\n`;
		commands += `• ${pc.white(`${runCmd} db:migrate`)} - Create and run migrations\n`;
		commands += `• ${pc.white(`${runCmd} db:studio`)} - Open Prisma Studio\n`;
		commands += `• ${pc.white(`${runCmd} db:seed`)} - Seed database with sample data\n\n`;
	} else {
		commands += `${pc.cyan("Database (Supabase):")}\n`;
		commands += `• ${pc.white(`${runCmd} db:types`)} - Generate TypeScript types\n\n`;
	}

	return commands;
}

function generateNextSteps(): string {
	let steps = `${pc.bold("🎯 Next Steps:")}\n`;
	steps += `1. ${pc.cyan("Configure your environment variables")} (see detailed instructions above)\n`;
	steps += `2. ${pc.cyan("Set up your database")} and run initial migrations\n`;
	steps += `3. ${pc.cyan("Configure authentication")} (OAuth providers, email templates)\n`;
	steps += `4. ${pc.cyan("Set up payments")} (create products, configure webhooks)\n`;
	steps += `5. ${pc.cyan("Customize your app")} (branding, content, features)\n`;
	steps += `6. ${pc.cyan("Deploy to production")} (Vercel, Railway, or your preferred platform)\n\n`;

	steps += `${pc.bold("📚 Resources:")}\n`;
	steps += `• Documentation: ${pc.white("Check the README.md in your project")}\n`;
	steps += `• Examples: ${pc.white("Look at the example components and pages")}\n`;
	steps += `• Database Schema: ${pc.white("Check /prisma/schema.prisma")}\n`;
	steps += `• API Routes: ${pc.white("Explore /app/api/ for backend functionality")}\n\n`;

	steps += `${pc.bold("🚀 Ready to ship?")}\n`;
	steps += `Deploy your app to Vercel with: ${pc.white("vercel")}\n`;
	steps += `Make sure to add all environment variables in your deployment platform!\n\n`;

	steps += `${pc.green("🎉 Happy coding! Your SaaS is ready to launch!")}\n`;

	return steps;
}
