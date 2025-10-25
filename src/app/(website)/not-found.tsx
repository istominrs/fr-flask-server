import Link from 'next/link'

import { Button } from '@/components/ui/common/Button'

export default async function NotFoundPage() {
	return (
		<div className='flex h-[80vh] w-full flex-col items-center justify-center'>
			<div className='px-4 py-10 text-center sm:px-6 lg:px-8'>
				<h1 className='text-foreground block text-7xl font-bold sm:text-9xl'>
					404
				</h1>
				<p className='text-muted-foreground mt-3'>
					Oops, something went wrong.
				</p>
				<Link
					href='/'
					className='mt-5 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-3'
				>
					<Button variant='secondary'>Back to Home</Button>
				</Link>
			</div>
		</div>
	)
}
