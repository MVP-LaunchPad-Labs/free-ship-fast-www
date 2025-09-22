import React from 'react';

export type Database = 'postgres' | 'supabase' | 'mongodb';
export type Auth = 'none' | 'betterAuth' | 'supabaseAuth';
export type Analytics = 'none' | 'posthog' | 'umami';
export type Payment = 'none' | 'stripe' | 'lemonsqueezy';
export type PackageManager = 'npm' | 'pnpm' | 'bun';

export interface BuilderConfig {
	projectName: string;
	database: Database;
	auth: Auth;
	analytics: Analytics;
	payment: Payment;
	email: boolean;
	git: boolean;
	packageManager: PackageManager;
	install: boolean;
}

export interface StackOption<T = string> {
	value: T;
	label: string;
	description: string;
	icon?: React.ComponentType<{ className?: string }>;
	disabled?: boolean;
	disabledReason?: string;
}

export interface StackCategory {
	id: string;
	title: string;
	description: string;
	required: boolean;
}

// Compatibility rules
export type DatabaseAuthCompatibility = {
	[K in Database]: Auth[];
};

export const DATABASE_AUTH_COMPATIBILITY: DatabaseAuthCompatibility = {
	postgres: ['betterAuth', 'none'],
	supabase: ['supabaseAuth'],
	mongodb: ['betterAuth', 'none'],
};

// Default selections
export const DEFAULT_BUILDER_CONFIG: BuilderConfig = {
	projectName: 'my-saas-app',
	database: 'postgres',
	auth: 'betterAuth',
	analytics: 'umami',
	payment: 'stripe',
	email: true,
	git: true,
	packageManager: 'npm',
	install: true,
};

// Stack options definitions
import {
	PostgresIcon,
	SupabaseIcon,
	MongoIcon,
	BetterAuthIcon,
	StripeIcon,
	LemonSqueezyIcon,
	UmamiIcon,
	PostHogIcon,
	NpmIcon,
	PnpmIcon,
	BunIcon,
	NoIcon,
	GitIcon,
	EmailIcon,
	InstallIcon,
} from '../components/icons/tech-icons';

export const DATABASE_OPTIONS: StackOption<Database>[] = [
	{
		value: 'postgres',
		label: 'PostgreSQL',
		description: 'Powerful, open source object-relational database system',
		icon: PostgresIcon,
	},
	{
		value: 'supabase',
		label: 'Supabase',
		description: 'Open source Firebase alternative with built-in auth',
		icon: SupabaseIcon,
	},
	{
		value: 'mongodb',
		label: 'MongoDB',
		description: 'Open-source NoSQL database that stores data in JSON-like documents',
		icon: MongoIcon,
	},
];

export const AUTH_OPTIONS: StackOption<Auth>[] = [
	{
		value: 'betterAuth',
		label: 'Better Auth',
		description: 'Modern auth solution (works with postgres, mongodb)',
		icon: BetterAuthIcon,
	},
	{
		value: 'supabaseAuth',
		label: 'Supabase Auth',
		description: 'Built-in Supabase authentication (requires Supabase database)',
		icon: SupabaseIcon,
	},
	{
		value: 'none',
		label: 'No Auth',
		description: 'Skip authentication setup',
		icon: NoIcon,
	},
];

export const ANALYTICS_OPTIONS: StackOption<Analytics>[] = [
	{
		value: 'umami',
		label: 'Umami',
		description: 'Privacy-focused web analytics',
		icon: UmamiIcon,
	},
	{
		value: 'posthog',
		label: 'PostHog',
		description: 'Product analytics and feature flags',
		icon: PostHogIcon,
	},
	{
		value: 'none',
		label: 'No Analytics',
		description: 'Skip analytics setup',
		icon: NoIcon,
	},
];

export const PAYMENT_OPTIONS: StackOption<Payment>[] = [
	{
		value: 'stripe',
		label: 'Stripe',
		description: 'Complete payment solution with webhooks',
		icon: StripeIcon,
	},
	{
		value: 'lemonsqueezy',
		label: 'Lemon Squeezy',
		description: 'Digital product payments',
		icon: LemonSqueezyIcon,
	},
	{
		value: 'none',
		label: 'No Payments',
		description: 'Skip payment processing',
		icon: NoIcon,
	},
];

export const PACKAGE_MANAGER_OPTIONS: StackOption<PackageManager>[] = [
	{
		value: 'npm',
		label: 'npm',
		description: 'Node Package Manager',
		icon: NpmIcon,
	},
	{
		value: 'pnpm',
		label: 'pnpm',
		description: 'Performant npm',
		icon: PnpmIcon,
	},
	{
		value: 'bun',
		label: 'Bun',
		description: 'Fast all-in-one toolkit',
		icon: BunIcon,
	},
];

export const GIT_OPTIONS: StackOption<boolean>[] = [
	{
		value: true,
		label: 'Git',
		description: 'Initialize Git repository',
		icon: GitIcon,
	},
	{
		value: false,
		label: 'No Git',
		description: 'Skip Git initialization',
		icon: NoIcon,
	},
];

export const EMAIL_OPTIONS: StackOption<boolean>[] = [
	{
		value: true,
		label: 'Email',
		description: 'Add email functionality with Resend',
		icon: EmailIcon,
	},
	{
		value: false,
		label: 'No Email',
		description: 'Skip email integration',
		icon: NoIcon,
	},
];

export const INSTALL_OPTIONS: StackOption<boolean>[] = [
	{
		value: true,
		label: 'Install Dependencies',
		description: 'Install packages automatically',
		icon: InstallIcon,
	},
	{
		value: false,
		label: 'Skip Install',
		description: 'Skip dependency installation',
		icon: NoIcon,
	},
];

export const STACK_CATEGORIES: StackCategory[] = [
	{
		id: 'database',
		title: 'Database',
		description: 'Choose your data storage solution',
		required: true,
	},
	{
		id: 'auth',
		title: 'Authentication',
		description: 'User authentication and authorization',
		required: false,
	},
	{
		id: 'payment',
		title: 'Payments',
		description: 'Payment processing integration',
		required: false,
	},
	{
		id: 'analytics',
		title: 'Analytics',
		description: 'Track user behavior and metrics',
		required: false,
	},
	{
		id: 'packageManager',
		title: 'Package Manager',
		description: 'Dependency management tool',
		required: true,
	},
	{
		id: 'git',
		title: 'Git',
		description: 'Version control setup',
		required: false,
	},
	{
		id: 'email',
		title: 'Email',
		description: 'Email integration',
		required: false,
	},
	{
		id: 'install',
		title: 'Install',
		description: 'Dependency installation',
		required: false,
	},
];
