'use client'

import Link from 'next/link'

export function Logo() {
	return (
		<Link
			href='/'
			className='flex items-center gap-x-4 transition-opacity hover:opacity-75'
		>
			<div className='hidden leading-tight lg:block'>
				<h2 className='text-accent-foreground text-lg font-semibold tracking-wider'>
					TeaTrade
				</h2>
				<p className='text-muted-foreground text-sm'>
					Build. Backtest. Trade.
				</p>
			</div>
		</Link>
	)
}
