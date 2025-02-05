import { Metadata } from 'next'
import { Suspense } from 'react'
import { Shop } from './_components/shop'
import { Category, Product } from '@prisma/client'
import { categoriesService } from '@/services/categories.service'
import { productsService } from '@/services/products.service'

export const metadata: Metadata = {
	title: 'Lumineka - Каталог товарів'
}

export const revalidate = 180

const ShopPage: React.FC = async () => {
	const categories: Category[] | undefined = (await categoriesService.getAllCategories())?.data
	const products: Product[] | undefined = (await productsService.getAllProducts())?.data

	return (
		<section className='min-h-[75vh]'>
			<Suspense>
				<Shop
					allCategories={categories}
					allProducts={products}
				/>
			</Suspense>
		</section>
	)
}

export default ShopPage
