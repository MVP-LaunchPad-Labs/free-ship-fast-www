import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { AuroraText } from '@/components/magicui/aurora-text';
import Link from 'fumadocs-core/link';

export default function HeroSection() {
	return (
		<section className='relative py-16 sm:py-24 md:py-28 lg:py-36'>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 z-50 relative'>
				<div className='mx-auto max-w-4xl text-center'>
					<h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal text-shadow-xs tracking-tight text-foreground leading-tight'>
						Build and{' '}
						<AuroraText
							colors={['#10b981', '#06b6d4', '#3b82f6']}
							speed={1.5}
						>
							ship
						</AuroraText>{' '}
						lightning <br className='hidden sm:block'></br> fast for free
					</h1>

					<p className='mt-4 sm:mt-6 text-sm sm:text-base leading-relaxed text-muted-foreground max-w-xl sm:max-w-2xl mx-auto text-shadow-xs px-4 sm:px-0'>
						The open-source Next.js boilerplate that gets you to production in
						hours, not weeks.
					</p>

					<div className='mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6 z-50 px-4 sm:px-0'>
						<Button
							size='lg'
							className='w-full sm:w-auto rounded-full shadow-inner shadow-black bg-white px-6 sm:px-8 py-3 sm:py-4 h-10 sm:h-11 text-sm sm:text-base text-black hover:bg-gray-100 focus-visible:outline-offset-2 focus-visible:outline-gray-500 transition-colors text-shadow-xs'
						>
							<Link href='/'>Start Building Now</Link>
						</Button>

						<Button
							variant='ghost'
							size='lg'
							asChild
							className='w-full sm:w-auto text-sm sm:text-base font-medium leading-6 text-foreground hover:text-muted-foreground transition-colors h-10 sm:h-11 rounded-full group'
						>
							<Link
								href='https://github.com'
								className='flex items-center justify-center gap-2'
							>
								<svg
									className='w-4 h-4 sm:w-5 sm:h-5'
									fill='currentColor'
									viewBox='0 0 24 24'
								>
									<path d='M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12' />
								</svg>
								<span className='hidden xs:inline'>Explore Code</span>
								<span className='xs:hidden'>Code</span>
								<span aria-hidden='true' className='group-hover:translate-x-1 transition-transform'>→</span>
							</Link>
						</Button>
					</div>
				</div>
			</div>

			{/* Background decoration */}
			<div className='absolute inset-0 z-0'>
				<Image
					src='/images/hero.png'
					alt=''
					width={1754}
					height={544}
					className='opacity-[0.35] w-full h-auto object-contain'
					style={{
						mixBlendMode: 'screen',
						maskImage: 'linear-gradient(black, transparent)',
					}}
					priority
				/>
			</div>
		</section>
	);
}
