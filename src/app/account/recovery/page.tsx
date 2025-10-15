import type { Metadata } from 'next'

import { ResetPasswordForm } from '@/components/features/auth/forms/ResetPasswordForm'

export const metadata: Metadata = {
	title: 'Recover your account'
}

export default function ResetPasswordPage() {
	return <ResetPasswordForm />
}
