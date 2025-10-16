import {
	Backpack,
	Bell,
	CreditCard,
	Key,
	LayoutDashboard,
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
			icon: LayoutDashboard
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
			label: 'Settings',
			href: '/dashboard/settings',
			icon: Settings
		},
		{
			label: 'Billing',
			href: '/dashboard/billing',
			icon: CreditCard
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
