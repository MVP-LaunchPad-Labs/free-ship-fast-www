'use client';

import { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { LineSection } from '@/components/builder/line-section';
import { ProjectInfoPanel } from '@/components/builder/project-info-panel';
import type {
	BuilderConfig,
	Database,
	Auth,
	Analytics,
	Payment,
	PackageManager,
} from '@/types/builder';
import {
	DEFAULT_BUILDER_CONFIG,
	DATABASE_OPTIONS,
	ANALYTICS_OPTIONS,
	PAYMENT_OPTIONS,
	PACKAGE_MANAGER_OPTIONS,
	GIT_OPTIONS,
	EMAIL_OPTIONS,
	INSTALL_OPTIONS,
} from '@/types/builder';
import { getCompatibleAuthOptions, getDefaultAuth } from '@/lib/builder-utils';

export default function Builder() {
	const [config, setConfig] = useState<BuilderConfig>(DEFAULT_BUILDER_CONFIG);

	// Update auth when database changes to ensure compatibility
	useEffect(() => {
		const compatibleAuthOptions = getCompatibleAuthOptions(config.database);
		const currentAuthIsCompatible = compatibleAuthOptions.some(
			(option) => option.value === config.auth && !option.disabled
		);

		if (!currentAuthIsCompatible) {
			const defaultAuth = getDefaultAuth(config.database);
			setConfig((prev) => ({ ...prev, auth: defaultAuth }));
		}
	}, [config.database, config.auth]);

	const handleDatabaseChange = (database: Database) => {
		setConfig((prev) => ({ ...prev, database }));
	};

	const handleAuthChange = (auth: Auth) => {
		setConfig((prev) => ({ ...prev, auth }));
	};

	const handleAnalyticsChange = (analytics: Analytics) => {
		setConfig((prev) => ({ ...prev, analytics }));
	};

	const handlePaymentChange = (payment: Payment) => {
		setConfig((prev) => ({ ...prev, payment }));
	};

	const handlePackageManagerChange = (packageManager: PackageManager) => {
		setConfig((prev) => ({ ...prev, packageManager }));
	};

	const handleGitChange = (git: boolean) => {
		setConfig((prev) => ({ ...prev, git }));
	};

	const handleEmailChange = (email: boolean) => {
		setConfig((prev) => ({ ...prev, email }));
	};

	const handleInstallChange = (install: boolean) => {
		setConfig((prev) => ({ ...prev, install }));
	};

	const authOptions = getCompatibleAuthOptions(config.database);

	return (
		<main className='h-[calc(100vh-70px)] bg-background relative'>
			<div className='grid grid-cols-1 lg:grid-cols-8 gap-8 h-full'>
				{/* Left Column - Project Info & Command (2 columns) */}
				<div className='lg:col-span-2 relative border-r border-border overflow-y-auto py-12'>
					<ProjectInfoPanel
						config={config}
						onConfigChange={setConfig}
					/>
				</div>

				{/* Right Column - Selection Grid (3 columns) */}
				<div className='lg:col-span-6 overflow-y-auto no-scrollbar py-12'>
					<div className='space-y-8 py-8'>
						{/* Database Section */}
						<LineSection
							title='Database'
							options={DATABASE_OPTIONS}
							selectedValue={config.database}
							onSelect={handleDatabaseChange}
							columns={3}
						/>

						{/* Authentication Section */}
						<LineSection
							title='Authentication'
							options={authOptions}
							selectedValue={config.auth}
							onSelect={handleAuthChange}
							columns={3}
						/>

						{/* Payment Section */}
						<LineSection
							title='Payment'
							options={PAYMENT_OPTIONS}
							selectedValue={config.payment}
							onSelect={handlePaymentChange}
							columns={3}
						/>

						{/* Analytics Section */}
						<LineSection
							title='Analytics'
							options={ANALYTICS_OPTIONS}
							selectedValue={config.analytics}
							onSelect={handleAnalyticsChange}
							columns={3}
						/>

						{/* Runtime Section */}
						<LineSection
							title='Runtime'
							options={PACKAGE_MANAGER_OPTIONS}
							selectedValue={config.packageManager}
							onSelect={handlePackageManagerChange}
							columns={3}
						/>

						{/* Git Section */}
						<LineSection
							title='Git'
							options={GIT_OPTIONS}
							selectedValue={config.git}
							onSelect={handleGitChange}
							columns={2}
						/>

						{/* Install Section */}
						<LineSection
							title='Install'
							options={INSTALL_OPTIONS}
							selectedValue={config.install}
							onSelect={handleInstallChange}
							columns={2}
						/>
					</div>
				</div>
			</div>
		</main>
	);
}
