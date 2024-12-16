'use client'

import { type Product } from '@prisma/client'
import 'swiper/css'
import 'swiper/css/pagination'
import { ProductBreadcrumbs } from './product-breadcrumbs'
import { ProductSlider } from './product-slider'
import { ProductMainInfo } from './product-main-info'
import { ProductInfo } from './product-info'
import { useState } from 'react'

interface Props {
	product: Product
}

export function Product({ product }: Props) {
	const [currentInfoBlock, setCurrentInfoBlock] = useState<
		'description' | 'characteristics' | 'info'
	>('description')

	return (
		<>
			<ProductBreadcrumbs product={product} />
			<div className='container mx-auto max-sm:px-2 my-10'>
				<h2 className='text-3xl text-center mb-5 max-sm:text-2xl'>{product.name}</h2>
				<div className='grid grid-cols-2 w-full pt-5 justify-between max-lg:grid-cols-1'>
					<ProductSlider images={product.images} />
					<ProductMainInfo
						setCurrentInfoBlock={setCurrentInfoBlock}
						product={product}
					/>
				</div>
				<ProductInfo
					currentInfoBlock={currentInfoBlock}
					setCurrentInfoBlock={setCurrentInfoBlock}
					product={product}
				/>
			</div>
		</>
	)
}
