import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { ProjectConfig } from './types';
import { getUserPkgManager } from './utils/getPackageManager';

const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);
export const PKG_ROOT = path.join(distPath, '../');

export const DEFAULT_CONFIG: ProjectConfig = {
	projectName: 'free-ship-fast-app',
	projectDir: path.resolve(process.cwd(), 'free-ship-fast-app'),
	relativePath: 'free-ship-fast-app',
	email: true,
	database: 'postgres',
	auth: 'betterAuth',
	git: true,
	packageManager: getUserPkgManager(),
	install: true,
	analytics: 'umami',
	payment: 'stripe',
};
export const dependencyVersionMap = {
	// Auth
	'better-auth': '^1.3.5',
	
	// Database - PostgreSQL
	pg: '^8.14.1',
	'@types/pg': '^8.14.1',
	
	// Database - Prisma
	'@prisma/client': '^6.1.0',
	prisma: '^6.1.0',
	
	// Database - Supabase
	"@supabase/ssr": "^0.6.1",
	
	// Database - MongoDB
	mongoose: '^8.14.1',
	mongodb: '^5.1.0',
	
	
	
	// Payment - Stripe
	stripe: '^17.4.0',
	'@types/stripe': '^8.0.417',
	
	// Payment - LemonSqueezy
	'@lemonsqueezy/lemonsqueezy.js': '^3.4.0',
	
	// Analytics - PostHog
	posthog: '^3.2.4',
	'posthog-js': '^1.196.0',
	
	// Analytics - Umami (self-hosted, no package needed)
	
	// Email
	resend: '^4.0.1',
	// Validation
	zod: '^4.0.2',
	
	// Build tools
	'@types/node': '^22.13.11',
	tsx: '^4.19.3',
	turbo: '^2.5.4',
	
	// Development
	'fs-extra': '^11.2.0',
	'@types/fs-extra': '^11.0.4',
	consola: '^3.3.2',
	picocolors: '^1.1.1',
	
	// Docker
	'docker-compose': '^0.24.8',
} as const;

export type AvailableDependencies = keyof typeof dependencyVersionMap;
