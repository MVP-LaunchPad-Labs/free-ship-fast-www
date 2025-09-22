'use client';

import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { StackOption } from '@/types/builder';

interface StackOptionCardProps<T = string> {
	option: StackOption<T>;
	isSelected: boolean;
	onClick: () => void;
	className?: string;
}

export function StackOptionCard<T = string>({
	option,
	isSelected,
	onClick,
	className,
}: StackOptionCardProps<T>) {
	return (
		<Card
			className={cn(
				'cursor-pointer transition-all duration-200 hover:shadow-md hover:scale-[1.02]',
				'border-2 group',
				isSelected
					? 'border-primary bg-primary/5 shadow-md ring-1 ring-primary/20'
					: 'border-border hover:border-primary/50 hover:bg-accent/5',
				option.disabled && 'cursor-not-allowed opacity-50 hover:scale-100',
				className
			)}
			onClick={option.disabled ? undefined : onClick}
		>
			<CardContent className='p-4'>
				<div className='flex items-start space-x-3'>
					{option.icon && (
						<div className='text-2xl flex-shrink-0 mt-1'>
							<option.icon className='w-6 h-6' />
						</div>
					)}
					<div className='flex-1 min-w-0'>
						<div className='flex items-center justify-between mb-1'>
							<h3
								className={cn(
									'font-medium text-sm',
									isSelected ? 'text-primary' : 'text-foreground'
								)}
							>
								{option.label}
							</h3>
							{isSelected && (
								<Badge
									variant='default'
									className='text-xs'
								>
									Selected
								</Badge>
							)}
							{option.disabled && (
								<Badge
									variant='secondary'
									className='text-xs'
								>
									Incompatible
								</Badge>
							)}
						</div>
						<p className='text-xs text-muted-foreground leading-relaxed'>{option.description}</p>
						{option.disabled && option.disabledReason && (
							<p className='text-xs text-destructive mt-1'>{option.disabledReason}</p>
						)}
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
