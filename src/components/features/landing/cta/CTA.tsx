import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { CTAIcons } from '@/components/features/landing/cta/CTAIcons'
import { WidthLayoutContainer } from '@/components/layout/WidthLayoutContainer'
import { buttonVariants } from '@/components/ui/common/Button'

export function CTA() {
	return (
		<WidthLayoutContainer className='my-28 sm:my-40'>
			<div className='relative overflow-hidden rounded-lg bg-blue-600 px-8 py-12 text-center'>
				<div className='pointer-events-none absolute inset-0'>
					<CTAIcons />
				</div>

				<div className='relative z-10'>
					<h1 className='text-5xl font-bold text-white sm:text-5xl'>
						Try TeaTrade's
					</h1>
					<div className='mx-auto mt-4 inline-block rotate-[-5deg] rounded-lg bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] px-8 py-4 shadow-lg sm:mt-6 sm:px-12 sm:py-6'>
						<p className='text-xl font-bold text-white sm:text-5xl'>
							PRO plan free for 7 days
						</p>
					</div>
					<p className='mt-4 text-lg font-bold text-white/90 sm:text-5xl'>
						pick a plan later
					</p>

					<Link
						className={buttonVariants({
							size: 'lg',
							className:
								'mt-5 h-auto px-10 py-4 text-2xl font-bold text-blue-600',
							variant: 'secondary'
						})}
						href='/dashboard/overview'
						target='_blank'
					>
						Start Free Trial <ArrowRight className='ml-2 h-5 w-5' />
					</Link>
				</div>
			</div>
		</WidthLayoutContainer>
	)
}
