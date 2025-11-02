import { FAQColumn } from '@/components/features/landing/faq/FAQColumn'

export function FAQQuestions() {
	const leftColumn = [
		{
			value: 'item-1',
			question: 'What is automated trading?',
			answer:
				'Automated trading uses pre-programmed algorithms to execute trades on your behalf based on specific market conditions and strategies. TeaTrade automates the entire process, allowing you to trade 24/7 without manual intervention.'
		},
		{
			value: 'item-2',
			question: 'Which exchanges are supported?',
			answer:
				'TeaTrade supports all major cryptocurrency exchanges including Binance, Coinbase Pro, Kraken, Bitfinex, and more. You can connect multiple exchanges to your account and manage them all from one dashboard.'
		},
		{
			value: 'item-3',
			question: 'Is my money safe with TeaTrade?',
			answer:
				'Yes, absolutely. TeaTrade never holds your funds. We only connect to exchanges via API keys with trading permissions only (no withdrawal permissions). Your funds always remain in your exchange account under your control.'
		}
	]

	const rightColumn = [
		{
			value: 'item-4',
			question: 'How much does TeaTrade cost?',
			answer:
				'We offer a 7-day free trial with full access to all features. After that, plans start at $29/month for the Basic plan, $79/month for Pro, and $199/month for Enterprise. All plans include unlimited trading volume.'
		},
		{
			value: 'item-5',
			question: 'Do I need trading experience?',
			answer:
				'No trading experience is required! Our pre-configured strategies are designed for both beginners and advanced traders. We provide detailed documentation, video tutorials, and 24/7 support to help you get started.'
		},
		{
			value: 'item-6',
			question: 'Can I customize trading strategies?',
			answer:
				'Yes! All our strategies are fully customizable. You can adjust parameters like grid levels, investment amounts, stop-loss limits, and risk levels. Advanced users can also create custom strategies from scratch using our strategy builder.'
		}
	]

	return (
		<div className='mt-10 grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 mx-auto'>
			<div className='space-y-6'>
				{leftColumn.map((item, index) => (
					<FAQColumn key={index} faqItem={item} />
				))}
			</div>
			<div className='space-y-6'>
				{rightColumn.map((item, index) => (
					<FAQColumn key={index} faqItem={item} />
				))}
			</div>
		</div>
	)	
}
