import parse from 'html-react-parser'
import { Loader } from 'lucide-react'
import { Fragment, useEffect } from 'react'

import { Separator } from '@/components/ui/common/Separator'

import {
	useFindNotificationsByAccountQuery,
	useFindNotificationsUnreadCountQuery
} from '@/graphql/generated/output'

import { formatDate } from '@/utils/format-date'
import { getNotificationIcon } from '@/utils/get-notification-icon'

export function NotificationsList() {
	const { refetch } = useFindNotificationsUnreadCountQuery()

	const { data, loading: isLoadingNotifications } =
		useFindNotificationsByAccountQuery()

	useEffect(() => {
		if (data) refetch()
	}, [data])

	const notifications = data?.findNotificationsByAccount ?? []

	return (
		<>
			<h2 className='text-center text-lg font-medium'>Notifications</h2>
			<Separator className='my-3' />
			{isLoadingNotifications ? (
				<div className='text-foreground flex items-center justify-center gap-x-2 text-sm'>
					<Loader className='size-6 animate-spin' />
					Loading...
				</div>
			) : notifications.length ? (
				notifications.map((notification, index) => {
					const Icon = getNotificationIcon(notification.type)

					return (
						<Fragment key={index}>
							<div className='flex items-center gap-x-3 text-sm'>
								<div className='bg-foreground rounded-full p-2'>
									<Icon className='text-secondary size-4' />
								</div>
								<div>{parse(notification.message)}</div>
							</div>
							<span className='text-muted-foreground text-end text-xs'>
								{formatDate(notification.createdAt, true)}
							</span>
							{index < notifications.length - 1 && (
								<Separator className='my-3' />
							)}
						</Fragment>
					)
				})
			) : (
				<div className='text-muted-foreground text-center'>
					You have no notifications
				</div>
			)}
		</>
	)
}
