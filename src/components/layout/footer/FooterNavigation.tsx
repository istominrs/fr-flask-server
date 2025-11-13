'use client'

import { FooterSection } from '@/components/layout/footer/FooterSection'
import type { Section } from '@/components/layout/footer/section.interface'

export function FooterNavigation() {
	const sections: Section[] = [
		{
			title: 'Product',
			links: [
				{
					label: 'Dashboard',
					href: '/dashboard/overview'
				},
				{
					label: 'Strategies',
					href: '/dashboard/strategies'
				},
				{
					label: 'Backtests',
					href: '/dashboard/backtests'
				},
				{
					label: 'Billing',
					href: '/dashboard/billing'
				}
			]
		},
		{
			title: 'Account',
			links: [
				{
					label: 'Login',
					href: '/account/login'
				},
				{
					label: 'Register',
					href: '/account/create'
				},
				{
					label: 'Settings',
					href: '/dashboard/settings'
				},
				{
					label: 'Alerts',
					href: '/dashboard/alerts'
				},
				{
					label: 'Accounts',
					href: '/dashboard/stocks'
				}
			]
		}
	]

	return (
		<div className='flex flex-col gap-6 md:flex-row md:gap-12 lg:col-span-4'>
			{sections.map((section, index) => (
				<FooterSection key={index} section={section} />
			))}
		</div>
	)
}
