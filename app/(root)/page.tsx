import { HomeLayout } from '@/shared/components'
import { findPizzas } from '@/shared/lib'
import { GetSearchParams } from '@/shared/lib/find-pizzas'

export default async function Home({
	searchParams,
}: {
	searchParams: GetSearchParams
}) {
	const categories = await findPizzas(searchParams)

	return <HomeLayout categories={categories} />
}
