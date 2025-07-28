import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { RootProvider } from 'fumadocs-ui/provider';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Free Ship Fast - Free Next.js SaaS Boilerplate',
	description:
		'Launch your SaaS product fast with our free, open-source Next.js boilerplate. Complete with authentication, payments, database integration, and more.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<head>
				<meta
					name='apple-mobile-web-app-title'
					content='Free Ship Fast'
				/>
			</head>
			<body
				className={`${geistSans.className} ${geistMono.variable} antialiased `}
			>
				<RootProvider theme={{ forcedTheme: 'dark' }}>{children}</RootProvider>
			</body>
		</html>
	);
}
