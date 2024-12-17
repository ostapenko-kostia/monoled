import type { Metadata } from 'next'
import { Product } from './_components/product'
import { type Product as TProduct } from '@prisma/client'
import { productsService } from '@/services/products.service'
import { notFound } from 'next/navigation'
import { RecommendedProducts } from './_components/recommended-products'
import { ContactUsForm } from '@/components/layout/contact-us-form'

export const metadata: Metadata = {
	title: 'Monoled - Товар'
}

export const revalidate = 180

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params

	const products: TProduct[] | undefined = (await productsService.getAllProducts())?.data
	const product = products?.find(product => product.slug === slug)

	if (!product || !slug) notFound()

	return (
		<>
			<Product product={product} />
			<RecommendedProducts
				products={products}
				slug={slug}
			/>
			<div className='py-6 bg-neutral-200'>
				<ContactUsForm />
			</div>
		</>
	)
}
