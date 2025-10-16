'use client'

import { OTPInput, OTPInputContext } from 'input-otp'
import { MinusIcon } from 'lucide-react'
import { type ComponentProps, useContext } from 'react'

import { cn } from '@/utils/tw-merge'

function InputOTP({
	className,
	containerClassName,
	...props
}: ComponentProps<typeof OTPInput> & {
	containerClassName?: string
}) {
	return (
		<OTPInput
			data-slot='input-otp'
			containerClassName={cn(
				'flex items-center gap-2 has-disabled:opacity-50',
				containerClassName
			)}
			className={cn('disabled:cursor-not-allowed', className)}
			{...props}
		/>
	)
}

function InputOTPGroup({ className, ...props }: ComponentProps<'div'>) {
	return (
		<div
			data-slot='input-otp-group'
			className={cn('flex items-center gap-x-3', className)}
			{...props}
		/>
	)
}

function InputOTPSlot({
	index,
	className,
	...props
}: ComponentProps<'div'> & {
	index: number
}) {
	const inputOTPContext = useContext(OTPInputContext)
	const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {}

	return (
		<div
			data-slot='input-otp-slot'
			data-active={isActive}
			className={cn(
				'border-border relative flex h-10 w-14 items-center justify-center rounded-md border text-sm transition-all',
				isActive && 'ring-primary ring-offset-background z-10 ring-2',
				className
			)}
			{...props}
		>
			{char}
			{hasFakeCaret && (
				<div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
					<div className='animate-caret-blink bg-foreground h-4 w-px duration-1000' />
				</div>
			)}
		</div>
	)
}

function InputOTPSeparator({ ...props }: ComponentProps<'div'>) {
	return (
		<div data-slot='input-otp-separator' role='separator' {...props}>
			<MinusIcon />
		</div>
	)
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
