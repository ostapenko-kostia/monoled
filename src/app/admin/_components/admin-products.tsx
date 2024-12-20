'use client'

import { ShopProduct } from '@/app/shop/_components/shop-product'
import type { Product } from '@prisma/client'

interface Props {
	products: Product[] | undefined
}

export function AdminProducts({ products }: Props) {
	return (
		<div className='w-full p-4'>
      <h2 className='mb-6 text-2xl font-semibold'>Товари</h2>
			<div className='grid grid-cols-4 w-full gap-10'>
				{products?.map(product => (
					<ShopProduct
						key={product.id}
            showMode='grid'
						product={product}
					/>
				))}
			</div>
		</div>
	)
}
