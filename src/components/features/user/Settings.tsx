import { DeactivateCard } from '@/components/features/user/account/DeactivateCard'
import { ChangeEmailForm } from '@/components/features/user/account/forms/ChangeEmailForm'
import { ChangePasswordForm } from '@/components/features/user/account/forms/ChangePasswordForm'
import { TotpWrapper } from '@/components/features/user/account/totp/TotpWrapper'
import { ChangeNotificationsSettingsForm } from '@/components/features/user/notifications/forms/ChangeNotificationsSettingsForm'
import { SessionsList } from '@/components/features/user/sessions/SessionsList'
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger
} from '@/components/ui/common/Tabs'
import { Heading } from '@/components/ui/elements/Heading'

export function Settings() {
	return (
		<div className='lg:px-10'>
			<Heading
				title='Settings'
				description='Here you can manage your settings'
				size='lg'
			/>

			<Tabs defaultValue='account' className='mt-3 w-full'>
				<TabsList className='grid max-w-2xl grid-cols-3'>
					<TabsTrigger value='account'>Account</TabsTrigger>
					<TabsTrigger value='notifications'>Notifications</TabsTrigger>
					<TabsTrigger value='sessions'>Sessions</TabsTrigger>
				</TabsList>
				<TabsContent value='account'>
					<div className='mt-5 space-y-6'>
						<Heading
							title='Account'
							description='Manage your account settings, including access changes, security, and deactivation options'
						/>
						<ChangeEmailForm />
						<ChangePasswordForm />
						<Heading
							title='Security'
							description='Set up two-factor authentication and auto-renewals for enhanced protection of your data'
						/>
						<TotpWrapper />
						<Heading
							title='Deactivation'
							description='If you want to temporarily or permanently disable your account, use this option. Be aware of the consequences'
						/>
						<DeactivateCard />
					</div>
				</TabsContent>
				<TabsContent value='notifications'>
					<div className='mt-5 space-y-6'>
						<Heading
							title='Notifications'
							description='Configure how you want to receive notifications from TeaTrade. You will receive notifications about the trades'
						/>
						<ChangeNotificationsSettingsForm />
					</div>
				</TabsContent>
				<TabsContent value='sessions'>
					<div className='mt-5 space-y-6'>
						<Heading
							title='Sessions'
							description='Sessions are devices that you are currently using or have used to access your TeaTrade account. Here you can see the active sessions right now.'
						/>
						<SessionsList />
					</div>
				</TabsContent>
			</Tabs>
		</div>
	)
}
