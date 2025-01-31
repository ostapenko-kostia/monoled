import type { Metadata } from 'next'
import { Product } from './_components/product'
import { productsService } from '@/services/products.service'
import { notFound } from 'next/navigation'
import { RecommendedProducts } from './_components/recommended-products'
import { ContactUsForm } from '@/components/layout/contact-us-form/contact-us-form'
import { textsService } from '@/services/texts.service'
import { ProductWithInfo } from '@/typing/interfaces'

export const metadata: Metadata = {
	title: 'Monoled - Товар'
}

export const revalidate = 180

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params

	const products: ProductWithInfo[] | undefined = (
		await productsService.getAllProducts()
	)?.data
	const product = products?.find(product => product.slug === slug)

	if (!product || !slug) notFound()

	const texts = await textsService.getAllTexts()
	const interestedInProductText = texts?.find(text => text.slug === 'interested-in-product')?.text

	return (
		<>
			<Product product={product} />
			<RecommendedProducts
				products={products}
				slug={slug}
			/>
			<div className='py-6 bg-neutral-100 animate-opacity-1'>
				<p className='text-4xl font-semibold text-center mb-4 w-full tracking-[0.015rem]'>
					{interestedInProductText}
				</p>
				<ContactUsForm />
			</div>
		</>
	)
}
