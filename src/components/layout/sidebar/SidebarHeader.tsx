'use client'

import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'

import { Button } from '@/components/ui/common/Button'
import { Hint } from '@/components/ui/elements/Hint'

import { useSidebar } from '@/hooks/useSidebar'

export function SidebarHeader() {
	const { isCollapsed, open, close } = useSidebar()

	const label = isCollapsed ? 'Expand' : 'Collapse'

	return isCollapsed ? (
		<div className='mb-4 hidden w-full items-center justify-center pt-4 lg:flex'>
			<Hint label={label} side='right' asChild>
				<Button onClick={() => open()} variant='ghost' size='icon'>
					<ArrowRightFromLine className='size-4' />
				</Button>
			</Hint>
		</div>
	) : (
		<div className='mb-2 flex w-full items-center justify-between p-3 pl-4'>
			<h2 className='text-foreground text-lg font-semibold'>Navigation</h2>
			<Hint label={label} side='right' asChild>
				<Button onClick={() => close()} variant='ghost' size='icon'>
					<ArrowLeftFromLine className='size-4' />
				</Button>
			</Hint>
		</div>
	)
}
