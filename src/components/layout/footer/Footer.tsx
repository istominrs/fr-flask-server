'use client'

import { WidthLayoutContainer } from '@/components/layout/WidthLayoutContainer'
import { FooterInfo } from '@/components/layout/footer/FooterInfo'
import { FooterNavigation } from '@/components/layout/footer/FooterNavigation'
import { ContactUsForm } from '@/components/layout/footer/forms/ContactUsForm'

export function Footer() {
	return (
		<footer className='border-border bg-card border-t'>
			<WidthLayoutContainer className='py-12'>
				<div className='grid grid-cols-1 gap-8 lg:grid-cols-12'>
					<FooterInfo />
					<FooterNavigation />

					<div className='flex flex-col gap-4 lg:col-span-4'>
						<ContactUsForm />
					</div>
				</div>
			</WidthLayoutContainer>
		</footer>
	)
}
