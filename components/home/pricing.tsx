'use client';

import { Check, Heart, Rocket, Code, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HighlightText } from '@/components/home/features';

export default function Pricing() {
	const coreFeatures = [
		'Complete Next.js 15 starter template',
		'Authentication system with Better Auth',
		'Database integration with postgres or mongodb',
		'Payment processing with stripe or lemonsqueezy',
		'Email system with resend',
	];

	const uiFeatures = [
		'UI components with shadcn/ui',
		'Tailwind CSS styling',
		'Responsive design',
		'Dark/Light mode support',
		'Mobile-first approach',
	];

	const devFeatures = [
		'TypeScript configuration',
		'SEO optimization',
		'Docker setup',
		'Deployment guides',
		'Hot reload & fast refresh',
	];

	const supportFeatures = [
		'Comprehensive documentation',
		'Community support',
		'Regular updates',
		'Example implementations',
	];

	const featureSections = [
		{ title: 'Core Features', icon: Rocket, features: coreFeatures },
		{ title: 'UI & Design', icon: Code, features: uiFeatures },
		{ title: 'Developer Tools', icon: Zap, features: devFeatures },
		{ title: 'Support & Docs', icon: Heart, features: supportFeatures },
	];

	return (
		<section className='pt-16'>
			<div className='text-center mb-12 px-4 sm:px-6 lg:px-8'>
				<h2 className='text-2xl sm:text-3xl font-semibold mb-4'>
					100% <HighlightText> Free Forever</HighlightText>
				</h2>
				<p className='text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto'>
					Our contribution to passionate entrepreneurs and dreamers who want to
					turn their ideas into reality. No hidden costs, no premium tiers, no
					catch - everything is completely free.
				</p>
			</div>

			{/* Grid Layout */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 lg:grid-rows-8 gap-0 lg:h-[800px] border-t border-dotted border-border'>
				{/* Main Pricing Card - Top Left Large */}
				<div className='sm:col-span-2 lg:col-span-6 lg:row-span-4 lg:border-r border-b border-border border-dotted'>
					<div className='h-full flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8'>
						<div className='text-center space-y-4'>
							<h3 className='text-xl sm:text-2xl'>Free Forever</h3>
							<p className='text-sm sm:text-base text-muted-foreground'>
								Everything you need to ship fast
							</p>
							<div className='py-3'>
								<span className='text-3xl sm:text-4xl font-bold'>$0</span>
								<span className='text-sm sm:text-base text-muted-foreground'>/forever</span>
							</div>
							<Button
								className='w-full rounded-none'
								size='sm'
							>
								Get Started Now
							</Button>

							<p className='text-xs text-muted-foreground pt-3'>
								No credit required • Start building immediately • Built with love
							</p>
						</div>
					</div>
				</div>

				{/* Core Features - Top Right */}
				<div className='sm:col-span-1 lg:col-span-6 lg:row-span-2 border-b border-border border-dotted'>
					<div className='h-full p-4 sm:p-6'>
						<div className='flex items-center gap-2 mb-4'>
							<Rocket className='h-5 w-5 text-primary' />
							<h4 className='text-base sm:text-lg font-medium'>Core Features</h4>
						</div>
						<div className='space-y-2'>
							{coreFeatures.slice(0, 3).map((feature, index) => (
								<div
									key={index}
									className='flex items-start gap-2'
								>
									<Check className='h-4 w-4 text-primary flex-shrink-0 mt-0.5' />
									<span className='text-xs sm:text-sm text-muted-foreground'>
										{feature}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* UI Features - Middle Right */}
				<div className='sm:col-span-1 lg:col-span-6 lg:row-span-2 border-b border-border border-dotted'>
					<div className='h-full p-4 sm:p-6'>
						<div className='flex items-center gap-2 mb-4'>
							<Code className='h-5 w-5 text-primary' />
							<h4 className='text-base sm:text-lg font-medium'>UI & Design</h4>
						</div>
						<div className='space-y-2'>
							{uiFeatures.slice(0, 3).map((feature, index) => (
								<div
									key={index}
									className='flex items-start gap-2'
								>
									<Check className='h-4 w-4 text-primary flex-shrink-0 mt-0.5' />
									<span className='text-xs sm:text-sm text-muted-foreground'>
										{feature}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Dev Tools - Bottom Left */}
				<div className='sm:col-span-1 lg:col-span-4 lg:row-span-2 sm:border-r lg:border-r border-b border-border border-dotted'>
					<div className='h-full p-4 sm:p-6'>
						<div className='flex items-center gap-2 mb-4'>
							<Zap className='h-5 w-5 text-primary' />
							<h4 className='text-sm sm:text-base font-medium'>Developer Tools</h4>
						</div>
						<div className='space-y-2'>
							{devFeatures.slice(0, 4).map((feature, index) => (
								<div
									key={index}
									className='flex items-start gap-2'
								>
									<Check className='h-3 w-3 text-primary flex-shrink-0 mt-0.5' />
									<span className='text-xs text-muted-foreground'>
										{feature}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Support - Bottom Middle */}
				<div className='sm:col-span-1 lg:col-span-4 lg:row-span-2 lg:border-r border-b border-border border-dotted'>
					<div className='h-full p-4 sm:p-6'>
						<div className='flex items-center gap-2 mb-4'>
							<Heart className='h-5 w-5 text-primary' />
							<h4 className='text-sm sm:text-base font-medium'>Support & Docs</h4>
						</div>
						<div className='space-y-2'>
							{supportFeatures.slice(0, 4).map((feature, index) => (
								<div
									key={index}
									className='flex items-start gap-2'
								>
									<Check className='h-3 w-3 text-primary flex-shrink-0 mt-0.5' />
									<span className='text-xs text-muted-foreground'>
										{feature}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Mission Statement - Bottom Right */}
				<div className='sm:col-span-2 lg:col-span-4 lg:row-span-2 border-b border-border border-dotted'>
					<div className='h-full p-4 sm:p-6 flex items-center'>
						<div className='text-center w-full'>
							<h4 className='text-sm sm:text-base font-medium mb-3'>Our Mission</h4>
							<p className='text-xs text-muted-foreground leading-relaxed'>
								Great ideas shouldn't be limited by budget. This is our way of
								giving back to passionate builders.
							</p>
						</div>
					</div>
				</div>

				{/* Bottom Message - Spans Full Width */}
				<div className='sm:col-span-2 lg:col-span-12 lg:row-span-2'>
					<div className='h-full p-4 sm:p-6 flex items-center justify-center'>
						<div className='text-center max-w-3xl'>
							<h3 className='text-lg sm:text-xl font-medium mb-4'>
								Built for Passionate Entrepreneurs
							</h3>
							<p className='text-xs sm:text-sm text-muted-foreground leading-relaxed'>
								We believe great ideas shouldn't be limited by budget. This is our
								way of giving back to the entrepreneurial community and helping turn
								dreams into successful startups. Every feature, every component,
								every line of code - completely free for passionate builders like
								you.
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}