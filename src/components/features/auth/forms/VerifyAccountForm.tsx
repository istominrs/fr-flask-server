'use client'

import { Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

import { AuthWrapper } from '@/components/features/auth/AuthWrapper'

import { useVerifyAccountMutation } from '@/graphql/generated/output'

interface VerifyAccountFormProps {
	token: string
}

export function VerifyAccountForm(props: VerifyAccountFormProps) {
	const router = useRouter()

	const { token } = props

	const [verify] = useVerifyAccountMutation({
		onCompleted() {
			router.push('/dashboard/settings')
		},
		onError() {
			toast.error('Failed to verify account')
		}
	})

	useEffect(() => {
		verify({
			variables: {
				data: { token }
			}
		})
	}, [token])

	return (
		<AuthWrapper heading='Verify Account'>
			<div className='flex justify-center'>
				<Loader className='size-8 animate-spin' />
			</div>
		</AuthWrapper>
	)
}
