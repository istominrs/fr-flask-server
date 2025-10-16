'use client'

import { DashboardNavigation } from '@/components/layout/sidebar/DashboardNavigation'
import { SidebarHeader } from '@/components/layout/sidebar/SidebarHeader'

import { useSidebar } from '@/hooks/useSidebar'

import { cn } from '@/utils/tw-merge'

export function Sidebar() {
	const { isCollapsed } = useSidebar()

	return (
		<aside
			className={cn(
				'border-border bg-card fixed left-0 z-50 mt-[75px] flex h-full flex-col border-r transition-all duration-100 ease-in-out',
				isCollapsed ? 'w-16' : 'w-64'
			)}
		>
			<SidebarHeader />
			<DashboardNavigation />
		</aside>
	)
}
