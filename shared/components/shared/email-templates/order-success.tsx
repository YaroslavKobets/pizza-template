import { CartItemDTO } from '@/shared/services/dto/cart.dto'
import React from 'react'

interface Props {
	orderId: number
	items: CartItemDTO[]
}

export const OrderSuccessTemplate: React.FC<Props> = ({ orderId, items }) => (
	<div>
		<h1>Dziękujemy za zakup! 🎉</h1>

		<p>Twoje zamówienie nr {orderId} zostało opłacone. Lista produktów:</p>

		<hr />

		<ul>
			{items.map(item => (
				<li key={item.id}>
					{item.productItem.product.name} | {item.productItem.price} zł x{' '}
					{item.quantity} szt. = {item.productItem.price * item.quantity} zł
				</li>
			))}
		</ul>
	</div>
)
