import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/common/Button'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/common/Dialog'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel
} from '@/components/ui/common/Form'
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSlot
} from '@/components/ui/common/InputOTP'

import {
	useEnableTotpMutation,
	useGenerateTotpSecretQuery
} from '@/graphql/generated/output'

import { useCurrent } from '@/hooks/useCurrent'

import {
	TypeEnableTotpSchema,
	enableTotpSchema
} from '@/schemas/user/enable-totp.schema'

export function EnableTotp() {
	const [isOpen, setIsOpen] = useState(false)
	const { refetch } = useCurrent()

	const { data, loading: isLoadingGenerate } = useGenerateTotpSecretQuery()
	const generateSecret = data?.generateTotpSecret

	const form = useForm<TypeEnableTotpSchema>({
		resolver: zodResolver(enableTotpSchema),
		defaultValues: {
			pin: ''
		}
	})

	const [enable, { loading: isLoadingEnable }] = useEnableTotpMutation({
		onCompleted() {
			refetch()
			setIsOpen(false)
			toast.success('TOTP authentication enabled')
		},
		onError() {
			toast.error('Error verifying the code')
		}
	})

	const { isValid } = form.formState

	function onSubmit(data: TypeEnableTotpSchema) {
		enable({
			variables: {
				data: {
					secret: generateSecret?.secret ?? '',
					pin: data.pin
				}
			}
		})
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button>Enable</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Enable Totp</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='flex flex-col gap-4'
					>
						<div className='flex flex-col items-center justify-center gap-4'>
							<span className='text-muted-foreground text-sm'>
								{generateSecret?.qrcodeUrl
									? 'Scan the QR code to add TOTP'
									: ''}
							</span>
							<img
								src={generateSecret?.qrcodeUrl}
								alt='QR'
								className='rounded-lg'
							/>
						</div>
						<div className='flex flex-col gap-2'>
							<span className='text-muted-foreground text-center text-sm'>
								{generateSecret?.secret
									? 'Secret Code: ' + generateSecret.secret
									: ''}
							</span>
						</div>
						<FormField
							control={form.control}
							name='pin'
							render={({ field }) => (
								<FormItem className='flex flex-col justify-center max-sm:items-center'>
									<FormLabel>PIN Code</FormLabel>
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
										Please enter the 6-digit code provided by your
										authentication app
									</FormDescription>
								</FormItem>
							)}
						/>
						<DialogFooter>
							<Button
								type='submit'
								disabled={
									!isValid || isLoadingGenerate || isLoadingEnable
								}
							>
								Confirm
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	)
}
