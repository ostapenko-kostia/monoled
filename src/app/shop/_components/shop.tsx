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
import { ShopPagination } from './shop-pagination'
import { useTexts } from '@/context/textContext'

interface Props {
	allCategories: Category[] | undefined
	allProducts: Product[] | undefined
}

export function Shop({ allCategories, allProducts }: Props) {
	const params = useSearchParams()
	const texts = useTexts()

	const currentCategory = params.get('category') ?? ''
	const searchQuery = params.get('search') ?? ''
	const { currentSortingId, productsPerPage, currentShowMode, currentPage } = useShopStore()

	const filteredProducts = useFilterProducts(allProducts, {
		category: currentCategory,
		searchQuery,
		sortingMethodId: currentSortingId
	})

	const debouncedProductsPerPage = useDebounce(productsPerPage > 0 ? productsPerPage : 1, 500)

	const slicedFilteredProducts = filteredProducts?.slice(
		(currentPage - 1) * debouncedProductsPerPage,
		currentPage * debouncedProductsPerPage
	)

	const shopSectionTitle = texts?.find(text => text.slug === 'shop-section-title')?.text
	const nothingFound = texts?.find(text => text.slug === 'nothing-found')?.text

	return (
		<div className='container mx-auto max-sm:px-2 mt-12 pb-20 animate-opacity-1'>
			<h2 className='text-3xl max-lg:text-center'>{shopSectionTitle}</h2>
			<div className='grid grid-cols-[1fr_3fr] max-lg:grid-cols-[1fr_2fr] max-md:grid-cols-1 max-md:gap-5 w-full mt-8'>
				<ShopSidebar allCategories={allCategories} />
				<section className='w-full bg-white'>
					<div className='h-[60px] max-lg:h-[200px] max-md:h-[140px]'>
						<ShopHeader />
					</div>
					<main>
						{slicedFilteredProducts && slicedFilteredProducts.length ? (
							<div
								className={cn('bg-white w-full p-5 gap-5 grid grid-cols-3 max-lg:grid-cols-2', {
									'min-[500px]:grid-cols-1': currentShowMode === 'list'
								})}
							>
								{slicedFilteredProducts.map((product, index) => (
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
							<h2 className='ml-8 mt-5 text-xl'>{nothingFound}</h2>
						)}
						<ShopPagination filteredProducts={filteredProducts} />
					</main>
				</section>
			</div>
		</div>
	)
}
