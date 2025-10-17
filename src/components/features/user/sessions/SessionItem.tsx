import { toast } from 'sonner'

import { SessionModal } from '@/components/features/user/sessions/SessionModal'
import { Button } from '@/components/ui/common/Button'
import { CardContainer } from '@/components/ui/elements/CardContainer'
import { ConfirmModal } from '@/components/ui/elements/ConfirmModal'

import {
	FindSessionsByUserQuery,
	useFindSessionsByUserQuery,
	useRemoveSessionMutation
} from '@/graphql/generated/output'

import { getBrowserIcon } from '@/utils/get-browser-icon'

interface SessionItemProps {
	session: FindSessionsByUserQuery['findSessionsByUser'][0]
	isCurrentSession?: boolean
}

export function SessionItem({ session, isCurrentSession }: SessionItemProps) {
	const { refetch } = useFindSessionsByUserQuery()

	const [remove, { loading: isLoadingRemove }] = useRemoveSessionMutation({
		onCompleted() {
			refetch()
			toast.success('Session deleted')
		},
		onError() {
			toast.error('Error deleting session')
		}
	})

	const Icon = getBrowserIcon(session.metadata.device.browser)

	return (
		<CardContainer
			heading={`${session.metadata.device.browser}, ${session.metadata.device.os}`}
			description={`${session.metadata.location.country}, ${session.metadata.location.city}`}
			Icon={Icon}
			rightContent={
				<div className='flex items-center gap-x-4'>
					{!isCurrentSession && (
						<ConfirmModal
							heading='Delete Session'
							message='Are you sure you want to delete this session? This action will result in the irreversible deletion of the session on this device and will terminate all active actions associated with it'
							onConfirm={() => remove({ variables: { id: session.id } })}
						>
							<Button variant='secondary' disabled={isLoadingRemove}>
								Delete
							</Button>
						</ConfirmModal>
					)}
					<SessionModal session={session}>
						<Button>Details</Button>
					</SessionModal>
				</div>
			}
		/>
	)
}
