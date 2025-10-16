'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/common/Button'
import { CardContainer } from '@/components/ui/elements/CardContainer'
import { ConfirmModal } from '@/components/ui/elements/ConfirmModal'

export function DeactivateCard() {
	const router = useRouter()

	return (
		<CardContainer
			heading='Account Deactivation'
			description='After deactivating your account, you will not be able to log in. Your account will be completely deleted after 7 days. Until then, you can contact support to restore access and unlock your account'
			rightContent={
				<div className='flex items-center gap-x-4'>
					<ConfirmModal
						heading='Deactivation Confirmation'
						message='Are you sure you want to deactivate your account? Access can only be restored within 7 days'
						onConfirm={() => router.push('/account/deactivate')}
					>
						<Button>Deactivate</Button>
					</ConfirmModal>
				</div>
			}
		/>
	)
}
