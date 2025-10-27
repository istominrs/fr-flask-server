import Link from 'next/link'

import { Button } from '@/components/ui/common/Button'

export function HeroAction() {
	return (
		<div className='flex flex-col items-center gap-4'>
			<Link href='/account/create'>
				<Button
					size='lg'
					className='bg-primary h-14 min-w-[300px] rounded-xl'
				>
					<span className='text-lg font-semibold'>Start Free Trial</span>
				</Button>
			</Link>

			<p className='text-muted-foreground text-m'>
				✓ 7-day free trial • ✓ No credit card required • ✓ Cancel anytime
			</p>
		</div>
	)
}
