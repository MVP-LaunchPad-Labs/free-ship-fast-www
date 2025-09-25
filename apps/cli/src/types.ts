import z from 'zod';

export const ProjectNameSchema = z
	.string()
	.min(1, 'Project name cannot be empty')
	.max(255, 'Project name must be less than 255 characters')
	.refine(
		(name) => name === '.' || !name.startsWith('.'),
		"Project name cannot start with a dot (except for '.')"
	)
	.refine(
		(name) => name === '.' || !name.startsWith('-'),
		'Project name cannot start with a dash'
	)
	.refine((name) => {
		const invalidChars = ['<', '>', ':', '"', '|', '?', '*'];
		return !invalidChars.some((char) => name.includes(char));
	}, 'Project name contains invalid characters')
	.refine(
		(name) => name === name.toLowerCase(),
		'Project name cannot contain capital letters'
	)
	.refine(
		(name) => name.toLowerCase() !== 'node_modules',
		'Project name is reserved'
	)
	.describe('Project name or path');
export type ProjectName = z.infer<typeof ProjectNameSchema>;

export const DatabaseSchema = z
	.enum(['postgres', 'supabase', 'mongodb'])
	.describe('Database type');
export type Database = z.infer<typeof DatabaseSchema>;

export const AuthSchema = z
	.enum(['none', 'betterAuth', 'supabaseAuth'])
	.describe('Authentication');
export type Auth = z.infer<typeof AuthSchema>;

export const AnalyticsSchema = z
	.enum(['none', 'posthog', 'umami'])
	.describe('Analytics');
export type Analytics = z.infer<typeof AnalyticsSchema>;

export const PaymentSchema = z
	.enum(['none', 'stripe', 'lemonsqueezy'])
	.describe('Payment');
export type Payment = z.infer<typeof PaymentSchema>;

export const EmailSchema = z
	.boolean()	
	.describe('Email');
export type Email = z.infer<typeof EmailSchema>;

export const PackageManagerSchema = z
	.enum(['npm', 'pnpm', 'bun'])
	.describe('Package manager');
export type PackageManager = z.infer<typeof PackageManagerSchema>;

export type CreateInput = {
	projectName?: string;
	yes?: boolean;
	database?: Database;
	analytics?: Analytics;
	payment?: Payment;
	auth?: Auth;
	email?: Email;
	git?: boolean;
	packageManager?: PackageManager;
	install?: boolean;
};

export type CLIInput = CreateInput & {
	projectDirectory?: string;
};

export interface ProjectConfig {
	projectName: string;
	projectDir: string;
	relativePath: string;
	analytics: Analytics;
	database: Database;
	payment: Payment;
	auth: Auth;
	email: Email;
	git: boolean;
	packageManager: PackageManager;
	install: boolean;
}

export interface FreeShipFastConfig {
	version: string;
	createdAt: string;
	analytics: Analytics;
	payment: Payment;
	auth: Auth;
	email: Email;
	database: Database;
	packageManager: PackageManager;
}

export type AvailablePackageManagers = 'npm' | 'pnpm' | 'bun';
