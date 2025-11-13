'use client'

import { CandlestickChart, Plus } from 'lucide-react'

import { StockItem } from '@/components/features/stocks/StockItem'
import { StockModal } from '@/components/features/stocks/StockModal'
import { Button } from '@/components/ui/common/Button'
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle
} from '@/components/ui/common/Empty'
import { Heading } from '@/components/ui/elements/Heading'
import { ToggleCardSkeleton } from '@/components/ui/elements/ToggleCardSkeleton'

import { useFindStocksByUserQuery } from '@/graphql/generated/output'

export function StocksList() {
	const { data: stocksData, loading: isLoading } = useFindStocksByUserQuery()
	const userStocks = stocksData?.findStocksByUser ?? []

	return (
		<div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
			<Heading title='Active stocks' size='sm' />
			{isLoading ? (
				Array.from({ length: 3 }).map((_, index) => (
					<ToggleCardSkeleton key={index} />
				))
			) : userStocks.length ? (
				userStocks.map((stock, index) => (
					<StockItem key={index} stock={stock} />
				))
			) : (
				<Empty>
					<EmptyHeader>
						<EmptyMedia variant='icon'>
							<CandlestickChart />
						</EmptyMedia>
						<EmptyTitle>No Stocks Yet</EmptyTitle>
						<EmptyDescription>
							You haven't connected any stocks yet. Get started by
							connected your first stock.
						</EmptyDescription>
					</EmptyHeader>
					<EmptyContent>
						<StockModal>
							<Button>
								<Plus /> Connect Stock
							</Button>
						</StockModal>
					</EmptyContent>
				</Empty>
			)}
		</div>
	)
}
