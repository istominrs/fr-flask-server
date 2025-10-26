'use client'

import { ChartPie, Loader, LogOut, User } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Notifications } from '@/components/layout/header/notifications/Notifications'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/common/DropdownMenu'

import { useLogoutAccountMutation } from '@/graphql/generated/output'

import { useAuth } from '@/hooks/useAuth'
import { useCurrent } from '@/hooks/useCurrent'

export function ProfileMenu() {
	const router = useRouter()

	const { exit } = useAuth()
	const { user, isLoadingProfile } = useCurrent()

	const [logout] = useLogoutAccountMutation({
		onCompleted() {
			exit()
			toast.success('Successfully logged out')
			router.push('/account/login')
		},
		onError() {
			toast.error('Logout error')
		}
	})

	return isLoadingProfile || !user ? (
		<Loader className='text-muted-foreground size-6 animate-spin' />
	) : (
		<>
			<Notifications />
			<DropdownMenu>
				<DropdownMenuTrigger className='focus:outline-none focus-visible:ring-0'>
					<User className='size-6' />
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end' className='w-[230px]'>
					<div className='flex items-center gap-x-3 p-2'>
						<User className='size-6' />
						<h2 className='text-foreground font-medium'>
							{user.accountInfo.email}
						</h2>
					</div>
					<DropdownMenuSeparator />
					<Link href='/dashboard/settings'>
						<DropdownMenuItem>
							<ChartPie className='mr-1 size-6' />
							<h2 className='text-foreground font-medium'>Dashboard</h2>
						</DropdownMenuItem>
					</Link>
					<DropdownMenuItem onClick={() => logout()}>
						<LogOut className='mr-1 size-6' />
						<h2 className='text-foreground font-medium'>Logout</h2>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</>
	)
}
