'use client'

import React from 'react'
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetFooter,
	SheetTrigger,
	SheetClose,
} from '@/shared/components/ui/sheet'
import Link from 'next/link'
import { Button } from '../ui'
import { ArrowLeft, ArrowRight, CircleAlert, ShoppingCart } from 'lucide-react'
import { CartDrawerItem } from './cart-drawer-item'
import { getCartItemDetails } from '@/shared/lib'
import { PizzaSize, PizzaType } from '@/shared/constants/pizza'
import { Title } from './title'
import { useCart } from '@/shared/hooks'

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
	const { items, totalAmount, updateItemQuantity, removeCartItem } = useCart()
	const [redirecting, setRedirecting] = React.useState(false)

	const onClickCountButton = (
		id: number,
		quantity: number,
		type: 'plus' | 'minus'
	) => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
		updateItemQuantity(id, newQuantity)
	}

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>
			<SheetContent className='flex flex-col w-full  pb-0 bg-gray-100 border-0'>
				{totalAmount > 0 && (
					<SheetHeader>
						<SheetTitle>
							В кошику <span className='font-bold'>{items.length} товари</span>
						</SheetTitle>
					</SheetHeader>
				)}

				{!totalAmount && (
					<div className='flex flex-col items-center justify-center mx-auto h-full'>
						<div className='relative flex justify-center'>
							<ShoppingCart size={100} />
							<CircleAlert
								className='absolute -top-4 right-6'
								strokeWidth={3}
								size={40}
							/>
						</div>
						<Title
							text='Кошик порожній'
							size='md'
							className='text-center font-bold my-2'
						/>
						<p className='text-neutral-500 mb-5'>
							Оберіть страву, щоб зробити замовлення
						</p>
						<SheetClose>
							<Button className='text-base' size='lg'>
								<ArrowLeft size={20} className='mr-2' />
								Повернутися назад
							</Button>
						</SheetClose>
					</div>
				)}

				{totalAmount > 0 && (
					<>
						<div className='-mx-6 overflow-auto grid gap-2'>
							{items.map(item => (
								<CartDrawerItem
									key={item.id}
									id={item.id}
									imageUrl={item.imageUrl}
									name={item.name}
									price={item.price}
									quantity={item.quantity}
									details={getCartItemDetails(
										item.ingredients,
										item.pizzaType as PizzaType,
										item.pizzaSize as PizzaSize
									)}
									onClickCountButton={type =>
										onClickCountButton(item.id, item.quantity, type)
									}
									onClickRemove={() => removeCartItem(item.id)}
									disabled={item.disabled}
								/>
							))}
						</div>

						<SheetFooter className=' bg-white mt-auto -mx-6 px-6 py-4'>
							<div className='w-full '>
								<div className='flex mb-4'>
									<span className='flex flex-1 text-lg text-neutral-500'>
										Сума
										<div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
									</span>
									<span className='font-bold text-lg'>{totalAmount} грн</span>
								</div>
								<Link href='/checkout'>
									<Button
										onClick={() => setRedirecting(true)}
										loading={redirecting}
										type='submit'
										className='w-full h-12 text-base'
									>
										Оформить замовлення <ArrowRight className='w-5 ml-2' />
									</Button>
								</Link>
							</div>
						</SheetFooter>
					</>
				)}
			</SheetContent>
		</Sheet>
	)
}
