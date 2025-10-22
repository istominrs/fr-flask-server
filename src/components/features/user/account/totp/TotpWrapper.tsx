'use client'

import { DisableTotp } from '@/components/features/user/account/totp/DisableTotp'
import { EnableTotp } from '@/components/features/user/account/totp/EnableTotp'
import { TotpWrapperSkeleton } from '@/components/features/user/account/totp/TotpWrapperSkeleton'
import { CardContainer } from '@/components/ui/elements/CardContainer'

import { useCurrent } from '@/hooks/useCurrent'

export function TotpWrapper() {
	const { user, isLoadingProfile } = useCurrent()

	return isLoadingProfile ? (
		<TotpWrapperSkeleton />
	) : (
		<CardContainer
			heading='TOTP Authentication'
			description='Enhance your account security by enabling TOTP authentication. This additional layer of protection requires entering a unique code, making your account less vulnerable to unauthorized access'
			rightContent={
				<div className='flex items-center gap-x-4'>
					{!user?.accountInfo.isTotpEnabled ? (
						<EnableTotp />
					) : (
						<DisableTotp />
					)}
				</div>
			}
		/>
	)
}
