'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { StackOption, StackCategory } from '@/types/builder';
import { StackOptionCard } from './stack-option-card';

interface StackCategoryProps<T = string> {
	category: StackCategory;
	options: StackOption<T>[];
	selectedValue: T;
	onSelect: (value: T) => void;
}

export function StackCategoryComponent<T = string>({
	category,
	options,
	selectedValue,
	onSelect,
}: StackCategoryProps<T>) {
	return (
		<Card className='w-full'>
			<CardHeader className='pb-3'>
				<div className='flex items-center justify-between'>
					<CardTitle className='text-lg font-semibold'>{category.title}</CardTitle>
					{category.required && (
						<Badge
							variant='outline'
							className='text-xs'
						>
							Required
						</Badge>
					)}
				</div>
				<p className='text-sm text-muted-foreground'>{category.description}</p>
			</CardHeader>
			<CardContent className='pt-0'>
				<div className='grid gap-3'>
					{options.map((option) => (
						<StackOptionCard
							key={String(option.value)}
							option={option}
							isSelected={option.value === selectedValue}
							onClick={() => onSelect(option.value)}
						/>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
