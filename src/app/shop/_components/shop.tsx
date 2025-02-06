import { Category, Product, TextField } from '@prisma/client'
import { ShopSidebar } from './shop-sidebar'
import { ShopHeader } from './shop-header'
import { ShopProduct } from './shop-product'
import * as motion from 'framer-motion/client'
import cn from 'clsx'
import { ShopPagination } from './shop-pagination'
import { ShopSearchView } from './shop-search-view'

interface Props {
	allCategories: Category[] | undefined
	allProducts: Product[] | undefined
	texts: TextField[] | undefined
	totalPages: number
	searchQuery: string | null
	currentShowMode: 'grid' | 'list'
}

export function Shop({
	allCategories,
	allProducts,
	totalPages,
	searchQuery,
	currentShowMode,
	texts
}: Props) {
	const shopSectionTitle = texts?.find(text => text.slug === 'shop-section-title')?.text
	const nothingFound = texts?.find(text => text.slug === 'nothing-found')?.text

	return (
		<div className='container mx-auto max-sm:px-2 mt-10 pb-20 animate-opacity-1'>
			<h2 className='text-4xl font-medium mb-6'>{shopSectionTitle}</h2>
			<div className='grid grid-cols-[1fr_3fr] max-lg:grid-cols-[1fr_2fr] max-md:grid-cols-1 max-md:gap-5 w-full mt-8'>
				<ShopSidebar allCategories={allCategories} />
				<section className='w-full bg-white'>
					<div className='h-[60px] max-lg:h-[200px] max-md:h-[140px]'>
						<ShopHeader currentShowMode={currentShowMode} />
					</div>
					<main>
						<ShopSearchView searchQuery={searchQuery} />
						{allProducts && allProducts.length ? (
							<div
								className={cn('bg-white w-full p-5 gap-5 grid grid-cols-3 max-lg:grid-cols-2', {
									'min-[500px]:grid-cols-1': currentShowMode === 'list'
								})}
							>
								{allProducts.map((product, index) => (
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
											index={index}
											showMode={currentShowMode}
											product={product}
										/>
									</motion.article>
								))}
							</div>
						) : (
							<h2 className='ml-8 mt-5 text-xl'>{nothingFound}</h2>
						)}
						<ShopPagination totalPages={totalPages} />
					</main>
				</section>
			</div>
		</div>
	)
}
