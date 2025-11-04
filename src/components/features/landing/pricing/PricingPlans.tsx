'use client'

import { PricingCard } from '@/components/features/landing/pricing/PricingCard'
import type { PricingPlan } from '@/components/features/landing/pricing/pricing.interface'

export function PricingPlans() {
	const plans: PricingPlan[] = [
		{
			name: 'Basic',
			price: 29,
			period: 'month',
			description: 'Perfect for getting started with automated trading',
			features: [
				'Unlimited trading volume',
				'Pre-configured strategies',
				'Basic grid trading',
				'Email support',
				'Dashboard access',
				'Up to 3 connected exchanges'
			],
			buttonText: 'Get Started',
			buttonHref: '/account/create'
		},
		{
			name: 'Pro',
			price: 79,
			period: 'month',
			description: 'For serious traders who need advanced features',
			isPopular: true,
			features: [
				'Everything in Basic',
				'Custom strategy builder',
				'Advanced grid trading',
				'Priority email support',
				'24/7 trading alerts',
				'Unlimited connected exchanges',
				'Backtesting tools',
				'Risk management features'
			],
			buttonText: 'Start Free Trial',
			buttonHref: '/account/create'
		},
		{
			name: 'Enterprise',
			price: 199,
			period: 'month',
			description: 'Empowering teams and high-volume professionals',
			features: [
				'Everything in Pro',
				'Dedicated account manager',
				'Custom integrations',
				'Phone & priority support',
				'Advanced analytics',
				'Multi-account management',
				'API access',
				'Custom reporting'
			],
			buttonText: 'Contact Sales',
			buttonHref: '/account/create'
		}
	]

	return (
		<section className='mb-16'>
			<div className='grid grid-cols-1 gap-8 md:grid-cols-3 lg:gap-6'>
				{plans.map((plan, index) => (
					<PricingCard key={index} plan={plan} />
				))}
			</div>
		</section>
	)
}
