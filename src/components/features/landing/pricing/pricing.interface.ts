export interface PricingPlan {
	name: string
	price: number
	period: string
	description: string
	features: string[]
	isPopular?: boolean
	buttonText: string
	buttonHref: string
}

