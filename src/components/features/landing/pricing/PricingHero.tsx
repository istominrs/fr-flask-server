'use client'

export function PricingHero() {
	return (
		<section className='mt-28 mb-16 flex flex-col items-center justify-center text-center sm:mt-40'>
			<div className='mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50'>
				<p className='text-sm font-semibold text-gray-700'>
					7-day free trial on all plans
				</p>
			</div>
			<h1 className='max-w-4xl text-4xl font-bold text-gray-900 sm:text-5xl lg:text-6xl'>
				Simple, transparent <span className='text-blue-600'>pricing</span>
			</h1>
			<p className='mt-5 max-w-prose text-lg text-zinc-700'>
				Choose the plan that fits your trading needs. All plans include
				unlimited trading volume and a 7-day free trial.
			</p>
		</section>
	)
}
