'use client'

import { HeaderItem } from '@/components/layout/header/HeaderItem'
import { Item } from '@/components/layout/header/item.interface'
import {
	NavigationMenu,
	NavigationMenuList
} from '@/components/ui/common/NavigationMenu'

export function HeaderNavigation() {
	const items: Item[] = [
		{
			label: 'About Us',
			href: '#about-us'
		},
		{
			label: 'How it works',
			href: '#how-it-works'
		},
		{
			label: 'Plans & Pricing',
			href: '/pricing'
		},
		{
			label: 'FAQ',
			href: '#faq'
		}
	]

	return (
		<NavigationMenu className='ml-auto'>
			<NavigationMenuList className='flex-wrap gap-x-10'>
				{items.map((item, index) => (
					<HeaderItem key={index} item={item} />
				))}
			</NavigationMenuList>
		</NavigationMenu>
	)
}
