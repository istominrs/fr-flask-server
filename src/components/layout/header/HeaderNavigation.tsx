'use client'

import { HeaderItem } from '@/components/layout/header/HeaderItem'
import { Item } from '@/components/layout/header/item.interface'

export function HeaderNavigation() {
	const items: Item[] = [
		{
			label: 'FAQ',
			href: '#faq'
		}
	]

	return (
		<div className='space-y-2 px-2 pt-4 lg:pt-0'>
			{items.map((item, index) => (
				<HeaderItem key={index} item={item} />
			))}
		</div>
	)
}
