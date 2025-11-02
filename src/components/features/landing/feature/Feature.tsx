'use client'

import Link from 'next/link'

import { ImageContainer } from '@/components/features/landing/ImageContainer'
import { FeatureStepItem } from '@/components/features/landing/feature/FeatureStepItem'
import { Step } from '@/components/features/landing/feature/step.interface'

export function Feature() {
	const steps: Step[] = [
		{
			number: 1,
			title: 'Sign up for an account',
			description: (
				<>
					Either starting out with a free plan or choose our{' '}
					<Link
						href='/pricing'
						className='text-blue-700 underline underline-offset-2'
					>
						pro plan
					</Link>
					.
				</>
			)
		},
		{
			number: 2,
			title: 'Create your strategy',
			description:
				'We will process your strategy and make it ready for you to trade with.'
		},
		{
			number: 3,
			title: 'Start trading',
			description:
				'It is that simple. Try out TeaTrade today - it really takes less than a minute.'
		}
	]

	return (
		<>
			<div className='mx-auto mt-32 mb-32 max-w-5xl sm:mt-56'>
				<div className='mb-12 px-6 lg:px-8'>
					<div className='mx-auto max-w-2xl sm:text-center'>
						<h2 className='mt-2 text-4xl font-semibold text-gray-900 sm:text-5xl'>
							Start trading in minutes
						</h2>
						<p className='mt-4 text-lg text-gray-600'>
							Trading with your own strategies has never been easier than
							with TeaTrade.
						</p>
					</div>
				</div>

				<ol className='my-8 space-y-4 pt-8 md:flex md:space-y-0 md:space-x-12'>
					{steps.map((step, index) => (
						<FeatureStepItem key={index} step={step} />
					))}
				</ol>

				<ImageContainer
					src='/images/strategy-create-preview.png'
					alt='creating preview'
					width={2021}
					height={1255}
					quality={100}
				/>
			</div>
		</>
	)
}
