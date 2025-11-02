'use client'

import Image from 'next/image'
import Link from 'next/link'

import { FooterLinks } from '@/components/layout/footer/FooterLinks'

export function FooterInfo() {
	const currentYear = new Date().getFullYear()

	return (
		<div className='flex flex-col gap-4 lg:col-span-4'>
			<Link
				href='/'
				className='flex items-center gap-x-4 transition-opacity hover:opacity-75'
			>
				<Image
					src='/images/logo.svg'
					alt='TeaTrade'
					width={40}
					height={40}
				/>
				<div className='leading-tight'>
					<h2 className='text-accent-foreground text-lg font-semibold tracking-wider'>
						TeaTrade
					</h2>
					<p className='text-muted-foreground text-sm'>
						Build. Backtest. Trade.
					</p>
				</div>
			</Link>
			<p className='text-muted-foreground text-sm'>
				© {currentYear} TeaTrade. All rights reserved.
			</p>
			<FooterLinks />
		</div>
	)
}
