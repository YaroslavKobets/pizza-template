'use client'

import { cn } from '@/shared/lib/utils'
import { useCategoryStore } from '@/shared/store/category'
import { Category } from '@prisma/client'
import React from 'react'

interface Props {
	className?: string
	items: Category[]
}

export const Categories: React.FC<Props> = ({ items, className }) => {
	const categoryActiveId = useCategoryStore(state => state.activeId)
	return (
		<div
			className={cn(
				'inline-flex gap-1 bg-gray-50 p-1 rounded-2xl flex-wrap',
				className
			)}
		>
			{items.map(({ name, id }, index) => (
				<a
					href={`/#${name}`}
					className={cn(
						'flex items-center font-bold h-6 sm:h-11 rounded-2xl px-3 sm:px-5',
						categoryActiveId === id &&
							'bg-white shadow-md shadow-gray-200 text-primary'
					)}
					key={index}
				>
					<button>{name}</button>
				</a>
			))}
		</div>
	)
}
