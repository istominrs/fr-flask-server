'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { AuthWrapper } from '@/components/features/auth/AuthWrapper'
import { Button } from '@/components/ui/common/Button'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel
} from '@/components/ui/common/Form'
import { Input } from '@/components/ui/common/Input'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot
} from '@/components/ui/common/InputOTP'

import {
	DeactivateAccountMutation,
	useDeactivateAccountMutation
} from '@/graphql/generated/output'

import { useAuth } from '@/hooks/useAuth'

import {
	TypeDeactivateAccountSchema,
	deactivateAccountSchema
} from '@/schemas/auth/deactivate-account.schema'

export function DeactivateAccountForm() {
	const { exit } = useAuth()

	const router = useRouter()

	const [isShowConfirm, setIsShowConfirm] = useState(false)

	const form = useForm<TypeDeactivateAccountSchema>({
		resolver: zodResolver(deactivateAccountSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const [deactivate, { loading: isLoadingDeactivate }] =
		useDeactivateAccountMutation({
			onCompleted: (data: DeactivateAccountMutation) => {
				if (data.deactivateAccount.requiresConfirmation) {
					setIsShowConfirm(true)
				} else {
					exit()
					toast.success('You have successfully deactivated your account')
					router.push('/')
				}
			},
			onError: () => {
				toast.error('Deactivation error')
			}
		})

	const { isValid } = form.formState

	function onSubmit(data: TypeDeactivateAccountSchema) {
		deactivate({ variables: { data } })
	}

	return (
		<AuthWrapper
			heading='Deactivate Account'
			backButtonLabel='Go to Dashboard'
			backButtonHref='/dashboard/settings'
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-y-3'
				>
					{isShowConfirm ? (
						<FormField
							control={form.control}
							name='pin'
							render={({ field }) => (
								<FormItem>
									<FormLabel>6-digit code</FormLabel>
									<FormControl>
										<InputOTP maxLength={6} {...field}>
											<InputOTPGroup>
												<InputOTPSlot index={0} />
												<InputOTPSlot index={1} />
												<InputOTPSlot index={2} />
												<InputOTPSlot index={3} />
												<InputOTPSlot index={4} />
												<InputOTPSlot index={5} />
											</InputOTPGroup>
										</InputOTP>
									</FormControl>
									<FormDescription>
										A code has been sent to your email. If you enabled
										Telegram notifications, we sent the code there as
										well
									</FormDescription>
								</FormItem>
							)}
						/>
					) : (
						<>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												placeholder='john.doe@example.com'
												disabled={isLoadingDeactivate}
												{...field}
											/>
										</FormControl>
										<FormDescription>
											Your email that you used during registration
										</FormDescription>
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name='password'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												placeholder='********'
												type='password'
												disabled={isLoadingDeactivate}
												{...field}
											/>
										</FormControl>
										<FormDescription>
											The password you used during registration
										</FormDescription>
									</FormItem>
								)}
							/>
						</>
					)}
					<Button
						className='mt-2 w-full'
						disabled={!isValid || isLoadingDeactivate}
					>
						Deactivate
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
