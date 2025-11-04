'use client'

export function PricingHero() {
	return (
		<section className='mt-28 mb-16 flex flex-col items-center justify-center text-center sm:mt-40'>
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
