'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { ChangeEmailFormSkeleton } from '@/components/features/user/account/forms/ChangeEmailFormSkeleton'
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

import { useChangeEmailMutation } from '@/graphql/generated/output'

import { useCurrent } from '@/hooks/useCurrent'

import {
	TypeChangeEmailSchema,
	changeEmailSchema
} from '@/schemas/user/change-email.schema'

export function ChangeEmailForm() {
	const { user, isLoadingProfile, refetch } = useCurrent()

	const form = useForm<TypeChangeEmailSchema>({
		resolver: zodResolver(changeEmailSchema),
		values: {
			email: user?.accountInfo.email || ''
		}
	})

	const [change, { loading: isLoadingChange }] = useChangeEmailMutation({
		onCompleted() {
			refetch()
			toast.success('Email successfully changed')
		},
		onError() {
			toast.error('Error during mail change')
		}
	})

	const { isValid, isDirty } = form.formState

	function onSubmit(data: TypeChangeEmailSchema) {
		change({ variables: { data } })
	}

	return isLoadingProfile ? (
		<ChangeEmailFormSkeleton />
	) : (
		<FormWrapper heading='Email Address'>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-y-3'
				>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem className='px-5'>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder='john.doe@example.com'
										disabled={isLoadingChange}
										{...field}
									/>
								</FormControl>
								<FormDescription>
									Enter your new email address
								</FormDescription>
							</FormItem>
						)}
					/>
					<Separator />
					<div className='flex justify-end px-5 pt-1'>
						<Button disabled={!isValid || !isDirty || isLoadingChange}>
							Save
						</Button>
					</div>
				</form>
			</Form>
		</FormWrapper>
	)
}
