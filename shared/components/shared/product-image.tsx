import { PizzaSize } from '@/shared/constants/pizza'
import { cn } from '@/shared/lib/utils'
import Image from 'next/image'
import React from 'react'

interface Props {
	className?: string
	imageUrl: string
	size: PizzaSize
	sizeLine?: boolean
}

export const ProductImage: React.FC<Props> = ({
	imageUrl,
	size,
	className,
	sizeLine = false,
}) => {
	const imageSize = (size: PizzaSize): number => {
		switch (size) {
			case 20:
				return 20
			case 30:
				return 10
			case 40:
				return 0
			default:
				return 10
		}
	}
	return (
		<div
			className={cn(
				'flex items-center justify-center flex-1 relative w-full m-5',
				className
			)}
		>
			<div className='relative max-w-[500px] w-full flex items-center justify-center aspect-square'>
				<Image
					src={imageUrl}
					fill
					className={cn('transition-all z-10 duration-300')}
					style={{ padding: `${imageSize(size)}%` }}
					alt=''
				/>
				{sizeLine && (
					<>
						<div className='absolute inset-[20%] border-2 border-dotted rounded-full border-primary/50'></div>
						<div className='absolute inset-[10%] border-2 border-dotted rounded-full border-primary/50'></div>
						<div className='absolute inset-0 border-2 border-dotted rounded-full border-primary/50'></div>
					</>
				)}
			</div>
		</div>
	)
}
