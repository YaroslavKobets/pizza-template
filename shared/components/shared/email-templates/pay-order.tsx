import React from 'react'

interface Props {
	orderId: number
	totalAmount: number
}

export const PayOrderTemplate: React.FC<Props> = ({ orderId, totalAmount }) => (
	<div>
		<h1>Zamówienie #{orderId}</h1>

		<p>
			Zapłać za zamówienie w kwocie <b>{totalAmount} zł</b>. Idź do
			<a href='#'>Kliknij ten link</a>, aby zapłacić za zamówienie.
		</p>
	</div>
)
