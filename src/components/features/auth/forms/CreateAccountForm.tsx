'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

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

	const { isValid } = form.formState

	function onSubmit(data: TypeCreateAccountSchema) {
		console.log(data)
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
										type='password'
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<Button className='mt-2 w-full' disabled={!isValid}>
						Continue
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
