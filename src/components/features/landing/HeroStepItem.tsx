import { Step } from '@/components/features/landing/step.interface'

interface HeroStepItemProps {
	step: Step
}

export function HeroStepItem({ step }: HeroStepItemProps) {
	return (
		<li className='md:flex-1'>
			<div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-t-2 md:border-l-0 md:pt-4 md:pb-0 md:pl-0'>
				<span className='text-primary text-sm font-medium'>
					Step {step.number}
				</span>
				<span className='text-xl font-semibold'>{step.title}</span>
				<span className='mt-2 text-zinc-700'>{step.description}</span>
			</div>
		</li>
	)
}
