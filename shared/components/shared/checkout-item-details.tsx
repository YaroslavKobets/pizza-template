import { cn } from '@/shared/lib'
import React from 'react'

interface Props {
	title?: React.ReactNode
	value?: React.ReactNode
	className?: string
}

export const CheckoutItemDetails: React.FC<Props> = ({
	title,
	value,
	className,
}) => {
	return (
		<div className={cn('flex gap-2', className)}>
			<span className='flex  gap-2 text-lg text-neutral-500 w-full'>
				{title}
				<span className='flex-1 border-b border-b-neutral-200 border-dashed relative -top-2'></span>
			</span>
			<span className=' text-lg whitespace-nowrap'>{value}</span>
		</div>
	)
}
