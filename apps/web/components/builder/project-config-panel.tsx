'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Check, Terminal } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BuilderConfig } from '@/types/builder';
import {
	generateCommand,
	getStackSummary,
	copyToClipboard,
	validateConfig,
} from '@/lib/builder-utils';

interface ProjectConfigPanelProps {
	config: BuilderConfig;
	onConfigChange: (config: BuilderConfig) => void;
}

export function ProjectConfigPanel({ config, onConfigChange }: ProjectConfigPanelProps) {
	const [copied, setCopied] = useState(false);
	const command = generateCommand(config);
	const stackSummary = getStackSummary(config);
	const validation = validateConfig(config);

	const handleCopy = async () => {
		try {
			await copyToClipboard(command);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch (error) {
			console.error('Failed to copy:', error);
		}
	};

	const updateConfig = (updates: Partial<BuilderConfig>) => {
		onConfigChange({ ...config, ...updates });
	};

	return (
		<div className='space-y-6'>
			{/* Project Configuration */}
			<Card>
				<CardHeader>
					<CardTitle className='text-lg font-semibold'>Project Configuration</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div className='space-y-2'>
						<Label htmlFor='project-name'>Project Name</Label>
						<Input
							id='project-name'
							value={config.projectName}
							onChange={(e) => updateConfig({ projectName: e.target.value })}
							placeholder='my-saas-app'
							className={cn(
								validation.errors.some((error) => error.includes('Project name')) &&
									'border-destructive focus:border-destructive'
							)}
						/>
						{validation.errors
							.filter((error) => error.includes('Project name'))
							.map((error, index) => (
								<p
									key={index}
									className='text-xs text-destructive'
								>
									{error}
								</p>
							))}
					</div>

					<div className='grid grid-cols-1 gap-4'>
						<div className='flex items-center justify-between'>
							<div className='space-y-1'>
								<Label>Initialize Git Repository</Label>
								<p className='text-xs text-muted-foreground'>
									Set up version control for your project
								</p>
							</div>
							<Switch
								checked={config.git}
								onCheckedChange={(git) => updateConfig({ git })}
							/>
						</div>

						<div className='flex items-center justify-between'>
							<div className='space-y-1'>
								<Label>Install Dependencies</Label>
								<p className='text-xs text-muted-foreground'>
									Automatically install packages after creation
								</p>
							</div>
							<Switch
								checked={config.install}
								onCheckedChange={(install) => updateConfig({ install })}
							/>
						</div>

						<div className='flex items-center justify-between'>
							<div className='space-y-1'>
								<Label>Email Integration</Label>
								<p className='text-xs text-muted-foreground'>Add email functionality with Resend</p>
							</div>
							<Switch
								checked={config.email}
								onCheckedChange={(email) => updateConfig({ email })}
							/>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* Selected Stack Summary */}
			<Card>
				<CardHeader>
					<CardTitle className='text-lg font-semibold'>Selected Stack</CardTitle>
				</CardHeader>
				<CardContent>
					<div className='grid gap-3'>
						{stackSummary.map((item) => (
							<div
								key={item.category}
								className='flex items-center justify-between'
							>
								<div className='flex items-center space-x-2'>
									{item.icon && (
										<span className='w-5 h-5'>
											<item.icon className='w-5 h-5' />
										</span>
									)}
									<div>
										<p className='text-sm font-medium'>{item.category}</p>
										<p className='text-xs text-muted-foreground'>{item.label}</p>
									</div>
								</div>
								<Badge
									variant='secondary'
									className='text-xs'
								>
									{item.label}
								</Badge>
							</div>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Generated Command */}
			<Card>
				<CardHeader>
					<CardTitle className='text-lg font-semibold flex items-center space-x-2'>
						<Terminal className='w-5 h-5' />
						<span>CLI Command</span>
					</CardTitle>
				</CardHeader>
				<CardContent className='space-y-4'>
					<div className='relative'>
						<div className='bg-muted p-3 rounded-md font-mono text-sm break-all'>{command}</div>
						<Button
							size='sm'
							variant='outline'
							onClick={handleCopy}
							className='absolute top-2 right-2 h-7 w-7 p-0'
						>
							{copied ? <Check className='w-3 h-3' /> : <Copy className='w-3 h-3' />}
						</Button>
					</div>

					{!validation.isValid && (
						<div className='space-y-2'>
							<p className='text-sm font-medium text-destructive'>Configuration Issues:</p>
							{validation.errors.map((error, index) => (
								<p
									key={index}
									className='text-xs text-destructive'
								>
									• {error}
								</p>
							))}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
