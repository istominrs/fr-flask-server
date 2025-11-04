'use client'

import { HeroBanner } from '@/components/features/landing/hero/HeroBanner'
import { HeroProposition } from '@/components/features/landing/hero/HeroProposition'
import { WidthLayoutContainer } from '@/components/layout/WidthLayoutContainer'

export function Hero() {
	return (
        <section id='about-us'>
            <WidthLayoutContainer className='mt-28 mb-12 flex flex-col items-center justify-center text-center sm:mt-40'>
                <HeroBanner />
            </WidthLayoutContainer>
            <HeroProposition />
        </section>
	)
}
