import HeroSection from "@/components/home/hero"
import Features from "@/components/home/features"
import Pricing from "@/components/home/pricing"
import FAQs from "@/components/home/faqs"
import CTA from "@/components/home/cta"
type Props = {}
const page = (props: Props) => {
	return (
		<>
			<HeroSection />
			<div className='h-8 bg-dashed'></div>
			<Features />
			<div className='h-8 bg-dashed'></div>
			<Pricing />
			<div className='h-8 bg-dashed'></div>
			<FAQs />
			<div className='h-8 bg-dashed'></div>
			<CTA />
		</>

	);
}
export default page