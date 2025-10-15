import type { Metadata } from 'next'

import { CreateAccountForm } from '@/components/features/auth/forms/CreateAccountForm'

export const metadata: Metadata = {
	title: 'Create Account'
}

export default function CreateAccountPage() {
	return <CreateAccountForm />
}
