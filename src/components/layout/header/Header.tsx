import { HeaderMenu } from '@/components/layout/header/HeaderMenu'
import { HeaderNavigation } from '@/components/layout/header/HeaderNavigation'
import { Logo } from '@/components/layout/header/Logo'

export function Header() {
	return (
		<header className='border-border bg-card flex h-full items-center gap-x-4 border-b p-4'>
			<Logo />
			<HeaderNavigation />
			<HeaderMenu />
		</header>
	)
}
