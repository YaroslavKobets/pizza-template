'use client'

import React from 'react'
import { cn } from '@/shared/lib'
import { X } from 'lucide-react'
import { CartItemProps } from './cart-item-details/cart-item-details.types'
import * as CartItemDetails from './cart-item-details'

interface Props extends CartItemProps {
	onClickCountButton?: (type: 'plus' | 'minus') => void
	onClickRemove?: () => void
	className?: string
}

export const CheckoutItem: React.FC<Props> = ({
	name,
	price,
	imageUrl,
	quantity,
	details,
	className,
	disabled,
	onClickCountButton,
	onClickRemove,
}) => {
	return (
		<div
			className={cn(
				'flex items-center justify-between gap-3 flex-wrap lg:flex-nowrap',
				{
					'opacity-50 pointer-events-none': disabled,
				},
				className
			)}
		>
			<div className='flex items-center gap-5 flex-1 min-w-full lg:min-w-max'>
				<CartItemDetails.Image src={imageUrl} />
				<CartItemDetails.Info name={name} details={details} />
			</div>

			<CartItemDetails.Price value={price} />

			<div className='flex items-center gap-2 '>
				<CartItemDetails.CountButton
					onClick={onClickCountButton}
					value={quantity}
				/>
				<button type='button' onClick={onClickRemove}>
					<X
						className='text-gray-400 cursor-pointer hover:text-gray-600'
						size={20}
					/>
				</button>
			</div>
		</div>
	)
}
