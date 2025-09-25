import React from 'react';
import type {
	BuilderConfig,
	Database,
	Auth,
	Analytics,
	Payment,
	PackageManager,
	StackOption,
	DATABASE_AUTH_COMPATIBILITY,
} from '../types/builder';
import {
	AUTH_OPTIONS,
	ANALYTICS_OPTIONS,
	PAYMENT_OPTIONS,
	PACKAGE_MANAGER_OPTIONS,
	DATABASE_OPTIONS,
} from '../types/builder';

export function getCompatibleAuthOptions(database: Database): StackOption<Auth>[] {
	const compatibleAuthTypes = {
		postgres: ['betterAuth', 'none'],
		supabase: ['supabaseAuth'],
		mongodb: ['betterAuth', 'none'],
	}[database];

	return AUTH_OPTIONS.map((option) => ({
		...option,
		disabled: !compatibleAuthTypes.includes(option.value),
		disabledReason: !compatibleAuthTypes.includes(option.value)
			? `${option.label} is not compatible with ${database}`
			: undefined,
	}));
}

export function getDefaultAuth(database: Database): Auth {
	const defaults = {
		postgres: 'betterAuth' as Auth,
		supabase: 'supabaseAuth' as Auth,
		mongodb: 'betterAuth' as Auth,
	};
	return defaults[database];
}

export function validateConfig(config: BuilderConfig): {
	isValid: boolean;
	errors: string[];
} {
	const errors: string[] = [];

	// Validate project name
	if (!config.projectName.trim()) {
		errors.push('Project name is required');
	}

	if (config.projectName.includes(' ')) {
		errors.push('Project name cannot contain spaces');
	}

	if (config.projectName.startsWith('.') && config.projectName !== '.') {
		errors.push('Project name cannot start with a dot');
	}

	if (config.projectName.startsWith('-')) {
		errors.push('Project name cannot start with a dash');
	}

	const invalidChars = ['<', '>', ':', '"', '|', '?', '*'];
	if (invalidChars.some((char) => config.projectName.includes(char))) {
		errors.push('Project name contains invalid characters');
	}

	if (config.projectName !== config.projectName.toLowerCase()) {
		errors.push('Project name must be lowercase');
	}

	if (config.projectName.toLowerCase() === 'node_modules') {
		errors.push('Project name is reserved');
	}

	// Validate database-auth compatibility
	const compatibleAuthTypes = {
		postgres: ['betterAuth', 'none'],
		supabase: ['supabaseAuth'],
		mongodb: ['betterAuth', 'none'],
	}[config.database];

	if (!compatibleAuthTypes.includes(config.auth)) {
		errors.push(`${config.auth} is not compatible with ${config.database} database`);
	}

	return {
		isValid: errors.length === 0,
		errors,
	};
}

export function generateCommand(config: BuilderConfig): string {
	const parts = ['npx create-launch-pad-app2', config.projectName];

	// Add flags for non-default options
	if (config.database !== 'postgres') {
		parts.push(`--database ${config.database}`);
	}

	if (config.auth !== getDefaultAuth(config.database)) {
		parts.push(`--auth ${config.auth}`);
	}

	if (config.analytics !== 'umami') {
		parts.push(`--analytics ${config.analytics}`);
	}

	if (config.payment !== 'stripe') {
		parts.push(`--payment ${config.payment}`);
	}

	if (!config.git) {
		parts.push('--no-git');
	}

	if (config.packageManager !== 'npm') {
		parts.push(`--package-manager ${config.packageManager}`);
	}

	if (!config.install) {
		parts.push('--no-install');
	}

	return parts.join(' ');
}

export function getStackSummary(config: BuilderConfig): Array<{
	category: string;
	value: string;
	label: string;
	icon?: React.ComponentType<{ className?: string }>;
}> {
	const findOption = <T>(options: StackOption<T>[], value: T) =>
		options.find((opt) => opt.value === value);

	const summary = [
		{
			category: 'Database',
			value: config.database,
			label: findOption(DATABASE_OPTIONS, config.database)?.label || config.database,
			icon: findOption(DATABASE_OPTIONS, config.database)?.icon,
		},
		{
			category: 'Authentication',
			value: config.auth,
			label: findOption(AUTH_OPTIONS, config.auth)?.label || config.auth,
			icon: findOption(AUTH_OPTIONS, config.auth)?.icon,
		},
		{
			category: 'Analytics',
			value: config.analytics,
			label: findOption(ANALYTICS_OPTIONS, config.analytics)?.label || config.analytics,
			icon: findOption(ANALYTICS_OPTIONS, config.analytics)?.icon,
		},
		{
			category: 'Payment',
			value: config.payment,
			label: findOption(PAYMENT_OPTIONS, config.payment)?.label || config.payment,
			icon: findOption(PAYMENT_OPTIONS, config.payment)?.icon,
		},
		{
			category: 'Package Manager',
			value: config.packageManager,
			label:
				findOption(PACKAGE_MANAGER_OPTIONS, config.packageManager)?.label || config.packageManager,
			icon: findOption(PACKAGE_MANAGER_OPTIONS, config.packageManager)?.icon,
		},
	];

	return summary.filter((item) => item.value !== 'none');
}

export function copyToClipboard(text: string): Promise<void> {
	if (navigator.clipboard && window.isSecureContext) {
		return navigator.clipboard.writeText(text);
	} else {
		// Fallback for older browsers
		const textArea = document.createElement('textarea');
		textArea.value = text;
		textArea.style.position = 'absolute';
		textArea.style.left = '-999999px';
		document.body.prepend(textArea);
		textArea.select();
		try {
			document.execCommand('copy');
		} finally {
			textArea.remove();
		}
		return Promise.resolve();
	}
}
