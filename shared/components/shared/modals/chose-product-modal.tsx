'use client'

import React from 'react'
import { cn } from '@/shared/lib/utils'
import { Dialog, DialogContent } from '@/shared/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { ProductWithRelations } from '@/@types/prisma'
import { ProductForm } from '../product-form'

interface Props {
	product: ProductWithRelations
	className?: string
}

export const ChoseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter()

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn(
					'p-0 max-w-[1060px] min-h-[500px] bg-white overflow-hidden ',
					className
				)}
			>
				<ProductForm product={product} onSubmit={() => router.back()} />
			</DialogContent>
		</Dialog>
	)
}
