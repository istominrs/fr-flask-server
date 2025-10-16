'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
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

import { useNewPasswordMutation } from '@/graphql/generated/output'

import {
	type TypeNewPasswordSchema,
	newPasswordSchema
} from '@/schemas/auth/new-password.schema'

export function NewPasswordForm() {
	const router = useRouter()
	const params = useParams<{ token: string }>()

	const form = useForm<TypeNewPasswordSchema>({
		resolver: zodResolver(newPasswordSchema),
		defaultValues: {
			password: '',
			repeatedPassword: ''
		}
	})

	const [newPassword, { loading: isLoadingNewPassword }] =
		useNewPasswordMutation({
			onCompleted() {
				toast.success('Password successfully changed')
				router.push('/account/login')
			},
			onError() {
				toast.error('Failed to set new password')
			}
		})

	const { isValid } = form.formState

	function onSubmit(data: TypeNewPasswordSchema) {
		newPassword({ variables: { data: { ...data, token: params.token } } })
	}

	return (
		<AuthWrapper
			heading='New password'
			backButtonLabel='Already have an account? Login'
			backButtonHref='/account/login'
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>New password</FormLabel>
								<FormControl>
									<Input
										placeholder='********'
										disabled={isLoadingNewPassword}
										type='password'
										{...field}
									/>
								</FormControl>
								<FormDescription>Set your new password</FormDescription>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='repeatedPassword'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Repeat new password</FormLabel>
								<FormControl>
									<Input
										placeholder='********'
										disabled={isLoadingNewPassword}
										type='password'
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Repeat your new password for confirmation
								</FormDescription>
							</FormItem>
						)}
					/>
					<Button
						className='mt-2 w-full'
						disabled={!isValid || isLoadingNewPassword}
					>
						Set new password
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
