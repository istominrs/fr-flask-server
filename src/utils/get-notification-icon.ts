import { Bell, Lock } from 'lucide-react'

import { NotificationType } from '@/graphql/generated/output'

export function getNotificationIcon(type: NotificationType) {
	switch (type) {
		case NotificationType.EnableTwoFactor:
			return Lock
		default:
			return Bell
	}
}
