'use client'

import React from 'react'
import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox'
import { Input } from '../ui'
import { Skeleton } from '../ui/skeleton'

type Item = FilterCheckboxProps

interface Props {
	title: string
	items: Item[]
	defaultItems?: Item[]
	limit?: number
	loading?: boolean
	searchInputPlaceholder?: string
	onClickCheckbox?: (id: string) => void
	selectedValues: Set<string>
	defaultValue?: string
	className?: string
	name?: string
}

export const CheckboxFiltersGroup: React.FC<Props> = ({
	title,
	items,
	defaultItems,
	limit = 5,
	searchInputPlaceholder = 'Szukaj...',
	className,
	loading,
	onClickCheckbox,
	selectedValues,
	name,
}) => {
	const [showAll, setShowAll] = React.useState(false)
	const [searchValue, setSearchValue] = React.useState('')

	if (loading) {
		return (
			<div className={className}>
				<p className='font-bold mb-3'>{title}</p>

				{...Array(limit)
					.fill(0)
					.map((_, index) => (
						<Skeleton className='mb-4 h-6 rounded-md' key={index} />
					))}
				{items.length < limit && (
					<Skeleton className='mb-4 h-6 rounded-md w-3/4' />
				)}
			</div>
		)
	}

	const list = showAll
		? items.filter(item =>
				item.text.toLowerCase().includes(searchValue.toLocaleLowerCase())
		  )
		: (defaultItems || items).slice(0, limit)
	const onChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}
	return (
		<div className={className}>
			<p className='font-bold mb-3'>{title}</p>
			{showAll && (
				<div className='mb-5'>
					<Input
						onChange={onChangeSearchInput}
						placeholder={searchInputPlaceholder}
						className='bg-gray-50 border-none'
					/>
				</div>
			)}

			<div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
				{list.map(item => (
					<FilterCheckbox
						text={item.text.replace(' 50 gr', '')}
						checked={selectedValues?.has(item.value)}
						onCheckedChange={() => onClickCheckbox?.(item.value)}
						key={item.value}
						value={item.value}
						endAdornment={item.endAdornment}
						name={name}
					/>
				))}
			</div>
			{items.length > limit && (
				<div className={showAll ? 'border-t border-t-neutral-100 mt-4' : ''}>
					<button
						onClick={() => setShowAll(!showAll)}
						className='text-primary mt-3'
					>
						{showAll ? 'Ukrywać' : '+ Pokaż wszystko'}
					</button>
				</div>
			)}
		</div>
	)
}
