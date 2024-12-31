import React from 'react'
import { WhiteBlock } from '../white-block'
import { CheckoutItem } from '../checkout-item'
import { getCartItemDetails } from '@/shared/lib'
import { PizzaSize, PizzaType } from '@/shared/constants/pizza'
import { CartStateItem } from '@/shared/lib/get-cart-details'
import { Skeleton } from '../../ui/skeleton'

interface Props {
	items: CartStateItem[]
	onClickCountButton: (
		id: number,
		quantity: number,
		type: 'plus' | 'minus'
	) => void
	removeCartItem: (id: number) => void
	loading?: boolean
	className?: string
}

export const CheckoutCart: React.FC<Props> = ({
	items,
	onClickCountButton,
	removeCartItem,
	loading,
	className,
}) => {
	return (
		<WhiteBlock title='Кошик' className={className}>
			<div className='grid gap-5'>
				{loading
					? [...Array(4)].map((_, index) => (
							<Skeleton key={index} className='h-14' />
					  ))
					: items.map(item => (
							<CheckoutItem
								key={item.id}
								id={item.id}
								name={item.name}
								imageUrl={item.imageUrl}
								details={getCartItemDetails(
									item.ingredients,
									item.pizzaType as PizzaType,
									item.pizzaSize as PizzaSize
								)}
								quantity={item.quantity}
								price={item.price}
								disabled={item.disabled}
								onClickCountButton={type =>
									onClickCountButton(item.id, item.quantity, type)
								}
								onClickRemove={() => removeCartItem(item.id)}
							/>
					  ))}
			</div>
		</WhiteBlock>
	)
}
