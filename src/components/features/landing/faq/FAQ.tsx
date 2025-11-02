import { FAQQuestions } from '@/components/features/landing/faq/FAQQuestions'
import { WidthLayoutContainer } from '@/components/layout/WidthLayoutContainer'

export function FAQ() {
	return (
		<>

		<WidthLayoutContainer className='mt-28 mb-12 flex flex-col items-center justify-center text-center sm:mt-40'>
			<h2 className='mt-2 text-4xl font-semibold text-gray-900 sm:text-5xl'>
				Frequently Asked Questions
			</h2>
			<p className='mt-4 text-lg text-gray-600'>
				Everything you need to know about TeaTrade and automated trading.
			</p>
			<FAQQuestions />
		</WidthLayoutContainer>
		</>
	)
}
