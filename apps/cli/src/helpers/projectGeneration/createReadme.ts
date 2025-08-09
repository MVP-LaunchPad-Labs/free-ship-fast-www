import path from "node:path";
import consola from "consola";
import fs from "fs-extra";
import type { ProjectConfig } from "../../types";

export async function createReadme(projectDir: string, options: ProjectConfig) {
	const readmePath = path.join(projectDir, "README.md");
	const content = generateReadmeContent(options);

	try {
		await fs.writeFile(readmePath, content);
	} catch (error) {
		consola.error("Failed to create README.md file:", error);
	}
}

function generateReadmeContent(options: ProjectConfig): string {
	const { projectName, packageManager, database, auth, payment, email } = options;

	const packageManagerRunCmd =
		packageManager === "npm" ? "npm run" : packageManager;

	return `# ${projectName}

A modern SaaS boilerplate built with Next.js 15, featuring Prisma + Better Auth for a robust development experience.

This project was created with [FreeShipFast](https://github.com/MVP-LaunchPad-Labs/free-ship-fast), a modern SaaS starter template.

## 🚀 Features

${generateFeaturesList(database, auth, payment, email)}

## 🛠️ Tech Stack

* **Framework**: Next.js 15 (App Router)
* **Database**: ${getDatabaseName(database)} + Prisma ORM
* **Authentication**: ${getAuthName(auth)}
* **Styling**: Tailwind CSS + Radix UI
* **Email**: ${email ? "Resend (configurable)" : "Not configured"}
* **Payments**: ${getPaymentName(payment)}
* **Deployment**: Vercel ready

## 📋 Prerequisites

* Node.js 18+ and ${packageManager}
* ${getDatabasePrerequisites(database)}
${auth === "betterAuth" ? "* Google OAuth credentials (for social login)" : ""}

## 🚀 Quick Start

1. **Clone and install**

\`\`\`bash
git clone <repo-url>
cd ${projectName}
${packageManager} install
\`\`\`

2. **Environment setup**

\`\`\`bash
cp .env.example .env
\`\`\`

3. **Configure environment variables**

${generateEnvExample(database, auth, payment, email)}

4. **Database setup**

${generateDatabaseSetup(database, packageManagerRunCmd)}

5. **Run development server**

\`\`\`bash
${packageManagerRunCmd} dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

\`\`\`
${generateProjectStructure(projectName)}
\`\`\`

## 🗄️ Database Schema

The boilerplate uses Prisma with ${getDatabaseName(database)}. Key models include:

* **User**: Authentication and profile data
* **Waitlist**: Email collection for landing pages
${auth === "betterAuth" ? "* **Session**: Better Auth session management" : ""}

## 🔐 Authentication

${generateAuthSection(auth)}

## 💳 Payments

${generatePaymentSection(payment)}

## 🎨 UI Components

* **Radix UI**: Accessible component primitives
* **Tailwind CSS**: Utility-first styling
* **Shadcn/ui**: Beautiful component library
* **Dark Mode**: Built-in theme switching
* **Responsive**: Mobile-first design

## 📋 Available Scripts

${generateScriptsList(packageManagerRunCmd, database)}

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Production

Make sure to set all required environment variables in your deployment platform:

${generateEnvVariablesList(database, auth, payment, email)}

## 🔧 Configuration

${generateConfigurationSection(payment, email)}

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

* Create an issue for bug reports
* Join our Discord for community support
* Check the documentation for detailed guides

---

Built with ❤️ using modern web technologies.
`;
}

function generateFeaturesList(
	database: string,
	auth: string,
	payment: string,
	email: boolean,
): string {
	const features = [
		"* **Authentication**: Better Auth with social login (Google) and magic links",
		"* **Database**: PostgreSQL with Prisma ORM for type safety and migrations",
		"* **UI Components**: Radix UI with Tailwind CSS",
		"* **Rate Limiting**: Upstash Redis for API protection",
		"* **SEO Optimized**: Built-in metadata and OpenGraph support",
	];

	if (payment === "stripe") {
		features.splice(2, 0, "* **Payments**: Stripe integration");
	} else if (payment === "lemonsqueezy") {
		features.splice(2, 0, "* **Payments**: LemonSqueezy integration");
	}

	if (email) {
		features.splice(payment !== "none" ? 3 : 2, 0, "* **Email**: Resend, Nodemailer, or SendGrid support");
	}

	if (database === "mongodb") {
		features[1] = "* **Database**: MongoDB with Prisma ORM for type safety";
	} else if (database === "supabase") {
		features[1] = "* **Database**: Supabase with real-time subscriptions";
		features[0] = "* **Authentication**: Supabase Auth with multiple providers";
	}

	features.push("* **Analytics**: Umami and PostHog integration");

	return features.join("\n");
}

function getDatabaseName(database: string): string {
	switch (database) {
		case "postgres": return "PostgreSQL";
		case "mongodb": return "MongoDB";
		case "supabase": return "Supabase";
		default: return "PostgreSQL";
	}
}

function getAuthName(auth: string): string {
	switch (auth) {
		case "betterAuth": return "Better Auth";
		case "supabaseAuth": return "Supabase Auth";
		default: return "Better Auth";
	}
}

function getPaymentName(payment: string): string {
	switch (payment) {
		case "stripe": return "Stripe";
		case "lemonsqueezy": return "LemonSqueezy";
		default: return "Not configured";
	}
}

function getDatabasePrerequisites(database: string): string {
	switch (database) {
		case "postgres": return "PostgreSQL database";
		case "mongodb": return "MongoDB database";
		case "supabase": return "Supabase project";
		default: return "PostgreSQL database";
	}
}

function generateProjectStructure(projectName: string): string {
	return `${projectName}/
├── app/
│   ├── (auth)/           # Authentication pages
│   ├── (dashboard)/      # Protected dashboard pages
│   ├── api/             # API routes
│   └── globals.css      # Global styles
├── components/
│   ├── auth/            # Authentication components
│   ├── dashboard/       # Dashboard components
│   ├── landing/         # Landing page components
│   ├── ui/              # Reusable UI components
│   └── shared/          # Shared components
├── lib/
│   ├── auth.ts          # Auth configuration
│   ├── db/              # Database client
│   ├── stripe/          # Stripe utilities
│   ├── lemonSqueezy/    # LemonSqueezy utilities
│   ├── email/           # Email configuration
│   └── schemas/         # Zod validation schemas
├── hooks/               # Custom React hooks
├── types/               # TypeScript type definitions
├── prisma/              # Database schema and migrations
└── scripts/             # Setup and deployment scripts`;
}

function generateEnvExample(
	database: string,
	auth: string,
	payment: string,
	email: boolean,
): string {
	let example = "";

	// Database
	if (database === "postgres") {
		example += `# Database
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"

`;
	} else if (database === "mongodb") {
		example += `# Database
MONGODB_URI="mongodb+srv://user:password@cluster.mongodb.net/database"

`;
	} else if (database === "supabase") {
		example += `# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

`;
	}

	// Auth
	if (auth === "betterAuth") {
		example += `# Authentication (Better Auth)
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

`;
	}

	// Email
	if (email) {
		example += `# Email
RESEND_API_KEY="your-resend-api-key"
RESEND_FROM_EMAIL="noreply@yourdomain.com"

`;
	}

	// Payments
	if (payment === "stripe") {
		example += `# Payments (Stripe)
STRIPE_SECRET_KEY="sk_test_xxx"
STRIPE_PUBLISHABLE_KEY="pk_test_xxx"
STRIPE_WEBHOOK_SECRET="whsec_xxx"

`;
	} else if (payment === "lemonsqueezy") {
		example += `# Payments (LemonSqueezy)
LEMON_SQUEEZY_SECRET_KEY="sk_live_xxx"
LEMON_SQUEEZY_STORE_ID="your-store-id"
LEMON_SQUEEZY_WEBHOOK_SECRET="whsec_xxx"

`;
	}

	// Common
	example += `# Rate Limiting
UPSTASH_REDIS_REST_URL="your-upstash-redis-url"
UPSTASH_REDIS_REST_TOKEN="your-upstash-redis-token"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"`;

	return `\`\`\`bash
${example}
\`\`\``;
}

function generateDatabaseSetup(
	database: string,
	packageManagerRunCmd: string,
): string {
	if (database === "supabase") {
		return `\`\`\`bash
# Database is managed by Supabase
${packageManagerRunCmd} db:types
\`\`\``;
	}

	return `\`\`\`bash
# Generate Prisma client and run migrations
${packageManagerRunCmd} db:generate
${packageManagerRunCmd} db:push
\`\`\``;
}

function generateAuthSection(auth: string): string {
	if (auth === "supabaseAuth") {
		return `Built with Supabase Auth featuring:

* **Multiple Providers**: Google, GitHub, Discord, and more
* **Magic Links**: Passwordless authentication
* **Row Level Security**: Database-level access control
* **Real-time**: Live user presence and updates`;
	}

	return `Built with Better Auth featuring:

* **Social Login**: Google OAuth (easily extendable)
* **Magic Links**: Passwordless authentication
* **Session Management**: Secure cookie-based sessions
* **Type Safety**: Full TypeScript integration`;
}

function generatePaymentSection(payment: string): string {
	if (payment === "stripe") {
		return `Stripe integration features:

* **Payment Processing**: Credit cards, ACH, international methods
* **Subscriptions**: Recurring billing with webhooks
* **Customer Portal**: Self-service billing management
* **Webhooks**: Automatic subscription management`;
	} else if (payment === "lemonsqueezy") {
		return `LemonSqueezy integration features:

* **Global Payments**: Better international support
* **Tax Handling**: Automatic tax calculations
* **Subscriptions**: Recurring billing with webhooks
* **Customer Portal**: Self-service billing management`;
	}

	return `Ready for payment integration:

* **Stripe**: Traditional payment processing
* **LemonSqueezy**: Modern payment platform with better international support
* **Webhooks**: Automatic subscription management
* **Customer Portal**: Self-service billing management`;
}

function generateScriptsList(
	packageManagerRunCmd: string,
	database: string,
): string {
	let scripts = `* \`${packageManagerRunCmd} dev\`: Start the development server
* \`${packageManagerRunCmd} build\`: Build the application for production
* \`${packageManagerRunCmd} start\`: Start the production server
* \`${packageManagerRunCmd} lint\`: Run ESLint
* \`${packageManagerRunCmd} type-check\`: Check TypeScript types`;

	if (database !== "supabase") {
		scripts += `
* \`${packageManagerRunCmd} db:generate\`: Generate Prisma client
* \`${packageManagerRunCmd} db:push\`: Push schema changes to database
* \`${packageManagerRunCmd} db:migrate\`: Run database migrations
* \`${packageManagerRunCmd} db:studio\`: Open Prisma Studio
* \`${packageManagerRunCmd} db:seed\`: Seed the database with initial data`;
	} else {
		scripts += `
* \`${packageManagerRunCmd} db:types\`: Generate TypeScript types from Supabase`;
	}

	return scripts;
}

function generateEnvVariablesList(
	database: string,
	auth: string,
	payment: string,
	email: boolean,
): string {
	const envVars = ["* `NEXT_PUBLIC_APP_URL` - Your app's URL"];

	// Database variables
	if (database === "postgres") {
		envVars.push("* `DATABASE_URL` - PostgreSQL connection string");
	} else if (database === "mongodb") {
		envVars.push("* `MONGODB_URI` - MongoDB connection string");
	} else if (database === "supabase") {
		envVars.push(
			"* `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL",
			"* `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key",
			"* `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key",
		);
	}

	// Auth variables
	if (auth === "betterAuth") {
		envVars.push(
			"* `BETTER_AUTH_SECRET` - Random secret for Better Auth",
			"* `BETTER_AUTH_URL` - Your app's URL for Better Auth",
			"* `GOOGLE_CLIENT_ID` - Google OAuth client ID",
			"* `GOOGLE_CLIENT_SECRET` - Google OAuth client secret",
		);
	}

	// Payment variables
	if (payment === "stripe") {
		envVars.push(
			"* `STRIPE_SECRET_KEY` - Stripe secret key",
			"* `STRIPE_PUBLISHABLE_KEY` - Stripe publishable key",
			"* `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret",
		);
	} else if (payment === "lemonsqueezy") {
		envVars.push(
			"* `LEMON_SQUEEZY_SECRET_KEY` - LemonSqueezy API key",
			"* `LEMON_SQUEEZY_STORE_ID` - Your LemonSqueezy store ID",
			"* `LEMON_SQUEEZY_WEBHOOK_SECRET` - LemonSqueezy webhook secret",
		);
	}

	// Email variables
	if (email) {
		envVars.push(
			"* `RESEND_API_KEY` - Resend API key for sending emails",
			"* `RESEND_FROM_EMAIL` - Email address to send from",
		);
	}

	// Rate limiting
	envVars.push(
		"* `UPSTASH_REDIS_REST_URL` - Upstash Redis URL for rate limiting",
		"* `UPSTASH_REDIS_REST_TOKEN` - Upstash Redis token",
	);

	return envVars.join("\n");
}

function generateConfigurationSection(payment: string, email: boolean): string {
	let config = "";

	if (payment !== "none") {
		config += `### Switching Payment Providers

Update \`config.ts\`:

\`\`\`typescript
services: {
  payment: '${payment}', // or switch between 'stripe' and 'lemonsqueezy'
}
\`\`\`

`;
	}

	if (email) {
		config += `### Email Configuration

Choose your email provider in \`config.ts\`:

\`\`\`typescript
services: {
  email: 'resend', // or 'nodemailer' or 'sendgrid'
}
\`\`\``;
	}

	return config || "Configuration options will be available based on your selected features.";
}
