'use client'

import Link from 'next/link'

import { Item } from '@/components/layout/header/item.interface'

interface HeaderItemProps {
	item: Item
}

export function HeaderItem({ item }: HeaderItemProps) {
	return (
		<Link
			href={item.href}
			scroll={false}
			className='text-foreground hover:text-primary text-sm transition'
		>
			{item.label}
		</Link>
	)
}
