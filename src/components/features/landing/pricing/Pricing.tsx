'use client'

import { PricingHero } from '@/components/features/landing/pricing/PricingHero'
import { PricingPlans } from '@/components/features/landing/pricing/PricingPlans'
import { WidthLayoutContainer } from '@/components/layout/WidthLayoutContainer'

export function Pricing() {
	return (
		<WidthLayoutContainer>
			<PricingHero />
			<PricingPlans />
		</WidthLayoutContainer>
	)
}
