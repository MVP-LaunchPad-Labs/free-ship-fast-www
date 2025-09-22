'use client';

import { cn } from '@/lib/utils';
import type { StackOption } from '@/types/builder';
import { GridSelectionCard } from './grid-selection-card';

interface GridSelectionSectionProps<T = string> {
	title: string;
	options: StackOption<T>[];
	selectedValue: T;
	onSelect: (value: T) => void;
	columns?: number;
}

export function GridSelectionSection<T = string>({
	title,
	options,
	selectedValue,
	onSelect,
	columns = 3,
}: GridSelectionSectionProps<T>) {
	const gridCols =
		{
			2: 'grid-cols-2',
			3: 'grid-cols-3',
			4: 'grid-cols-4',
		}[columns] || 'grid-cols-3';

	return (
		<div className='space-y-4'>
			<div className='flex items-center space-x-2'>
				<div className='w-2 h-2 bg-primary rounded-full'></div>
				<h3 className='text-xl font-semibold text-foreground'>{title}</h3>
			</div>
			<div className={cn('grid gap-4', gridCols)}>
				{options.map((option) => (
					<GridSelectionCard
						key={String(option.value)}
						option={option}
						isSelected={option.value === selectedValue}
						onClick={() => onSelect(option.value)}
					/>
				))}
			</div>
		</div>
	);
}
