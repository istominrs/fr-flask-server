import { FAQItem } from '@/components/features/landing/faq/faq-item.interface'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from '@/components/ui/common/Accordion'

interface FAQColumnProps {
	faqItem: FAQItem
}

export function FAQColumn({ faqItem }: FAQColumnProps) {
	return (
		<div className='space-y-4 w-full max-w-xl mx-auto'>
			<Accordion
				type='single'
				collapsible
				className='space-y-4 w-full'
			>
				<AccordionItem
					value={faqItem.value}
					className='w-full rounded-3xl border border-gray-100 bg-white px-6 shadow-sm transition-shadow duration-200 hover:shadow-md'
				>
					<AccordionTrigger className='py-6 hover:no-underline'>
						<span className='text-lg font-medium text-gray-900'>
							{faqItem.question}
						</span>
					</AccordionTrigger>
					<AccordionContent
						className='pb-6 text-gray-600 overflow-hidden transition-all'
					>
						{faqItem.answer}
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	)
}

