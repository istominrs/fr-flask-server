import { Plus } from 'lucide-react'

import { StockModal } from '@/components/features/stocks/StockModal'
import { StocksList } from '@/components/features/stocks/StocksList'
import { Button } from '@/components/ui/common/Button'
import { Heading } from '@/components/ui/elements/Heading'

export function Stocks() {
	return (
		<div className='lg:px-10'>
			<div className='flex items-center justify-between'>
				<Heading
					title='Stocks'
					description='Here you can manage your stocks'
					size='lg'
				/>

				<StockModal>
					<Button>
						<Plus /> Add Exchange
					</Button>
				</StockModal>
			</div>

			<div className='mt-5 space-y-6'>
				<Heading
					title='Active stocks'
					description='Stocks that are currently active'
				/>
				<StocksList />
			</div>
		</div>
	)
}
