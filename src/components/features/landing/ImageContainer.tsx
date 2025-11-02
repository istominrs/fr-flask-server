import Image from 'next/image'

interface ImageContainerProps {
	src: string
	alt: string
	width: number
	height: number
	quality: number
}

export function ImageContainer({
	src,
	alt,
	width,
	height,
	quality
}: ImageContainerProps) {
	return (
		<div className='mx-auto max-w-6xl px-6 lg:px-8'>
			<div className='mt-16 flow-root sm:mt-24'>
				<div className='-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-gray-900/10 ring-inset lg:m-4 lg:rounded-2xl lg:p-4'>
					<Image
						src={src}
						alt={alt}
						width={width}
						height={height}
						quality={quality}
						className='rounded-md bg-white p-2 shadow-2xl ring-1 ring-gray-900/10 sm:p-8 md:p-20'
					/>
				</div>
			</div>
		</div>
	)
}
