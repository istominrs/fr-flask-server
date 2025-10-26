import { Bell } from 'lucide-react'

import { NotificationsList } from '@/components/layout/header/notifications/NotificationsList'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/common/Popover'

import { useFindNotificationsUnreadCountQuery } from '@/graphql/generated/output'

export function Notifications() {
	const { data, loading: isLoadingCount } =
		useFindNotificationsUnreadCountQuery()

	const count = data?.findNotificationsUnreadCount ?? 0

	const displayCount = count > 10 ? '+9' : count

	if (isLoadingCount) return null

	return (
		<Popover>
		<PopoverTrigger className='relative'>
			{count !== 0 && (
				<div className='bg-primary absolute -top-1 right-3 rounded-full px-[5px] text-xs font-semibold text-white'>
					{displayCount}
				</div>
			)}
			<Bell className='text-foreground size-6' />
		</PopoverTrigger>
			<PopoverContent
				align='end'
				className='max-h-[500px] w-[320px] overflow-y-auto'
			>
				<NotificationsList />
			</PopoverContent>
		</Popover>
	)
}
