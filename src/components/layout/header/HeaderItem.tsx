'use client'

import Link from 'next/link'

import { Item } from '@/components/layout/header/item.interface'
import {
	NavigationMenuItem,
	NavigationMenuLink
} from '@/components/ui/common/NavigationMenu'

interface HeaderItemProps {
	item: Item
}

export function HeaderItem({ item }: HeaderItemProps) {
	return (
		<NavigationMenuItem>
			<NavigationMenuLink asChild>
				<Link href={item.href}>{item.label}</Link>
			</NavigationMenuLink>
		</NavigationMenuItem>
	)
}
