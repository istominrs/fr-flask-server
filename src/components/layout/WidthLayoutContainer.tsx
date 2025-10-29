'use client'

import { PropsWithChildren } from 'react'

import { cn } from '@/utils/tw-merge'

interface WidthLayoutContainerProps {
	className?: string
}

export function WidthLayoutContainer({
	children,
	className
}: PropsWithChildren<WidthLayoutContainerProps>) {
	return (
		<div
			className={cn(
				'mx-auto w-full max-w-screen-xl px-2.5 md:px-20',
				className
			)}
		>
			{children}
		</div>
	)
}
