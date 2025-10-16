'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { AuthWrapper } from '@/components/features/auth/AuthWrapper'
import { Button } from '@/components/ui/common/Button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel
} from '@/components/ui/common/Form'
import { Input } from '@/components/ui/common/Input'

import { useLoginAccountMutation } from '@/graphql/generated/output'

import { useAuth } from '@/hooks/useAuth'

import {
	type TypeLoginAccountSchema,
	loginAccountSchema
} from '@/schemas/auth/login-account.schema'

export function LoginAccountForm() {
	const { auth } = useAuth()

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
			auth()
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
								<div className='item-center flex justify-between'>
									<FormLabel>Password</FormLabel>
									<Link
										href='/account/recovery'
										className='ml-auto inline-block text-sm'
									>
										Forgot password?
									</Link>
								</div>
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
						Login
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
