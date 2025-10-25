import { PropsWithChildren } from 'react'

import { LayoutContainer } from '@/components/layout/LayoutContainer'
import { Sidebar } from '@/components/layout/sidebar/Sidebar'

export default function DashboardLayout({
	children
}: PropsWithChildren<unknown>) {
	return (
		<div className='flex h-full flex-col'>
			<div className='flex-1'>
				<Sidebar />
				<LayoutContainer>{children}</LayoutContainer>
			</div>
		</div>
	)
}
