'use client'

import { cn } from '@/shared/lib/utils'
import React from 'react'

export type Variant = {
	name: string
	value: string
	disabled?: boolean
}

interface Props {
	items: readonly Variant[]
	onClick?: (value: Variant['value']) => void
	value?: string
	className?: string
}

export const GroupVariants: React.FC<Props> = ({
	items,
	onClick,
	value,
	className,
}) => {
	return (
		<div
			className={cn(
				'flex justify-between rounded-2xl p-1 select-none border-primary border gap-1',
				className
			)}
		>
			{items.map(item => (
				<button
					key={item.name}
					onClick={() => onClick?.(item.value)}
					className={cn(
						'flex items-center justify-center cursor-pointer h-8 px-2 flex-1 rounded-xl transition-all duration-300 text-sm',
						{
							'bg-white shadow': item.value === value,
							'text-gray-500 opacity-50 pointer-events-none': item.disabled,
						}
					)}
				>
					{item.name}
				</button>
			))}
		</div>
	)
}
