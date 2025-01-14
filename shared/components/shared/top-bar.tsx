'use client'

import { cn } from '@/shared/lib/utils'
import React from 'react'
import { Container } from './container'
import { Categories } from './categories'
import { Category } from '@prisma/client'
import { Button } from '../ui'
import { useSidebarStore } from '@/shared/store'
import { Eye, EyeOff } from 'lucide-react'

interface Props {
	className?: string
	isSmallScreen?: boolean
	categories: Category[]
}

export const TopBar: React.FC<Props> = ({
	categories,
	isSmallScreen,
	className,
}) => {
	const { isSidebarOpen, toggleSidebar } = useSidebarStore()

	return (
		<div
			className={cn(
				'sticky top-0 bg-white py-2 sm:py-5 shadow-lg shadow-black/5 z-10',
				className
			)}
		>
			<Container className='flex gap-2 flex-wrap sm:flex-nowrap'>
				{!isSidebarOpen && <Categories items={categories} />}
				{/* <SortPopup /> */}
				{isSmallScreen && (
					<Button
						onClick={toggleSidebar}
						className='w-full flex gap-2 items-center'
					>
						Filtry
						{isSidebarOpen ? <EyeOff /> : <Eye />}
					</Button>
				)}
			</Container>
		</div>
	)
}
