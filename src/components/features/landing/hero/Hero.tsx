import { ChevronDown } from 'lucide-react'

import { HeroAction } from '@/components/features/landing/hero/HeroAction'
import { HeroFeatures } from '@/components/features/landing/hero/HeroFeatures'
import { Heading } from '@/components/ui/elements/Heading'

export function Hero() {
	return (
		<section className='relative mx-auto grid min-h-[calc(100svh-75px)] w-full max-w-screen-xl items-center overflow-hidden'>
			<div className='mx-auto w-full max-w-5xl space-y-12 px-4 text-center'>
				<div className='space-y-6'>
					<Heading
						size='2xl'
						title='Build. Backtest. Trade.'
						description='Create and run your own trading strategies with real-time analytics and comprehensive backtesting tools.'
					/>
				</div>
				<HeroAction />
				<HeroFeatures />
			</div>

			<div className='text-muted-foreground absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce'>
				<ChevronDown className='text-primary size-8 cursor-pointer opacity-80' />
			</div>
		</section>
	)
}
