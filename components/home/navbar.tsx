'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import GithubIcon from '@/components/icons/github';

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	const navigationItems = [
		{ href: '/docs', label: 'Documentation' },
		{ href: '/templates', label: 'Templates' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/showcase', label: 'Showcase' },
		{ href: '/sponsors', label: 'Sponsors' },
	];

	return (
		<header
			id="nd-nav"
			className="fixed top-0 z-[9999] left-0 right-0 backdrop-blur-lg border-b transition-colors bg-background "
			aria-label="Main"
		>
			<div className="max-w-6xl mx-auto">
				<nav className="flex h-14 w-full items-center px-4">
					{/* Logo */}
					<Link className="inline-flex items-center gap-2.5 font-semibold" href="/">
						<Logo size="md" />
						<span className="font-medium text-[15px]">Free Ship Fast</span>
					</Link>

					{/* Desktop Navigation */}
					<ul className="hidden lg:flex flex-row items-center gap-2 px-6">
						{navigationItems.slice(0, 2).map((item) => (
							<li key={item.href}>
								<Button variant="ghost" size="sm" asChild>
									<Link href={item.href}>
										{item.label}
									</Link>
								</Button>
							</li>
						))}
					</ul>

					{/* Right Side Actions */}
					<div className="flex flex-row items-center justify-end gap-1.5 flex-1">
						{/* Try it Now Button */}
						<Button 
							size="sm" 
							className="rounded-full bg-[#1A1A1A] hover:bg-[#2A2A2A] border border-[#252525] text-white"
						>
							Try it Now
						</Button>

						{/* GitHub Link */}
						<Button variant="ghost" size="sm" asChild className="hidden lg:inline-flex">
							<Link
								href="https://github.com"
								rel="noreferrer noopener"
								target="_blank"
							>
								<GithubIcon className="size-5" />
							</Link>
						</Button>

						{/* Mobile Menu */}
						<Sheet open={isOpen} onOpenChange={setIsOpen}>
							<SheetTrigger asChild>
								<Button variant="ghost" size="sm" className="lg:hidden">
									<Menu className="size-5" />
									<span className="sr-only">Toggle Menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent side="right" className="w-[300px] sm:w-[400px]">
								<div className="flex flex-col gap-4 mt-8">
									{navigationItems.map((item) => (
										<Button 
											key={item.href} 
											variant="ghost" 
											className="justify-start" 
											asChild
										>
											<Link 
												href={item.href}
												onClick={() => setIsOpen(false)}
											>
												{item.label}
											</Link>
										</Button>
									))}
									<Button variant="ghost" className="justify-start" asChild>
										<Link
											href="https://github.com"
											rel="noreferrer noopener"
											target="_blank"
											onClick={() => setIsOpen(false)}
										>
											<GithubIcon className="size-4 mr-2" />
											GitHub
										</Link>
									</Button>
								</div>
							</SheetContent>
						</Sheet>
					</div>
				</nav>
			</div>
		</header>
	);
}
