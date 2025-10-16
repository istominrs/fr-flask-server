import { toast } from 'sonner'

import { Button } from '@/components/ui/common/Button'
import { ConfirmModal } from '@/components/ui/elements/ConfirmModal'

import { useDisableTotpMutation } from '@/graphql/generated/output'

import { useCurrent } from '@/hooks/useCurrent'

export function DisableTotp() {
	const { refetch } = useCurrent()

	const [disable, { loading: isLoadingDisable }] = useDisableTotpMutation({
		onCompleted() {
			refetch()
			toast.success('TOTP authentication has been disabled')
		},
		onError() {
			toast.error('Error disabling')
		}
	})

	return (
		<ConfirmModal
			heading='Are you sure you want to disable TOTP?'
			message='Disabling TOTP authentication will make your account less secure. Are you sure you want to proceed?'
			onConfirm={() => disable()}
		>
			<Button variant='secondary' disabled={isLoadingDisable}>
				Disable
			</Button>
		</ConfirmModal>
	)
}
