'use client'

import React from 'react'
import { Title } from './title'
import { Input, RangeSlider } from '../ui'
import { CheckboxFiltersGroup } from './checkbox-filters-group'
import { useFilters, useIngredients, useQueryFilters } from '@/shared/hooks'
import { useSidebarStore } from '@/shared/store'
import { cn } from '@/shared/lib'

interface Props {
	className?: string
}

export const Filters: React.FC<Props> = ({ className }) => {
	const { isSidebarOpen } = useSidebarStore()
	const { ingredients, loading } = useIngredients()
	const filters = useFilters()

	useQueryFilters(filters)

	const items = ingredients.map(item => ({
		value: String(item.id),
		text: item.name,
	}))

	const updatePrices = (prices: number[]) => {
		filters.setPrices('priceFrom', prices[0])
		filters.setPrices('priceTo', prices[1])
	}

	return (
		<div
			className={cn(className, {
				'left-0 w-full bg-white max-w-full px-3 pb-5': isSidebarOpen,
			})}
		>
			<Title text='Filtrowanie' size='sm' className='mb-5 font-extrabold' />
			<CheckboxFiltersGroup
				className='mt-5'
				name='pizzaTypes'
				title='Rodzaj ciasta'
				selectedValues={filters.pizzaTypes}
				loading={loading}
				onClickCheckbox={filters.setPizzaTypes}
				limit={2}
				items={[
					{ text: 'Cienki', value: '1' },
					{ text: 'Puszyste', value: '2' },
				]}
			/>
			<CheckboxFiltersGroup
				className='mt-5'
				name='sizes'
				title='Wymiary'
				selectedValues={filters.sizes}
				loading={loading}
				onClickCheckbox={filters.setSizes}
				limit={3}
				items={[
					{ text: '20 cm', value: '20' },
					{ text: '30 cm', value: '30' },
					{ text: '40 cm', value: '40' },
				]}
			/>
			<div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
				<p className='font-bold mb-3'>Cena od i do</p>
				<div className='flex gap-3 mb-5'>
					<Input
						type='number'
						placeholder='0'
						min={0}
						max={1000}
						value={String(filters.prices.priceFrom)}
						onChange={e =>
							filters.setPrices('priceFrom', Number(e.target.value))
						}
					/>
					<Input
						type='number'
						placeholder='1000'
						min={100}
						max={1000}
						value={String(filters.prices.priceTo)}
						onChange={e => filters.setPrices('priceTo', Number(e.target.value))}
					/>
				</div>
				<RangeSlider
					min={0}
					max={1000}
					step={10}
					value={[
						filters.prices.priceFrom || 0,
						filters.prices.priceTo || 1000,
					]}
					onValueChange={updatePrices}
				/>
			</div>
			<CheckboxFiltersGroup
				className='mt-5'
				name='ingredients'
				title='Składniki'
				defaultItems={items.slice(0, 5)}
				items={items}
				loading={loading}
				onClickCheckbox={filters.setSelectedIngredients}
				selectedValues={filters.selectedIngredients}
			/>
		</div>
	)
}
