import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { Shop } from './Shop'
import { Category, Product } from '@prisma/client'
import { categoriesService } from '../services/categories.service'
import { productsService } from '../services/products.service'

export const metadata: Metadata = {
	title: 'Monoled - Каталог товарів'
}

export const revalidate = 180

const ShopPage: React.FC = async () => {
	const categories: Category[] | undefined = (await categoriesService.getAllCategories())?.data
	const products: Product[] | undefined = (await productsService.getAllProducts())?.data

	return (
		<section>
			<header className='flex items-center justify-center py-36 w-full gap-2 flex-col relative text-white'>
				<div
					className='absolute top-0 left-0 inset-0 w-full h-full -z-50 brightness-[.30]'
					style={{
						backgroundImage: "url('/uploads/1.avif')",
						backgroundAttachment: 'fixed',
						backgroundPosition: 'center 70%',
						backgroundRepeat: 'no-repeat',
						backgroundSize: 'cover',
						minHeight: '100%'
					}}
				/>

				<h2 className='font-medium text-5xl max-[450px]:text-4xl'>Каталог товарів</h2>
				<p className='text-lg font-semibold max-[450px]:text-base'>
					<Link
						className='underline-offset-[6px] hover:underline'
						href='/'
					>
						Домівка
					</Link>
					{' > '}
					<span className='font-normal'>Каталог</span>
				</p>
			</header>
			<Suspense>
				<Shop allCategories={categories} allProducts={products} />
			</Suspense>
		</section>
	)
}

export default ShopPage
