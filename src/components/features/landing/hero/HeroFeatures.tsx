import { ChartNoAxesColumn, HammerIcon, ZapIcon } from 'lucide-react'

import { Feature } from '@/components/features/landing/hero/feature.interface'
import {
	Card,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/common/Card'

export function HeroFeatures() {
	const features: Feature[] = [
		{
			title: 'Strategy Builder',
			description:
				'Create custom trading strategies with our intuitive visual editor.',
			icon: HammerIcon
		},
		{
			title: 'Advanced Backtesting',
			description:
				'Test your strategies against historical data with accurate simulations.',
			icon: ChartNoAxesColumn
		},
		{
			title: 'Real-time Analytics',
			description:
				'Monitor your positions and performance with live dashboards.',
			icon: ZapIcon
		}
	]

	return (
		<div className='grid grid-cols-1 gap-6 pt-8 sm:grid-cols-3'>
			{features.map((feature, index) => (
				<Card
					key={index}
					className='group bg-card/50 hover:bg-card hover:border-primary/30 relative transition-all duration-200 hover:shadow-md'
				>
					<CardHeader className='flex-col items-center gap-3 px-6'>
						<div className='bg-primary/10 text-primary group-hover:bg-primary/20 mb-3 flex size-12 items-center justify-center rounded-lg transition-colors'>
							<feature.icon />
						</div>

						<CardTitle className='text-lg'>{feature.title}</CardTitle>
						<CardDescription>{feature.description}</CardDescription>
					</CardHeader>
				</Card>
			))}
		</div>
	)
}
