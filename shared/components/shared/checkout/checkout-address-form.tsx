import React from 'react'
import { WhiteBlock } from '../white-block'
import { FormInput, FormTextarea } from '../form'

interface Props {
	className?: string
}

export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
	return (
		<WhiteBlock className={className} title='Adres dostawy'>
			<div className='grid gap-2 sm:gap-5'>
				<FormInput
					name='address'
					className='text-base'
					placeholder='Adres dostawy'
				/>
				<FormTextarea
					name='comment'
					rows={5}
					placeholder='Notatka dotycząca zamówienia'
					className='text-base'
				/>
			</div>
		</WhiteBlock>
	)
}
