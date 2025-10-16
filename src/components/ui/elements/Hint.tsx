import { Tooltip } from '@radix-ui/react-tooltip'
import { PropsWithChildren } from 'react'

import {
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from '@/components/ui/common/Tooltip'

interface HintProps {
	label: string
	asChild?: boolean
	side?: 'top' | 'bottom' | 'left' | 'right'
	align?: 'start' | 'center' | 'end'
}

export function Hint({
	children,
	label,
	asChild,
	align,
	side
}: PropsWithChildren<HintProps>) {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={0}>
				<TooltipTrigger asChild={asChild}>{children}</TooltipTrigger>
				<TooltipContent
					className='bg-secondary text-white'
					side={side}
					align={align}
				>
					<p className='font-semibold'>{label}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
