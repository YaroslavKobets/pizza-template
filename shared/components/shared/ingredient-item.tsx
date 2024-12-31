import { cn } from '@/shared/lib/utils'
import { CircleCheck } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

interface Props {
	imageUrl: string
	name: string
	price: number
	active?: boolean
	onClick?: () => void
	className?: string
}

export const IngredientItem: React.FC<Props> = ({
	imageUrl,
	name,
	price,
	active,
	onClick,
	className,
}) => {
	return (
		<div
			className={cn(
				'flex items-center flex-col p-1 rounded-md  text-center relative cursor-pointer shadow-md bg-white border transition-all border-white',
				{ 'border-primary': active },
				className
			)}
			onClick={onClick}
		>
			{active && (
				<CircleCheck className='absolute top-2 right-2 text-primary ' />
			)}
			<div className='relative w-12 h-12'>
				<Image fill src={imageUrl} alt={name} />
			</div>
			<span className='text-xs'>{name}</span>
			<span className='font-bold'>{price} ГРН</span>
		</div>
	)
}
