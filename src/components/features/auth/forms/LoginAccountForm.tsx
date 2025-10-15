'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
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

import { useLoginAccountMutation } from '@/graphql/generated/output'

import {
	TypeLoginAccountSchema,
	loginAccountSchema
} from '@/schemas/auth/login-account.schema'

export function LoginAccountForm() {
	const router = useRouter()

	const form = useForm<TypeLoginAccountSchema>({
		resolver: zodResolver(loginAccountSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	const [login, { loading: isLoadingLogin }] = useLoginAccountMutation({
		onCompleted() {
			toast.success('Login successfully')
			router.push('/dashboard/settings')
		},
		onError() {
			toast.error('Account creation error')
		}
	})

	const { isValid } = form.formState

	function onSubmit(data: TypeLoginAccountSchema) {
		login({ variables: { data } })
	}

	return (
		<AuthWrapper
			heading='Login to account'
			backButtonLabel='Dont have an account? Create'
			backButtonHref='/account/create'
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
										disabled={isLoadingLogin}
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
										disabled={isLoadingLogin}
										type='password'
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<Button
						className='mt-2 w-full'
						disabled={!isValid || isLoadingLogin}
					>
						Continue
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
