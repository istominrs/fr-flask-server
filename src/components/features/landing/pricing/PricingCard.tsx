import { Check } from 'lucide-react'
import Link from 'next/link'

import type { PricingPlan } from '@/components/features/landing/pricing/pricing.interface'
import { buttonVariants } from '@/components/ui/common/Button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/common/Card'

import { cn } from '@/utils/tw-merge'

interface PricingCardProps {
	plan: PricingPlan
}

export function PricingCard({ plan }: PricingCardProps) {
	return (
		<Card
			className={cn(
				'relative flex flex-col',
				plan.isPopular &&
					'border-2 border-blue-600 shadow-lg ring-2 ring-blue-600/20'
			)}
		>
			{plan.isPopular && (
				<div className='absolute -top-4 left-1/2 -translate-x-1/2'>
					<span className='rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white'>
						Most Popular
					</span>
				</div>
			)}

			<CardHeader>
				<div className='grid grid-cols-[1fr_auto] items-center gap-y-2'>
					<CardTitle className='col-start-1 text-2xl text-gray-900'>
						{plan.name}
					</CardTitle>

					<div className='col-start-2 text-right leading-tight'>
						<span className='text-4xl font-bold text-gray-900'>
							${plan.price}
						</span>
						<span className='ml-1 text-gray-600'>/{plan.period}</span>
					</div>

					<CardDescription className='col-span-2 mt-2 text-base text-gray-600'>
						{plan.description}
					</CardDescription>
				</div>
			</CardHeader>

			<CardContent className='flex-1'>
				<ul className='space-y-3'>
					{plan.features.map(feature => (
						<li key={feature} className='flex items-start gap-3'>
							<Check
								aria-hidden
								className='mt-0.5 h-5 w-5 shrink-0 text-blue-600'
							/>
							<span className='text-sm text-gray-700'>{feature}</span>
						</li>
					))}
				</ul>
			</CardContent>

			<CardFooter>
				<Link
					href={plan.buttonHref}
					className={cn(
						buttonVariants({
							variant: plan.isPopular ? 'default' : 'outline',
							size: 'lg'
						}),
						'w-full font-semibold'
					)}
				>
					{plan.buttonText}
				</Link>
			</CardFooter>
		</Card>
	)
}
