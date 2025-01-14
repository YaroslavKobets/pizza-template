import { cn } from '@/shared/lib'
import React from 'react'
import { CountIconButton } from './count-icon-button'

interface CountButtonProps {
	value?: number
	onClick?: (type: 'plus' | 'minus') => void
	className?: string
}

export const CountButton: React.FC<CountButtonProps> = ({
	className,
	onClick,
	value = 1,
}) => {
	return (
		<div
			className={cn(
				'inline-flex items-center justify-between gap-3 ',
				className
			)}
		>
			<CountIconButton
				onClick={() => onClick?.('minus')}
				disabled={value === 1}
				type='minus'
			/>

			<b className='text-sm'>{value}</b>

			<CountIconButton onClick={() => onClick?.('plus')} type='plus' />
		</div>
	)
}
