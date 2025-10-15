import type { Metadata } from 'next'

import { LoginAccountForm } from '@/components/features/auth/forms/LoginAccountForm'

export const metadata: Metadata = {
	title: 'Login to your account'
}

export default function LoginAccountPage() {
	return <LoginAccountForm />
}
