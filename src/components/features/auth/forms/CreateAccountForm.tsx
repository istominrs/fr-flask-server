'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { AuthWrapper } from '@/components/features/auth/AuthWrapper'
import { Button } from '@/components/ui/Button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'

import { useCreateAccountMutation } from '@/graphql/generated/output'

import {
	TypeCreateAccountSchema,
	createAccountSchema
} from '@/schemas/auth/create-account.schema'

export function CreateAccountForm() {
	const form = useForm<TypeCreateAccountSchema>({
		resolver: zodResolver(createAccountSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const [create, { loading: isLoadingCreate }] = useCreateAccountMutation({
		onCompleted() {
			toast.success('Account created')
		},
		onError() {
			toast.error('Account creation error')
		}
	})

	const { isValid } = form.formState

	function onSubmit(data: TypeCreateAccountSchema) {
		create({ variables: { data } })
	}

	return (
		<AuthWrapper
			heading='Create Account'
			backButtonLabel='Already have an account? Login'
			backButtonHref='/account/login'
		>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder='johndoe@example.com'
										disabled={isLoadingCreate}
										{...field}
									/>
								</FormControl>
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
										disabled={isLoadingCreate}
										type='password'
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<Button
						className='mt-2 w-full'
						disabled={!isValid || isLoadingCreate}
					>
						Continue
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
