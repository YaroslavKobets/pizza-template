import React from 'react'
import { WhiteBlock } from '../white-block'
import { FormInput } from '../form'

interface Props {
	className?: string
}

export const CheckoutPersonalInfo: React.FC<Props> = ({ className }) => {
	return (
		<WhiteBlock className={className} title='Dane osobowe'>
			<div className='grid grid-cols-2 gap-2 sm:gap-5'>
				<FormInput name='firstName' className='text-base' placeholder='Nazwa' />
				<FormInput name='lastName' className='text-base' placeholder='Nazwa' />
				<FormInput name='email' className='text-base' placeholder='Email' />
				<FormInput name='phone' className='text-base' placeholder='Telefon' />
			</div>
		</WhiteBlock>
	)
}
