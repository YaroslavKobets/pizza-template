import React from 'react'
import { WhiteBlock } from '../white-block'
import { FormInput, FormTextarea } from '../form'

interface Props {
	className?: string
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
	return (
		<WhiteBlock className={className} title='Адрес доставки'>
			<div className='grid gap-5'>
				<FormInput
					name='address'
					className='text-base'
					placeholder='Адреса доставки'
				/>
				<FormTextarea
					name='comment'
					rows={5}
					placeholder='Примітка до замовлення'
					className='text-base'
				/>
			</div>
		</WhiteBlock>
	)
}
