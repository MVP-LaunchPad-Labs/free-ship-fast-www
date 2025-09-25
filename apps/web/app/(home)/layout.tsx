import Footer from '@/components/home/footer';
import Navbar from '@/components/home/navbar';

export default function HomeLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<Navbar />
			<div className=' px-3 sm:px-6 lg:px-8'>{children}</div>

			<Footer />
		</>
	);
}
