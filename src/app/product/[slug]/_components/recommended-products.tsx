import { ShopProduct } from '@/app/shop/_components/shop-product'
import { textsService } from '@/services/texts.service'
import { ProductWithItems } from '@/typing/interfaces'

interface Props {
	products: ProductWithItems[] | undefined
	slug: string
}

export async function RecommendedProducts({ products, slug }: Props) {
	const texts = await textsService.getAllTexts()
	const recommendedProductsText = texts?.find(text => text.slug === 'recommended-products')?.text

	// Filter current product and products without items
	const recommendedProducts = products
		?.filter(product => product.slug !== slug && product.items.length > 0)
		?.slice(0, 3)

	if (!recommendedProducts || recommendedProducts.length === 0) return null

	return (
		<div className='container mx-auto max-sm:px-2 pb-20 animate-opacity-1'>
			<h3 className='text-2xl font-medium mb-10'>{recommendedProductsText}</h3>
			<div className='grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 w-full gap-5'>
				{recommendedProducts.map((product, index) => (
					<div key={product.id}>
						<ShopProduct
							index={index}
							showMode='grid'
							product={product}
						/>
					</div>
				))}
			</div>
		</div>
	)
}
