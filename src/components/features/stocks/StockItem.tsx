import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'

import { Badge } from '@/components/ui/common/Badge'
import { Button } from '@/components/ui/common/Button'
import { Card, CardHeader } from '@/components/ui/common/Card'
import { CardContainer } from '@/components/ui/elements/CardContainer'
import { ConfirmModal } from '@/components/ui/elements/ConfirmModal'

import {
	FindStocksByUserQuery,
	useFindStocksByUserQuery,
	useRemoveStockMutation
} from '@/graphql/generated/output'

import { getStatusBadge } from '@/utils/get-status-badge'

interface StockItemProps {
	stock: FindStocksByUserQuery['findStocksByUser'][0]
}

export function StockItem({ stock }: StockItemProps) {
	const { refetch } = useFindStocksByUserQuery()

	const [remove, { loading: isLoadingRemove }] = useRemoveStockMutation({
		onCompleted() {
			refetch()
			toast.success('Stock deleted')
		},
		onError() {
			toast.error('Error deleting stock')
		}
	})

	return (
		<Card className='relative overflow-hidden'>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 p-6'>
				<div>
					<div className='flex items-center gap-2'>
						<h3 className='text-base, font-semibold, text-gray-900'>
							{stock.title}
						</h3>
						{/*<Badge*/}
						{/*	variant='secondary'*/}
						{/*	className={cn(*/}
						{/*		'rounded-full px-2 py-0.5 text-xs capitalize',*/}
						{/*		account.status === 'active' &&*/}
						{/*			'bg-green-100 text-green-700',*/}
						{/*		account.status === 'inactive' &&*/}
						{/*			'bg-zinc-100 text-zinc-600',*/}
						{/*		account.status === 'error' && 'bg-red-100 text-red-700'*/}
						{/*	)}*/}
						{/*>*/}
						{/*	{account.status}*/}
						{/*</Badge>*/}
						{getStatusBadge(stock.status)}
						<p className='text-sm text-gray-600'>{stock.stock}</p>
					</div>
				</div>

				<ConfirmModal
					heading='Delete Account'
					message='Are you sure you want to delete this trading account? This action cannot be undone.'
					onConfirm={() => remove({ variables: { id: stock.stockId } })}
				>
					<Button
						variant='ghost'
						size='icon'
						className='text-gray-500 hover:text-red-600'
						disabled={isLoadingRemove}
						aria-label='Delete account'
					>
						<Trash2 className='h-5 w-5' />
					</Button>
				</ConfirmModal>
			</CardHeader>
		</Card>
	)
}
