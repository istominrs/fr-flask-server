import { CTA } from '@/components/features/landing/cta/CTA'
import { FAQ } from '@/components/features/landing/faq/FAQ'
import { Feature } from '@/components/features/landing/feature/Feature'
import { Hero } from '@/components/features/landing/hero/Hero'

export default async function HomePage() {
	return (
		<>
			<Hero />
			<Feature />
			<FAQ />
			<CTA />
		</>
	)
}
