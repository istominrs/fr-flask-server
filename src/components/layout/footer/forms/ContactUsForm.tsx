'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/common/Button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel
} from '@/components/ui/common/Form'
import { Input } from '@/components/ui/common/Input'
import { Textarea } from '@/components/ui/common/Textarea'

import { useContactUsMutation } from '@/graphql/generated/output'

import {
	TypeContactUsSchema,
	contactUsSchema
} from '@/schemas/user/contact-us.schema'

export function ContactUsForm() {
	const form = useForm<TypeContactUsSchema>({
		resolver: zodResolver(contactUsSchema),
		defaultValues: {
			email: '',
			message: ''
		}
	})

	const [contact, { loading: isLoadingContact }] = useContactUsMutation({
		onCompleted: () => {
			toast.success('We successfully receive your message')
		},
		onError() {
			toast.error('Contact us error')
		}
	})

	const { isValid, isDirty } = form.formState

	function onSubmit(data: TypeContactUsSchema) {
		contact({ variables: { data } })
	}

	return (
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
									disabled={isLoadingContact}
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='message'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Message</FormLabel>
							<FormControl>
								<Textarea
									placeholder='Type your message here.'
									disabled={isLoadingContact}
									{...field}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				<Button
					className='mt-2 w-full items-center'
					disabled={!isValid || !isDirty || isLoadingContact}
				>
					<Send />
				</Button>
			</form>
		</Form>
	)
}
