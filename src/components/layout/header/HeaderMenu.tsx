'use client'

import Link from 'next/link'

import { ProfileMenu } from '@/components/layout/header/ProfileMenu'
import { Button } from '@/components/ui/common/Button'

import { useAuth } from '@/hooks/useAuth'

export function HeaderMenu() {
	const { isAuthenticated } = useAuth()

	return (
		<div className='ml-auto flex items-center gap-x-4'>
			{isAuthenticated ? (
				<ProfileMenu />
			) : (
				<>
					<Link href='/account/login'>
						<Button variant='secondary'>Login</Button>
					</Link>
					<Link href='/account/create'>
						<Button>Register</Button>
					</Link>
				</>
			)}
		</div>
	)
}
