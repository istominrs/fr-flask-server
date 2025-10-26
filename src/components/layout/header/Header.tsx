import { HeaderMenu } from '@/components/layout/header/HeaderMenu'
import { HeaderNavigation } from '@/components/layout/header/HeaderNavigation'
import { Logo } from '@/components/layout/header/Logo'

export function Header() {
	return (
		<header className='border-border bg-card flex h-full items-center justify-center border-b px-4 py-4'>
			<div className='flex w-full max-w-screen-xl items-center gap-x-4'>
				<Logo />
				<HeaderNavigation />
				<HeaderMenu />
			</div>
		</header>
	)
}
