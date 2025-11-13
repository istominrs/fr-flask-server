import { PropsWithChildren } from 'react'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/common/Dialog'

export function StockModal({ children }: PropsWithChildren<unknown>) {
	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent>
				<DialogTitle className='text-xl'>
					Connect Exchange Account
				</DialogTitle>
				<DialogDescription>
					Add your exchange API keys to start automated trading. Your keys
					are encrypted and stored securely.
				</DialogDescription>
			</DialogContent>
		</Dialog>
	)
}
