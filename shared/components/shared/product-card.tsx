import Link from 'next/link'
import React from 'react'
import { Title } from './title'
import { Button } from '../ui'
import { Plus } from 'lucide-react'
import { Ingredient } from '@prisma/client'

interface Props {
	id: number
	name: string
	ingredients: Ingredient[]
	price?: number
	imageUrl: string
	categoryId?: number
	className?: string
}

export const ProductCard: React.FC<Props> = ({
	className,
	imageUrl,
	id,
	name,
	price,
	ingredients,
	categoryId,
}) => {
	return (
		<div className={className}>
			<Link href={`/product/${id}`} className='grid h-full'>
				<div className='flex justify-center p-6 bg-secondary rounded-lg h-[260px]'>
					<img src={imageUrl} alt={name} />
				</div>
				<Title text={name} size='sm' className='mb-1 mt-3 font-bold' />
				<p className='text-sm text-gray-400'>
					{ingredients
						.map(ingredient => ingredient.name.replace(' 50 gr', ''))
						.join(', ')}
				</p>
				<div className='flex items-center justify-between mt-4'>
					<span className='text-xl'>
						{categoryId === 1 && 'od'} <b>{price}</b> zł
					</span>
					<Button variant='secondary' className='text-base font-bold'>
						<Plus size={20} className='mr-1' />
						Wybierać
					</Button>
				</div>
			</Link>
		</div>
	)
}
