import { Github, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react'

import { FooterLinkItem } from '@/components/layout/footer/FooterLinkItem'
import type { SocialLink } from '@/components/layout/footer/social-link.interface'

export function FooterLinks() {
	const socialLinks: SocialLink[] = [
		{
			name: 'Twitter',
			Icon: Twitter,
			href: 'https://twitter.com'
		},
		{
			name: 'GitHub',
			Icon: Github,
			href: 'https://github.com'
		},
		{
			name: 'LinkedIn',
			Icon: Linkedin,
			href: 'https://linkedin.com'
		},
		{
			name: 'Instagram',
			Icon: Instagram,
			href: 'https://instagram.com'
		},
		{
			name: 'Youtube',
			Icon: Youtube,
			href: 'https://youtube.com'
		}
	]

	return (
		<div className='flex items-center gap-3'>
			{socialLinks.map((social, index) => (
				<FooterLinkItem link={social} key={index} />
			))}
		</div>
	)
}
