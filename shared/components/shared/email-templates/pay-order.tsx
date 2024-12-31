import React from 'react'

interface Props {
	orderId: number
	totalAmount: number
}

export const PayOrderTemplate: React.FC<Props> = ({ orderId, totalAmount }) => (
	<div>
		<h1>Замовлення #{orderId}</h1>

		<p>
			Оплатіть замовлення на суму <b>{totalAmount} ₴</b>. Перейдіть
			<a href='#'>за цим посиланням</a> для оплати замовлення.
		</p>
	</div>
)
