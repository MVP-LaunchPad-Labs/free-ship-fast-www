import Footer from '@/components/home/footer';
import Navbar from '@/components/home/navbar';

export default function HomeLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<Navbar />
			<div className=' px-3 sm:px-6 lg:px-8'>
				<main className=' mt-24 mb-12 max-w-6xl  mx-auto border border-border'>
					{children}
				</main>
			</div>

			<Footer />
		</>
	);
}
