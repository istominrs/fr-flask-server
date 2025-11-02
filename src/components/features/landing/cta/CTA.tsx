import { WidthLayoutContainer } from '@/components/layout/WidthLayoutContainer'
import { buttonVariants } from '@/components/ui/common/Button'
import { ArrowRight, Sparkles, Zap, TrendingUp, Star } from 'lucide-react'
import Link from 'next/link'

export function CTA() {
	return (
		<WidthLayoutContainer className='my-28 sm:my-40'>
			<div className='relative overflow-hidden rounded-lg bg-blue-600 px-8 py-12 text-center'>
				<div className='absolute inset-0 pointer-events-none'>
					<Sparkles className='absolute top-8 left-12 size-16 text-white/10 rotate-12' />
					<Zap className='absolute top-20 right-16 size-12 text-white/10 -rotate-12' />
					<TrendingUp className='absolute bottom-16 left-20 size-14 text-white/10 rotate-45' />
					<Star className='absolute bottom-24 right-24 size-10 text-white/10 -rotate-12' />
					<Sparkles className='absolute top-1/2 left-1/4 size-8 text-white/10 rotate-45' />
					<Zap className='absolute top-1/3 right-1/3 size-10 text-white/10 -rotate-45' />
					<Star className='absolute bottom-1/3 left-1/3 size-12 text-white/10 rotate-12' />
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
							className: 'mt-5 !font-bold !text-blue-600 !text-2xl px-10 py-6 h-auto',
							variant: 'secondary',
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

