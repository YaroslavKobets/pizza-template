'use client'

import { cn } from '@/shared/lib/utils'
import { Api } from '@/shared/services/api-client'
import { Product } from '@prisma/client'
import { Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useClickAway, useDebounce } from 'react-use'

interface Props {
	className?: string
}

export const SearchInput: React.FC<Props> = ({ className }) => {
	const [searchQuery, setSearchQuery] = React.useState('')
	const [products, setProducts] = React.useState<Product[]>([])
	const [focused, setFocused] = React.useState(false)
	const ref = React.useRef(null)

	useClickAway(ref, () => {
		setFocused(false)
	})

	useDebounce(
		async () => {
			try {
				const response = await Api.products.search(searchQuery)
				setProducts(response)
			} catch (error) {
				console.log(error)
			}
		},
		300,
		[searchQuery]
	)

	const onClickItem = () => {
		setFocused(false)
		setSearchQuery('')
		setProducts([])
	}

	return (
		<>
			{
				<div
					className={cn(
						'fixed inset-0 bg-black/50 z-30 opacity-0 transition-all duration-200 invisible',
						focused && 'visible opacity-100 '
					)}
				></div>
			}

			<div
				ref={ref}
				className={cn(
					'flex rounded-2xl flex-1 justify-between relative h-11 z-30',

					className
				)}
			>
				<Search
					size={20}
					className='absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 pointer-events-none'
				/>
				<input
					type='text'
					placeholder='Знайти піцу...'
					className={cn(
						'rounded-2xl outline-none w-full bg-gray-100 pl-11 transition-all duration-200',
						focused && 'rounded-b-[0px]'
					)}
					onFocus={() => setFocused(true)}
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
				/>

				<div
					className={cn(
						'absolute w-full bg-white rounded-b-2xl top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
						focused && 'visible opacity-100 top-full'
					)}
				>
					{products.length > 0 ? (
						products.map(product => (
							<Link
								key={product.id}
								href={`/product/${product.id}`}
								onClick={onClickItem}
							>
								<div className='flex items-center gap-3 px-3 py-2 hover:bg-primary/10 '>
									<Image
										height={40}
										width={40}
										src={product.imageUrl}
										alt={product.name}
									/>
									{product.name}
								</div>
							</Link>
						))
					) : (
						<div className='gap-3 px-3 py-2'>Нічого не знайдено 😱</div>
					)}
				</div>
			</div>
		</>
	)
}
