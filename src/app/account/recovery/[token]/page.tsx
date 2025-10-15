import type { Metadata } from 'next'

import { NewPasswordForm } from '@/components/features/auth/forms/NewPasswordForm'

export const metadata: Metadata = {
	title: 'New password'
}

export default function NewPasswordPage() {
	return <NewPasswordForm />
}
