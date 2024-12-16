import type { Metadata } from 'next'
import { Product } from './_components/product'
import { type Product as TProduct } from '@prisma/client'
import { productsService } from '@/services/products.service'
import { notFound } from 'next/navigation'
import { ShopProduct } from '@/app/shop/_components/shop-product'
import { RecommendedProducts } from './_components/recommended-products'

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
			<RecommendedProducts products={products} slug={slug} />
		</>
	)
}
