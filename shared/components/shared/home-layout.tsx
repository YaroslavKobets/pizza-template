'use client'

import {
	Container,
	Filters,
	ProductsGroupList,
	Title,
	TopBar,
} from '@/shared/components/shared'
import React, { Suspense, useEffect, useState } from 'react'
import { useSidebarStore } from '@/shared/store'
import { cn } from '@/shared/lib'

export const HomeLayout = ({ categories }: { categories: any }) => {
	const { isSidebarOpen } = useSidebarStore()
	const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false)

	useEffect(() => {
		const checkScreenSize = () => {
			setIsSmallScreen(window.innerWidth < 640)
		}

		checkScreenSize()
		window.addEventListener('resize', checkScreenSize)

		return () => {
			window.removeEventListener('resize', checkScreenSize)
		}
	}, [])

	return (
		<>
			<Container className='mt-4 md:mt-10'>
				<Title text='Wszystkie potrawи' size='lg' className='font-extrabold' />
			</Container>
			<TopBar
				isSmallScreen={isSmallScreen}
				categories={categories.filter(category => category.products.length > 0)}
			/>
			<Container className='mt-9 pb-14 relative'>
				<div className='flex items-start gap-4 md:gap-10'>
					{isSmallScreen && isSidebarOpen ? (
						<Suspense>
							<Filters
								className={cn(
									'sm:relative top-0 sm:left-0 w-full max-w-40',
									'grid absolute -left-44'
								)}
							/>
						</Suspense>
					) : (
						<>
							<Suspense>
								<Filters
									className={cn('sm:relative top-0 sm:left-0 w-full max-w-40', {
										'grid absolute -left-44': isSmallScreen,
									})}
								/>
							</Suspense>

							<div className='flex-1'>
								<div className='flex flex-col gap-10'>
									{categories.map(
										category =>
											category.products.length > 0 && (
												<ProductsGroupList
													key={category.id}
													title={category.name}
													categoryId={category.id}
													items={category.products}
												/>
											)
									)}
								</div>
							</div>
						</>
					)}
				</div>
			</Container>
		</>
	)
}
