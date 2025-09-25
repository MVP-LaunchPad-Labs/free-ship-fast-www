import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { ProjectConfig } from './types';
import { getUserPkgManager } from './utils/getPackageManager';

const __filename = fileURLToPath(import.meta.url);
const distPath = path.dirname(__filename);
export const PKG_ROOT = path.join(distPath, '../');

export const DEFAULT_CONFIG: ProjectConfig = {
	projectName: 'launch-pad-app',
	projectDir: path.resolve(process.cwd(), 'launch-pad-app'),
	relativePath: 'launch-pad-app',
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
	'better-auth': '^1.3.4',
	
	// Database - PostgreSQL
	pg: '^8.14.1',
	'@types/pg': '^8.14.1',
	
	// Database - Prisma
	'@prisma/client': '^6.11.1',
	prisma: '^6.11.1',
	
	// Database - Supabase
	"@supabase/ssr": "^0.6.1",
	
	// Database - MongoDB
	mongoose: '^8.14.1',
	mongodb: '^5.1.0',
	
	// Forms
	'@hookform/resolvers': '^5.1.1',
	'react-hook-form': '^7.60.0',
	
	// UI Components - Radix UI
	'@radix-ui/react-accordion': '^1.2.11',
	'@radix-ui/react-alert-dialog': '^1.1.14',
	'@radix-ui/react-aspect-ratio': '^1.1.7',
	'@radix-ui/react-avatar': '^1.1.10',
	'@radix-ui/react-checkbox': '^1.3.2',
	'@radix-ui/react-collapsible': '^1.1.11',
	'@radix-ui/react-context-menu': '^2.2.15',
	'@radix-ui/react-dialog': '^1.1.14',
	'@radix-ui/react-dropdown-menu': '^2.1.15',
	'@radix-ui/react-hover-card': '^1.1.14',
	'@radix-ui/react-label': '^2.1.7',
	'@radix-ui/react-menubar': '^1.1.15',
	'@radix-ui/react-navigation-menu': '^1.2.13',
	'@radix-ui/react-popover': '^1.1.14',
	'@radix-ui/react-progress': '^1.1.7',
	'@radix-ui/react-radio-group': '^1.3.7',
	'@radix-ui/react-scroll-area': '^1.2.9',
	'@radix-ui/react-select': '^2.2.5',
	'@radix-ui/react-separator': '^1.1.7',
	'@radix-ui/react-slider': '^1.3.5',
	'@radix-ui/react-slot': '^1.2.3',
	'@radix-ui/react-switch': '^1.2.5',
	'@radix-ui/react-tabs': '^1.1.12',
	'@radix-ui/react-toggle': '^1.1.9',
	'@radix-ui/react-toggle-group': '^1.1.10',
	'@radix-ui/react-tooltip': '^1.2.7',
	
	// Rate Limiting
	'@upstash/ratelimit': '^2.0.5',
	'@upstash/redis': '^1.35.1',
	
	// Payment - Stripe
	stripe: '^18.3.0',
	'@types/stripe': '^8.0.417',
	
	// Payment - LemonSqueezy
	'@lemonsqueezy/lemonsqueezy.js': '^4.0.0',
	
	// Analytics - PostHog
	posthog: '^3.2.4',
	'posthog-js': '^1.196.0',
	
	// Analytics - Umami (self-hosted, no package needed)
	
	// Email
	resend: '^4.6.0',
	
	// Validation
	zod: '^4.0.5',
	
	// React & Next.js
	react: '^19.0.0',
	'react-dom': '^19.0.0',
	next: '15.3.5',
	'next-themes': '^0.4.6',
	
	// Date handling
	'date-fns': '^4.1.0',
	'react-day-picker': '^9.8.0',
	
	// UI Components & Utilities
	'class-variance-authority': '^0.7.1',
	clsx: '^2.1.1',
	'tailwind-merge': '^3.3.1',
	'lucide-react': '^0.525.0',
	cmdk: '^1.1.1',
	sonner: '^2.0.6',
	vaul: '^1.1.2',
	'input-otp': '^1.4.2',
	'embla-carousel-react': '^8.6.0',
	'react-resizable-panels': '^3.0.3',
	recharts: '2.15.4',
	
	// Utilities
	axios: '^1.10.0',
	'crisp-sdk-web': '^1.0.25',
	
	// Build tools
	'@types/node': '^20',
	'@types/react': '^19',
	'@types/react-dom': '^19',
	typescript: '^5',
	tsx: '^4.19.3',
	turbo: '^2.5.4',
	
	// Development
	'fs-extra': '^11.2.0',
	'@types/fs-extra': '^11.0.4',
	consola: '^3.3.2',
	picocolors: '^1.1.1',
	'@biomejs/biome': '2.1.1',
	
	// Styling
	tailwindcss: '^4',
	'@tailwindcss/postcss': '^4',
	'tw-animate-css': '^1.3.5',
	
	// Docker
	'docker-compose': '^0.24.8',
} as const;

export type AvailableDependencies = keyof typeof dependencyVersionMap;
