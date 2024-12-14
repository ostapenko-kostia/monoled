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
import cn from 'clsx'

interface Props {
	allCategories: Category[] | undefined
	allProducts: Product[] | undefined
}

export function Shop({ allCategories, allProducts }: Props) {
	const params = useSearchParams()

	const currentCategory = params.get('category') ?? ''
	const { currentSortingId, productsPerPage, currentShowMode } = useShopStore()

	const debouncedProductsPerPage = useDebounce(productsPerPage, 500)

	const filteredProducts = useFilterProducts(allProducts, {
		category: currentCategory,
		sortingMethodId: currentSortingId
	})

	return (
		<div className='container mx-auto max-sm:px-2 mt-12 pb-20'>
			<h2 className='text-3xl max-lg:text-center'>Продукція MONOLED</h2>
			<div className='grid grid-cols-[1fr_3fr] max-lg:grid-cols-[1fr_2fr] max-md:grid-cols-1 max-md:gap-5 w-full mt-8'>
				<ShopSidebar allCategories={allCategories} />
				<section className='w-full border-l-[1px]'>
					<div className='w-full py-4 uppercase font-light tracking-wide bg-[#f0f1f3] flex items-center justify-center text-center text-xl'>
						Товари
					</div>
					<div className='h-[60px] max-lg:h-[200px] max-md:h-[140px]'>
						<ShopHeader />
					</div>
					<main>
						{filteredProducts ? (
							<div
								className={cn(
									'bg-white w-full border-r-[1px] border-b-[1px] p-5 gap-5 grid grid-cols-3 max-lg:grid-cols-2',
									{ 'min-[500px]:grid-cols-1': currentShowMode === 'list' }
								)}
							>
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
										<ShopProduct
											showMode={currentShowMode}
											product={product}
										/>
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
