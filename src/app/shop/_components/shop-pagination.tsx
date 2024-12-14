'use client'

import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react'
import { useShopStore } from '../shop.store'
import cn from 'clsx'
import { useEffect } from 'react'
import useDebounce from '@/hooks/useDebounce'
import { Product } from '@prisma/client'

interface Props {
	filteredProducts: Product[] | undefined
}

export function ShopPagination({ filteredProducts }: Props) {
	const { currentPage, setCurrentPage, totalPages, setTotalPages, productsPerPage } = useShopStore()

	const debouncedProductsPerPage = useDebounce(productsPerPage > 0 ? productsPerPage : 1, 500)

	useEffect(() => {
		setTotalPages(
			filteredProducts?.length ? Math.ceil(filteredProducts.length / debouncedProductsPerPage) : 1
		)
		setCurrentPage(1)
	}, [debouncedProductsPerPage])

	return (
		<ul className='flex items-center gap-2 justify-center my-12'>
			<li>
				<button
					className='bg-neutral-200 p-2 aspect-square rounded-md'
					disabled={currentPage === 1}
					onClick={() => setCurrentPage(currentPage - 1)}
				>
					<ArrowLeftIcon />
				</button>
			</li>
			<li className='overflow-x-scroll no-scrollbar flex items-center gap-2'>
				{Array.from({ length: totalPages })
					.slice(Math.max(0, currentPage - 6), Math.min(totalPages, currentPage + 4))
					.map((_, index) => {
						const pageNumber = Math.max(1, currentPage - 5) + index
						return (
							<div
								key={pageNumber}
								className='w-10 h-10 aspect-square'
							>
								<button
									className={cn('bg-neutral-200 p-2 aspect-square w-full h-full rounded-md', {
										'!bg-neutral-400': currentPage === pageNumber
									})}
									onClick={() => setCurrentPage(pageNumber)}
								>
									{pageNumber}
								</button>
							</div>
						)
					})}
			</li>
			<li>
				<button
					className='bg-neutral-200 p-2 aspect-square rounded-md'
					disabled={currentPage === totalPages}
					onClick={() => setCurrentPage(currentPage + 1)}
				>
					<ArrowRightIcon />
				</button>
			</li>
		</ul>
	)
}
