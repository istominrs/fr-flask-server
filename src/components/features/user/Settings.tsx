import { ChangeEmailForm } from '@/components/features/user/account/forms/ChangeEmailForm'
import { ChangePasswordForm } from '@/components/features/user/account/forms/ChangePasswordForm'
import { TotpWrapper } from '@/components/features/user/account/totp/TotpWrapper'
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
					</div>
				</TabsContent>
			</Tabs>
		</div>
	)
}
