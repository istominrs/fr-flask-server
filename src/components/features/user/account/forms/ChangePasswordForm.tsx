'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { ChangePasswordFormSkeleton } from '@/components/features/user/account/forms/ChangePasswordFormSkeleton'
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
import { Separator } from '@/components/ui/common/Separator'
import { FormWrapper } from '@/components/ui/elements/FormWrapper'

import { useChangePasswordMutation } from '@/graphql/generated/output'

import { useCurrent } from '@/hooks/useCurrent'

import {
	TypeChangePasswordSchema,
	changePasswordSchema
} from '@/schemas/user/change-password.schema'

export function ChangePasswordForm() {
	const { isLoadingProfile, refetch } = useCurrent()

	const form = useForm<TypeChangePasswordSchema>({
		resolver: zodResolver(changePasswordSchema),
		values: {
			oldPassword: '',
			newPassword: '',
			repeatedNewPassword: ''
		}
	})

	const [change, { loading: isLoadingChange }] = useChangePasswordMutation({
		onCompleted() {
			form.reset()
			refetch()
			toast.success('Password successfully changed')
		},
		onError() {
			toast.error('Error when changing password')
		}
	})

	const { isValid } = form.formState

	function onSubmit(data: TypeChangePasswordSchema) {
		change({ variables: { data } })
	}

	return isLoadingProfile ? (
		<ChangePasswordFormSkeleton />
	) : (
		<FormWrapper heading='Account Password'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-y-3'
				>
					<FormField
						control={form.control}
						name='oldPassword'
						render={({ field }) => (
							<FormItem className='px-5'>
								<FormLabel>Old Password</FormLabel>
								<FormControl>
									<Input
										placeholder='********'
										type='password'
										disabled={isLoadingChange}
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Enter your old password to verify your identity
									before changing your password. This is necessary to
									ensure the security of your account
								</FormDescription>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='newPassword'
						render={({ field }) => (
							<FormItem className='px-5'>
								<FormLabel>New Password</FormLabel>
								<FormControl>
									<Input
										placeholder='********'
										type='password'
										disabled={isLoadingChange}
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Your new password must be at least 8 characters long.
									It is recommended to use special characters for added
									security
								</FormDescription>
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='repeatedNewPassword'
						render={({ field }) => (
							<FormItem className='px-5'>
								<FormLabel>Repeat new Password</FormLabel>
								<FormControl>
									<Input
										placeholder='********'
										type='password'
										disabled={isLoadingChange}
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Your repeated new password
								</FormDescription>
							</FormItem>
						)}
					/>
					<Separator />
					<div className='flex justify-end px-5 pt-1'>
						<Button disabled={!isValid || isLoadingChange}>Save</Button>
					</div>
				</form>
			</Form>
		</FormWrapper>
	)
}
