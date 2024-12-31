'use client'

import React from 'react'
import { Title } from './title'
import { Input, RangeSlider } from '../ui'
import { CheckboxFiltersGroup } from './checkbox-filters-group'
import { useFilters, useIngredients, useQueryFilters } from '@/shared/hooks'

interface Props {
	className?: string
}

export const Filters: React.FC<Props> = ({ className }) => {
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
		<div className={className}>
			<Title text='Фільтрація' size='sm' className='mb-5 font-extrabold' />
			<CheckboxFiltersGroup
				className='mt-5'
				name='pizzaTypes'
				title='Тип тіста'
				selectedValues={filters.pizzaTypes}
				loading={loading}
				onClickCheckbox={filters.setPizzaTypes}
				limit={2}
				items={[
					{ text: 'Тонке', value: '1' },
					{ text: 'Пухке', value: '2' },
				]}
			/>
			<CheckboxFiltersGroup
				className='mt-5'
				name='sizes'
				title='Розміри'
				selectedValues={filters.sizes}
				loading={loading}
				onClickCheckbox={filters.setSizes}
				limit={3}
				items={[
					{ text: '20 см', value: '20' },
					{ text: '30 см', value: '30' },
					{ text: '40 см', value: '40' },
				]}
			/>
			<div className='mt-5 border-y border-y-neutral-100 py-6 pb-7'>
				<p className='font-bold mb-3'>Ціна від і до</p>
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
				title='Інгредієнти'
				defaultItems={items.slice(0, 5)}
				items={items}
				loading={loading}
				onClickCheckbox={filters.setSelectedIngredients}
				selectedValues={filters.selectedIngredients}
			/>
		</div>
	)
}
