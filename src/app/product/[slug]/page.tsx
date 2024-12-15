import type { Metadata } from 'next'
import { Product } from './product'
import { type Product as TProduct } from '@prisma/client'
import { productsService } from '@/services/products.service'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
	title: 'Monoled - Товар'
}

export const revalidate = 180

export default async function ProductPage({ params }: { params: { slug: string } }) {
	const { slug } = params

	const products: TProduct[] | undefined = (await productsService.getAllProducts())?.data
	const product = products?.find(product => product.slug === slug)

	if (!product || !slug) notFound()

	return <Product product={product} />
}
