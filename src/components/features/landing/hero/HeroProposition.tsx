'use client'

import { ImageContainer } from '@/components/features/landing/ImageContainer'
import { GradientBackground } from '@/components/features/landing/GradientBackground'

export function HeroProposition() {
	return (
		<GradientBackground>
			<div>
				<ImageContainer
					src='/images/dashboard-preview.png'
					alt='product preview'
					width={2318}
					height={1232}
					quality={100}
				/>
			</div>
		</GradientBackground>
	)
}
