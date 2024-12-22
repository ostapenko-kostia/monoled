'use client'

import { ShopProduct } from '@/app/shop/_components/shop-product'
import type { Category, Product } from '@prisma/client'
import { EditIcon, PlusCircleIcon, Trash2Icon } from 'lucide-react'
import { AdminProductInfo } from './admin-product-info'
import { AdminProductDelete } from './admin-product-delete'
import { AdminProductCreate } from './admin-product-create'
import { AdminProductEdit } from './admin-product-edit'

interface Props {
	products: Product[] | undefined
	categories: Category[] | undefined
}

export function AdminProductsTab({ products, categories }: Props) {
	return (
		<div className='w-full p-4'>
			<h2 className='mb-6 text-2xl font-semibold'>Товари</h2>
			<div className='grid grid-cols-4 w-full gap-10 max-xl:grid-cols-3 max-md:grid-cols-2 max-[480px]:grid-cols-1'>
				{products?.map(product => {
					const categoryName =
						categories?.find(category => category.slug === product.categorySlug)?.name ??
						'Без категорії'
					return (
						<div
							className='relative'
							key={product.id}
						>
							<div className='absolute z-10 bg-white flex items-center gap-3 justify-center p-2 right-2 rounded-b-md'>
								<AdminProductInfo
									product={product}
									categoryName={categoryName}
								/>
								<AdminProductEdit
									product={product}
									categories={categories}
								/>
								<AdminProductDelete
									productId={product.id}
									productName={product.name}
								/>
							</div>
							<ShopProduct
								showMode='grid'
								product={product}
							/>
							{categoryName}
						</div>
					)
				})}
				<AdminProductCreate categories={categories} />
			</div>
		</div>
	)
}
