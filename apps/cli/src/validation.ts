import path from 'node:path';
import { consola } from 'consola';
import {
	type CLIInput,
	type Database,
	type PackageManager,
	type ProjectConfig,
	ProjectNameSchema,
} from './types';
import { resolvePath } from './utils/fs';

export function processAndValidateFlags(
	options: CLIInput,
	providedFlags: Set<string>,
	projectName?: string
): Partial<ProjectConfig> {
	const config: Partial<ProjectConfig> = {};
	if (options.database) {
		config.database = options.database as Database;
	}
	if (options.auth !== undefined) {
		config.auth = options.auth;
	}
	if (options.git !== undefined) {
		config.git = options.git;
	}
	if (options.install !== undefined) {
		config.install = options.install;
	}
	if (options.packageManager) {
		config.packageManager = options.packageManager as PackageManager;
	}

	if (projectName) {
		const result = ProjectNameSchema.safeParse(path.basename(projectName));
		if (!result.success) {
			consola.fatal(
				`Invalid project name: ${
					result.error.issues[0]?.message || 'Invalid project name'
				}`
			);
			process.exit(1);
		}
		config.projectName = projectName;
	} else if (options.projectDirectory) {
		const baseName = path.basename(resolvePath(options.projectDirectory));
		const result = ProjectNameSchema.safeParse(baseName);
		if (!result.success) {
			consola.fatal(
				`Invalid project name: ${
					result.error.issues[0]?.message || 'Invalid project name'
				}`
			);
			process.exit(1);
		}
		config.projectName = baseName;
	}
	
	// Handle analytics and payment options
	if (options.analytics !== undefined) {
		config.analytics = options.analytics;
	}
	if (options.payment !== undefined) {
		config.payment = options.payment;
	}
	
	// Validate that database is provided when auth is specified
	if (providedFlags.has('auth') && !providedFlags.has('database')) {
		consola.fatal(
			'Authentication option requires a database to be specified. Please specify a database using --database.'
		);
		process.exit(1);
	}
	
	// Validate database and auth compatibility
	if (config.database === 'supabase') {
		if (config.auth === 'betterAuth') {
			consola.fatal(
				'Better Auth is not compatible with Supabase. Supabase provides its own authentication system. Please choose either Supabase with Supabase Auth or another database with Better Auth.'
			);
			process.exit(1);
		}
		// Force supabaseAuth when supabase database is specified and no auth provided
		if (!providedFlags.has('auth')) {
			config.auth = 'supabaseAuth';
		}
	}

	// Validate MongoDB with Supabase Auth incompatibility
	if (config.database === 'mongodb' && config.auth === 'supabaseAuth') {
		consola.fatal(
			'Supabase Auth requires Supabase database. Please use Supabase database with Supabase Auth or choose a different auth provider for MongoDB.'
		);
		process.exit(1);
	}

	// Validate Postgres with Supabase Auth incompatibility  
	if (config.database === 'postgres' && config.auth === 'supabaseAuth') {
		consola.fatal(
			'Supabase Auth requires Supabase database. Please use Supabase database with Supabase Auth or choose a different auth provider for Postgres.'
		);
		process.exit(1);
	}

	// Default to betterAuth for postgres/mongodb if no auth specified
	if ((config.database === 'postgres' || config.database === 'mongodb') && !providedFlags.has('auth')) {
		config.auth = 'betterAuth';
	}

	return config;
}

export function validateConfigCompatibility(config: Partial<ProjectConfig>) {
	// This function can be used for additional validation if needed
	// Currently all validation is handled in processAndValidateFlags
}

export function getProvidedFlags(options: CLIInput): Set<string> {
	return new Set(
		Object.keys(options).filter(
			(key) => options[key as keyof CLIInput] !== undefined
		)
	);
}
