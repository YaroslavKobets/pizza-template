'use client'

import { ProductWithRelations } from '@/@types/prisma'
import { useCartStore } from '@/shared/store'
import React from 'react'
import { ChoosePizzaForm } from './choose-pizza-form'
import { ChooseProductForm } from './choose-product-form'
import toast from 'react-hot-toast'

interface Props {
	product: ProductWithRelations
	onSubmit?: VoidFunction
}

export const ProductForm: React.FC<Props> = ({
	product,
	onSubmit: _onSubmit,
}) => {
	const addCartItem = useCartStore(state => state.addCartItem)
	const loading = useCartStore(state => state.loading)

	const firstItem = product.items[0]
	const isPizzaForm = Boolean(firstItem.pizzaType)

	const onSubmit = async (productItemId?: number, ingredients?: number[]) => {
		try {
			const itemId = productItemId ?? firstItem.id

			await addCartItem({
				productItemId: itemId,
				ingredients,
			})

			toast.success(`${product.name} został dodany do koszyka`)
			_onSubmit?.()
		} catch (error) {
			toast.error(`Nie udało się dodać ${product.name} do koszyka`)
			console.log(error)
		}
	}
	if (isPizzaForm) {
		return (
			<ChoosePizzaForm
				imageUrl={product.imageUrl}
				name={product.name}
				ingredients={product.ingredients}
				items={product.items}
				onSubmit={onSubmit}
				loading={loading}
			/>
		)
	}

	return (
		<ChooseProductForm
			imageUrl={product.imageUrl}
			name={product.name}
			price={firstItem.price}
			onSubmit={onSubmit}
			loading={loading}
		/>
	)
}
