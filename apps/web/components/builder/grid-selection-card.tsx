'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import type { StackOption } from '@/types/builder';

interface GridSelectionCardProps<T = string> {
	option: StackOption<T>;
	isSelected: boolean;
	onClick: () => void;
	className?: string;
}

export function GridSelectionCard<T = string>({
	option,
	isSelected,
	onClick,
	className,
}: GridSelectionCardProps<T>) {
	return (
		<Card
			className={cn(
				'cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02]',
				'border py-0 relative overflow-hidden group h-20',
				isSelected
					? 'border-primary/10 bg-muted shadow-lg ring-1 ring-primary/30'
					: 'border-border/40 bg-card/60 hover:bg-accent/30 hover:border-primary/10',
				option.disabled && 'cursor-not-allowed opacity-40 hover:scale-100',
				className
			)}
			onClick={option.disabled ? undefined : onClick}
		>
			<CardContent className='p-5 h-full flex flex-row items-center gap-4 text-left'>
				{option.icon && (
					<div className='flex-shrink-0 mr-3'>
						<option.icon className='w-9 h-9 text-current opacity-80' />
					</div>
				)}
				<div className='flex flex-col flex-1 min-w-0'>
					<h3
						className={cn(
							'font-semibold text-base mb-1',
							isSelected ? 'text-primary' : 'text-foreground'
						)}
					>
						{option.label}
					</h3>
					<p className='text-xs text-muted-foreground leading-snug line-clamp-2'>
						{option.description}
					</p>
				</div>
				{isSelected && (
					<div className='absolute top-2 right-2'>
						<div className='w-2.5 h-2.5 bg-primary rounded-full'></div>
					</div>
				)}
				{option.disabled && (
					<div className='absolute inset-0 bg-background/80 flex items-center justify-center'>
						<p className='text-xs text-destructive font-medium text-center px-2'>
							{option.disabledReason}
						</p>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
