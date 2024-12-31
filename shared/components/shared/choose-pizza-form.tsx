'use client'

import React from 'react'
import { Ingredient, ProductItem } from '@prisma/client'
import { ProductImage } from './product-image'
import { Title } from './title'
import { Button } from '../ui'
import { GroupVariants } from './group-variants'
import { PizzaSize, PizzaType, pizzaTypes } from '@/shared/constants/pizza'
import { IngredientItem } from './ingredient-item'
import { cn, getPizzaDetails } from '@/shared/lib'
import { usePizzaOptions } from '@/shared/hooks'

interface Props {
	imageUrl: string
	name: string
	ingredients: Ingredient[]
	items: ProductItem[]
	onSubmit: (itemId: number, ingredients: number[]) => void
	loading?: boolean
	className?: string
}

export const ChoosePizzaForm: React.FC<Props> = ({
	imageUrl,
	ingredients,
	name,
	items,
	loading,
	onSubmit,
	className,
}) => {
	const {
		size,
		type,
		setSize,
		setType,
		addIngredient,
		availableSizes,
		selectedIngredients,
		currentItemId,
	} = usePizzaOptions(items)

	const { textDetails, totalPrice } = getPizzaDetails(
		type,
		size,
		items,
		ingredients,
		selectedIngredients
	)

	const handleClickAdd = () => {
		if (currentItemId) {
			onSubmit(currentItemId, Array.from(selectedIngredients))
		}
	}

	return (
		<div className={cn('flex flex-1', className)}>
			<ProductImage sizeLine={true} imageUrl={imageUrl} size={size} />

			<div className='w-[490px] bg-primary/10 p-7'>
				<Title text={name} size='md' className='font-extrabold mb-1' />
				<p className='text-gray-400'>{textDetails}</p>

				<div className='grid gap-4 my-5'>
					<GroupVariants
						items={availableSizes}
						value={String(size)}
						onClick={value => setSize(Number(value) as PizzaSize)}
					/>

					<GroupVariants
						items={pizzaTypes}
						value={String(type)}
						onClick={value => setType(Number(value) as PizzaType)}
					/>
				</div>

				<div className='bg-green-50 p-2 rounded-sm h-40 overflow-auto scrollbar'>
					<div className='grid grid-cols-3 gap-2'>
						{ingredients.map(ingredient => (
							<IngredientItem
								key={ingredient.id}
								imageUrl={ingredient.imageUrl}
								name={ingredient.name}
								price={ingredient.price}
								active={selectedIngredients.has(ingredient.id)}
								onClick={() => addIngredient(ingredient.id)}
							/>
						))}
					</div>
				</div>

				<Button
					loading={loading}
					onClick={handleClickAdd}
					className='h-14 px-10 text-base rounded-2xl w-full mt-8'
				>
					Додати в кошик за {totalPrice} ГРН
				</Button>
			</div>
		</div>
	)
}
