import Link from 'next/link'

import type { Section } from '@/components/layout/footer/section.interface'

interface FooterSectionProps {
	section: Section
}

export function FooterSection({ section }: FooterSectionProps) {
	return (
		<div className='flex flex-col gap-2'>
			<h3 className='text-accent-foreground text-sm font-semibold'>
				{section.title}
			</h3>
			<nav className='flex flex-col gap-2'>
				{section.links.map(link => (
					<Link
						key={link.href}
						href={link.href}
						className='text-muted-foreground hover:text-accent-foreground text-sm transition-colors'
					>
						{link.label}
					</Link>
				))}
			</nav>
		</div>
	)
}
