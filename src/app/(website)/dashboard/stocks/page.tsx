import type { Metadata } from 'next'

import { Stocks } from '@/components/features/stocks/Stocks'

export const metadata: Metadata = {
	title: 'Stocks'
}

export default function StocksPage() {
	return <Stocks />
}
