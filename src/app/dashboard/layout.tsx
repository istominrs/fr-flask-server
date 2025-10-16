import { PropsWithChildren } from 'react'

export default function DashboardLayout({
	children
}: PropsWithChildren<unknown>) {
	return (
		<div className='flex h-full flex-col'>
			<div className='flex-1'>
				<main>{children}</main>
			</div>
		</div>
	)
}
