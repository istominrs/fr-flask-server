import type { Metadata } from 'next'

import { CreateAccountForm } from '@/components/features/auth/forms/CreateAccountForm'

export const metadata: Metadata = {
	title: 'Create new account'
}

export default function CreateAccountPage() {
	return <CreateAccountForm />
}
