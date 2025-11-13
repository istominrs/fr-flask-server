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
			Icon: ChartPie
		},
		{
			label: 'Strategies',
			href: '/dashboard/strategies',
			Icon: ListChecks
		},
		{
			label: 'Backtests',
			href: '/dashboard/backtests',
			Icon: Backpack
		},
		// {
		// 	label: 'Alerts',
		// 	href: '/dashboard/alerts',
		// 	Icon: Bell
		// },
		{
			label: 'Stocks',
			href: '/dashboard/stocks',
			Icon: Key
		},
		{
			label: 'Billing',
			href: '/dashboard/billing',
			Icon: CreditCard
		},
		{
			label: 'Settings',
			href: '/dashboard/settings',
			Icon: Settings
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
