import { cn } from '@/shared/lib/utils'
import React from 'react'
import { ProductImage } from './product-image'
import { Title } from './title'
import { Button } from '../ui'

interface Props {
	imageUrl: string
	name: string
	price: number
	loading?: boolean
	onSubmit?: VoidFunction
	className?: string
}

export const ChooseProductForm: React.FC<Props> = ({
	imageUrl,
	name,
	price,
	loading,
	onSubmit,
	className,
}) => {
	return (
		<div className={cn('flex flex-1', className)}>
			<ProductImage imageUrl={imageUrl} size={30} />

			<div className='w-[490px] bg-primary/10 p-7'>
				<Title text={name} size='md' className='font-extrabold mb-1' />

				<Button
					loading={loading}
					onClick={() => onSubmit?.()}
					className='h-14 px-10 text-base rounded-2xl w-full'
				>
					Додати в кошик за {price} ГРН
				</Button>
			</div>
		</div>
	)
}
