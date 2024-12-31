import {
	Container,
	Filters,
	ProductsGroupList,
	Title,
	TopBar,
} from '@/shared/components/shared'
import { Suspense } from 'react'
import { findPizzas } from '@/shared/lib'
import { GetSearchParams } from '@/shared/lib/find-pizzas'

export default async function Home({
	searchParams,
}: {
	searchParams: GetSearchParams
}) {
	const categories = await findPizzas(searchParams)

	return (
		<>
			<Container className='mt-10'>
				<Title text='Всі страви' size='lg' className='font-extrabold' />
			</Container>
			<TopBar
				categories={categories.filter(category => category.products.length > 0)}
			/>
			<Container className='mt-9 pb-14'>
				<div className='flex gap-5 md:gap-10'>
					<div className='flex w-full max-w-40'>
						<Suspense>
							<Filters className='w-full' />
						</Suspense>
					</div>
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
				</div>
			</Container>
		</>
	)
}
