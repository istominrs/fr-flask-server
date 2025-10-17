import type { Metadata } from 'next'

import { DeactivateAccountForm } from '@/components/features/auth/forms/DeactivateAccountForm'

export const metadata: Metadata = {
	title: 'Deactivate account'
}

export default function DeactivateAccountPage() {
	return <DeactivateAccountForm />
}
