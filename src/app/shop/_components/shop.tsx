'use client'

import { useSearchParams } from 'next/navigation'
import { useShopStore } from '../shop.store'
import { Category, Product } from '@prisma/client'
import { ShopSidebar } from './shop-sidebar'
import { ShopHeader } from './shop-header'
import { ShopProduct } from './shop-product'
import useDebounce from '@/hooks/useDebounce'
import { useFilterProducts } from '@/hooks/useFilterProducts'
import { motion } from 'framer-motion'

interface Props {
	allCategories: Category[] | undefined
	allProducts: Product[] | undefined
}

export function Shop({ allCategories, allProducts }: Props) {
	const params = useSearchParams()

	const currentCategory = params.get('category') ?? ''
	const { currentSortingId, productsPerPage } = useShopStore()

	const debouncedProductsPerPage = useDebounce(productsPerPage, 500)

	const filteredProducts = useFilterProducts(allProducts, {
		category: currentCategory,
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
					<div className='h-[60px]'>
						<ShopHeader />
					</div>
					<main>
						{filteredProducts ? (
							<div className='bg-white w-full border-r-[1px] border-b-[1px] grid grid-cols-4 p-5 gap-5'>
								{filteredProducts.map((product, index) => (
									<motion.article
										key={product.id}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{
											duration: 0.6,
											bounce: 0,
											ease: 'easeInOut',
											delay: (index ?? 1) * 0.2
										}}
									>
										<ShopProduct product={product} />
									</motion.article>
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
