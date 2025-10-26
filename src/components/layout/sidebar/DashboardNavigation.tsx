'use client'

import {
	Backpack,
	Bell,
	ChartPie,
	CreditCard,
	Key,
	ListChecks,
	Settings
} from 'lucide-react'

import { SidebarItem } from '@/components/layout/sidebar/SidebarItem'
import { Route } from '@/components/layout/sidebar/route.interface'

export function DashboardNavigation() {
	const routes: Route[] = [
		{
			label: 'Overview',
			href: '/dashboard/overview',
			icon: ChartPie
		},
		{
			label: 'Strategies',
			href: '/dashboard/strategies',
			icon: ListChecks
		},
		{
			label: 'Backtests',
			href: '/dashboard/backtests',
			icon: Backpack
		},
		{
			label: 'Alerts',
			href: '/dashboard/alerts',
			icon: Bell
		},
		{
			label: 'Accounts',
			href: '/dashboard/accounts',
			icon: Key
		},
		{
			label: 'Billing',
			href: '/dashboard/billing',
			icon: CreditCard
		},
		{
			label: 'Settings',
			href: '/dashboard/settings',
			icon: Settings
		}
	]

	return (
		<div className='space-y-2 px-2 pt-4 lg:pt-0'>
			{routes.map((route, index) => (
				<SidebarItem key={index} route={route} />
			))}
		</div>
	)
}
