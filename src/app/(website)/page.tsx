import { HeroBanner } from '@/components/features/landing/HeroBanner'
import { HeroFeature } from '@/components/features/landing/HeroFeature'
import { HeroProposition } from '@/components/features/landing/HeroProposition'
import { WidthLayoutContainer } from '@/components/layout/WidthLayoutContainer'

export default async function HomePage() {
	return (
		<>
			<WidthLayoutContainer className='mt-28 mb-12 flex flex-col items-center justify-center text-center sm:mt-40'>
				<HeroBanner />
			</WidthLayoutContainer>
			<HeroProposition />
			<HeroFeature />
		</>
	)
}
