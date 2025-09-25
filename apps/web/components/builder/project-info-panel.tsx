'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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

interface ProjectInfoPanelProps {
	config: BuilderConfig;
	onConfigChange: (config: BuilderConfig) => void;
}

export function ProjectInfoPanel({ config, onConfigChange }: ProjectInfoPanelProps) {
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
		<div className='space-y-6  top-0 h-full '>
			{/* Project Name */}
			<div className='p-6 '>
				<h3 className='text-xl font-bold mb-4'>Project Name</h3>
				<div className='space-y-4'>
					<div className='space-y-2'>
						<Input
							value={config.projectName}
							onChange={(e) => updateConfig({ projectName: e.target.value })}
							placeholder='my-better-t-app'
							className={cn(
								'text-lg font-mono',
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
				</div>
			</div>

			{/* CLI Command */}
			<div className='p-6'>
				<div className='flex items-center justify-between mb-4'>
					<h3 className='text-lg font-semibold flex items-center space-x-2'>
						<Terminal className='w-5 h-5' />
						<span>CLI Command</span>
					</h3>
					<Button
						size='sm'
						variant='outline'
						onClick={handleCopy}
						className='h-8'
					>
						{copied ? (
							<>
								<Check className='w-3 h-3 mr-1' />
								Copied
							</>
						) : (
							<>
								<Copy className='w-3 h-3 mr-1' />
								Copy
							</>
						)}
					</Button>
				</div>
				<div className='bg-muted/50 p-4 font-mono text-sm break-all border rounded-md'>
					{command}
				</div>
				{!validation.isValid && (
					<div className='space-y-2 mt-4'>
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
			</div>

			{/* Selected Stack Summary */}
			<div className='p-6'>
				<h3 className='text-lg font-semibold mb-4'>Selected Stack</h3>
				<div className='flex flex-wrap gap-2'>
					{stackSummary.map((item) => (
						<Badge
							key={item.category}
							variant='secondary'
							className='text-xs flex items-center space-x-1'
						>
							{item.icon && (
								<span className='w-3 h-3'>
									<item.icon className='w-3 h-3' />
								</span>
							)}
							<span>{item.value}</span>
						</Badge>
					))}
				</div>
			</div>
		</div>
	);
}
