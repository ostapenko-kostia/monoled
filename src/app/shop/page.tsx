import { categoriesService } from '@/services/categories.service'
import { productsService } from '@/services/products.service'
import { textsService } from '@/services/texts.service'
import { ProductWithItems } from '@/typing/interfaces'
import { filterProducts } from '@/utils/filterProducts'
import { Category, TextField } from '@prisma/client'
import { Metadata } from 'next'
import { Suspense } from 'react'
import { Shop } from './_components/shop'

export const metadata: Metadata = {
	title: 'Lumineka - Каталог товарів'
}

export const revalidate = 180

async function ShopPage({
	searchParams
}: {
	searchParams: Promise<{
		category: string | null
		search: string | null
		sorting: string | null
		page: string | null
		limit: string | null
		showMode: string | null
	}>
}) {
	const categories: Category[] | undefined = (await categoriesService.getAllCategories())?.data
	const products: ProductWithItems[] | undefined = (await productsService.getAllProducts())?.data
	const texts: TextField[] | undefined = await textsService.getAllTexts()

	const searchParameters = await searchParams

	const category = searchParameters.category ?? ''
	const searchQuery = searchParameters.search ?? ''
	const showMode =
		!searchParameters.showMode || searchParameters.showMode !== 'list' ? 'grid' : 'list'
	const sortingMethodId = Number(searchParameters.sorting ?? 1)
	const page = Number(searchParameters.page) || 1
	const limit = Number(searchParameters.limit) || 10

	const { filteredProducts, totalPages } = filterProducts(products, {
		category,
		searchQuery,
		sortingMethodId,
		page,
		limit
	})

	return (
		<section className='min-h-[75vh]'>
			<Suspense>
				<Shop
					texts={texts}
					currentShowMode={showMode}
					searchQuery={searchQuery}
					allCategories={categories}
					allProducts={filteredProducts}
					totalPages={totalPages}
				/>
			</Suspense>
		</section>
	)
}

export default ShopPage
