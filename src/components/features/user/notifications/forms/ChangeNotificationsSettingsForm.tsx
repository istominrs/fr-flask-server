'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Form, FormField } from '@/components/ui/common/Form'
import { ToggleCard } from '@/components/ui/elements/ToggleCard'
import { ToggleCardSkeleton } from '@/components/ui/elements/ToggleCardSkeleton'

import {
	ChangeNotificationsSettingsMutation,
	useChangeNotificationsSettingsMutation
} from '@/graphql/generated/output'

import { useCurrent } from '@/hooks/useCurrent'

import {
	TypeChangeNotificationsSettingsSchema,
	changeNotificationsSettingsSchema
} from '@/schemas/user/change-notifications-settings.schema'

export function ChangeNotificationsSettingsForm() {
	const { user, isLoadingProfile, refetch } = useCurrent()

	const form = useForm<TypeChangeNotificationsSettingsSchema>({
		resolver: zodResolver(changeNotificationsSettingsSchema),
		values: {
			siteNotifications:
				user?.notificationSettingsInfo.siteNotifications ?? false,
			telegramNotifications:
				user?.notificationSettingsInfo.telegramNotifications ?? false,
			emailNotifications:
				user?.notificationSettingsInfo.emailNotifications ?? false
		}
	})

	const [change, { loading: isLoadingChange }] =
		useChangeNotificationsSettingsMutation({
			onCompleted: (data: ChangeNotificationsSettingsMutation) => {
				refetch()
				toast.success(
					'Notification settings have been successfully updated'
				)

				if (data.changeNotificationsSettings.telegramToken) {
					// TODO: Change to correct telegram bot name
					window.open(
						`https://t.me/TeaTradeBot?start=${data.changeNotificationsSettings.telegramToken}`,
						'_blank'
					)
				}
			},
			onError() {
				toast.error('Error when updating notification settings')
			}
		})

	function onChange(
		field: keyof TypeChangeNotificationsSettingsSchema,
		value: boolean
	) {
		form.setValue(field, value)

		change({
			variables: {
				data: { ...form.getValues(), [field]: value }
			}
		})
	}

	return isLoadingProfile ? (
		Array.from({ length: 3 }).map((_, index) => (
			<ToggleCardSkeleton key={index} />
		))
	) : (
		<Form {...form}>
			<FormField
				control={form.control}
				name='siteNotifications'
				render={({ field }) => (
					<ToggleCard
						heading='Site Notifications'
						description='If you turn off site notifications, you will not receive notifications about new trades'
						isDisabled={isLoadingChange}
						value={field.value}
						onChange={value => onChange('siteNotifications', value)}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='telegramNotifications'
				render={({ field }) => (
					<ToggleCard
						heading='Telegram Notifications'
						description='If you enable notifications via Telegram, your TeaTrade account will be linked to your Telegram account, and you will receive messages about new trades, password resets, and two-factor authentication codes'
						isDisabled={isLoadingChange}
						value={field.value}
						onChange={value => onChange('telegramNotifications', value)}
					/>
				)}
			/>
			<FormField
				control={form.control}
				name='emailNotifications'
				render={({ field }) => (
					<ToggleCard
						heading='Email Notifications'
						description='If you enable notifications via Email, your TeaTrade account will receive messages about new trades, password resets, and two-factor authentication codes'
						isDisabled={isLoadingChange}
						value={field.value}
						onChange={value => onChange('emailNotifications', value)}
					/>
				)}
			/>
		</Form>
	)
}
