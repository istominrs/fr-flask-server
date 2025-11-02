import { SocialLink } from '@/components/layout/footer/social-link.interface'
import { buttonVariants } from '@/components/ui/common/Button'

interface FooterLinkItemProps {
	link: SocialLink
}

export function FooterLinkItem({ link }: FooterLinkItemProps) {
	return (
		<a
			href={link.href}
			target='_blank'
			className={buttonVariants({
				variant: 'ghost',
				size: 'icon',
				className:
					'text-muted-foreground hover:text-accent-foreground transition-colors'
			})}
		>
			<link.Icon className='h-5 w-5' />
		</a>
	)
}
