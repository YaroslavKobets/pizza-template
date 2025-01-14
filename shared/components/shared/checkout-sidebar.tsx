import React from 'react'
import { WhiteBlock } from './white-block'
import { CheckoutItemDetails } from './checkout-item-details'
import { ArrowRight, Package, Truck } from 'lucide-react'
import { Button } from '../ui'
import { Skeleton } from '../ui/skeleton'

interface Props {
	totalAmount: number
	loading?: boolean
}

export const CheckoutSidebar: React.FC<Props> = ({ totalAmount, loading }) => {
	const DELIVER_PRICE = 60
	const totalPrice = totalAmount + DELIVER_PRICE

	return (
		<div>
			<WhiteBlock title='Koszyk' className='sticky top-4'>
				<div className='flex items-center justify-between mb-4'>
					<span className='text-xl'>Kwota zamówienia:</span>
					{loading ? (
						<Skeleton className='h-7 w-28' />
					) : (
						<span className='text-xl font-extrabold'>{totalPrice} zł</span>
					)}
				</div>
				<div className='grid gap-2'>
					<CheckoutItemDetails
						title={
							<>
								<Package />
								Koszt towaru:
							</>
						}
						value={
							loading ? <Skeleton className='h-7 w-24' /> : `${totalAmount} zł`
						}
					/>

					<CheckoutItemDetails
						title={
							<>
								<Truck />
								Dostawa:
							</>
						}
						value={
							loading ? (
								<Skeleton className='h-7 w-20' />
							) : (
								`${DELIVER_PRICE} zł`
							)
						}
					/>
				</div>
				<Button
					loading={loading}
					type='submit'
					className='h-14 rounded-2xl text-base w-full mt-6 gap-2'
				>
					Przejdź do płatności <ArrowRight size={20} />
				</Button>
			</WhiteBlock>
		</div>
	)
}
