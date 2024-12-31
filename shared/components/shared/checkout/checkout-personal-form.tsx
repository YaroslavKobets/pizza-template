import React from 'react'
import { WhiteBlock } from '../white-block'
import { FormInput } from '../form'

interface Props {
	className?: string
}

export const CheckoutPersonalInfo: React.FC<Props> = ({ className }) => {
	return (
		<WhiteBlock className={className} title='Особисті дані'>
			<div className='grid grid-cols-2 gap-5'>
				<FormInput name='firstName' className='text-base' placeholder="Ім'я" />
				<FormInput
					name='lastName'
					className='text-base'
					placeholder='Прізвище'
				/>
				<FormInput name='email' className='text-base' placeholder='Email' />
				<FormInput name='phone' className='text-base' placeholder='Телефон' />
			</div>
		</WhiteBlock>
	)
}
