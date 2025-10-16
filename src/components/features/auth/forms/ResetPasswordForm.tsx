'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CircleCheck } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { AuthWrapper } from '@/components/features/auth/AuthWrapper'
import {
	Alert,
	AlertDescription,
	AlertTitle
} from '@/components/ui/common/Alert'
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

import { useResetPasswordMutation } from '@/graphql/generated/output'

import {
	type TypeResetPasswordSchema,
	resetPasswordSchema
} from '@/schemas/auth/reset-password.schema'

export function ResetPasswordForm() {
	const [isSuccess, setIsSuccess] = useState(false)

	const form = useForm<TypeResetPasswordSchema>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			email: ''
		}
	})

	const [resetPassword, { loading: isLoadingReset }] =
		useResetPasswordMutation({
			onCompleted() {
				setIsSuccess(true)
			},
			onError() {
				toast.error('Password reset error')
			}
		})

	const { isValid } = form.formState

	function onSubmit(data: TypeResetPasswordSchema) {
		resetPassword({ variables: { data } })
	}

	return (
		<AuthWrapper
			heading='Reset password'
			backButtonLabel='Already have an account? Login'
			backButtonHref='/account/login'
		>
			{isSuccess ? (
				<Alert>
					<CircleCheck className='size-4' />
					<AlertTitle>Link sent!</AlertTitle>
					<AlertDescription>
						We have sent a password reset link to your email
					</AlertDescription>
				</Alert>
			) : (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='space-y-4'
					>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder='johndoe@example.com'
											disabled={isLoadingReset}
											{...field}
										/>
									</FormControl>
									<FormDescription>
										The email you used during registration
									</FormDescription>
								</FormItem>
							)}
						/>
						<Button
							className='mt-2 w-full'
							disabled={!isValid || isLoadingReset}
						>
							Reset password
						</Button>
					</form>
				</Form>
			)}
		</AuthWrapper>
	)
}
