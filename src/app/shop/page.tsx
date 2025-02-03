import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { Shop } from './_components/shop'
import { Category, Product } from '@prisma/client'
import { categoriesService } from '@/services/categories.service'
import { productsService } from '@/services/products.service'
import { textsService } from '@/services/texts.service'
import Image from 'next/image'

export const metadata: Metadata = {
	title: 'Lumineka - Каталог товарів'
}

export const revalidate = 180

const ShopPage: React.FC = async () => {
	const categories: Category[] | undefined = (await categoriesService.getAllCategories())?.data
	const products: Product[] | undefined = (await productsService.getAllProducts())?.data
	const texts = await textsService.getAllTexts()

	const shopFullTitle = texts?.find(text => text.slug === 'shop-full-title')?.text
	const shopShortTitle = texts?.find(text => text.slug === 'shop-short-title')?.text
	const homeTitle = texts?.find(text => text.slug === 'home-title')?.text

	return (
		<section>
			<header className='flex items-center justify-center py-36 w-full gap-2 flex-col relative text-white animate-opacity-1'>
				<div className='absolute top-0 left-0 inset-0 w-full'>
					<div className='relative top-0 left-0 inset-0 w-full h-full -z-50'>
						<Image
							src='/1.avif'
							alt='bg'
							fill
							priority
							sizes='100%, 100%'
							className='object-cover object-[50%_70%] min-h-full brightness-[.30] z-0'
						/>
					</div>
				</div>

				<h2 className='font-medium text-5xl max-[450px]:text-4xl'>{shopFullTitle}</h2>
				<p className='text-lg font-semibold max-[450px]:text-base'>
					<Link
						className='underline-offset-[6px] hover:underline'
						href='/'
					>
						{homeTitle}
					</Link>
					{' > '}
					<span className='font-normal'>{shopShortTitle}</span>
				</p>
			</header>
			<Suspense>
				<Shop
					allCategories={categories}
					allProducts={products}
				/>
			</Suspense>
		</section>
	)
}

export default ShopPage
