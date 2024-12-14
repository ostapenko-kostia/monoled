'use client'

import { useSearchParams } from 'next/navigation'
import { useShopStore } from '../shop.store'
import { Category, Product } from '@prisma/client'
import { ShopSidebar } from './shop-sidebar'
import { ShopHeader } from './shop-header'
import { ShopProduct } from './shop-product'
import useDebounce from '@/hooks/useDebounce'
import { useFilterProducts } from '@/hooks/useFilterProducts'

interface Props {
	allCategories: Category[] | undefined
	allProducts: Product[] | undefined
}

export function Shop({ allCategories, allProducts }: Props) {
	const params = useSearchParams()

	const currentCategories = params.get('categories') ?? ''
	const { currentSortingId, productsPerPage } = useShopStore()

	const debouncedProductsPerPage = useDebounce(productsPerPage, 500)

	const filteredProducts = useFilterProducts(allProducts, {
		category: currentCategories,
		sortingMethodId: currentSortingId
	})

	return (
		<div className='container mx-auto max-sm:px-2 mt-12 pb-20'>
			<h2 className='text-3xl max-lg:text-center'>Продукція MONOLED</h2>
			<div className='grid grid-cols-[1fr_3fr] max-lg:grid-cols-[1fr_2fr] max-sm:grid-cols-1 max-sm:gap-5 w-full mt-8'>
				<ShopSidebar allCategories={allCategories} />
				<section className='w-full border-l-[1px]'>
					<div className='w-full py-4 uppercase font-light tracking-wide bg-[#f0f1f3] flex items-center justify-center text-center text-xl'>
						Товари
					</div>
					<ShopHeader />
					<main>
						{filteredProducts ? (
							<div className='bg-white w-full border-r-[1px] border-b-[1px] grid grid-cols-4 p-5 gap-5'>
								{filteredProducts.map(product => (
									<ShopProduct
										product={product}
										key={product.id}
									/>
								))}
							</div>
						) : (
							<h2 className='ml-8 mt-5 text-xl'>Нічого не знайдено{'('}</h2>
						)}
					</main>
				</section>
			</div>
		</div>
	)
}
