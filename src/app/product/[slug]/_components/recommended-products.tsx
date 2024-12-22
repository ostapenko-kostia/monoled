import { ShopProduct } from '@/app/shop/_components/shop-product'
import { Product } from '@prisma/client'

interface Props {
	products: Product[] | undefined
	slug: string
}

export function RecommendedProducts({ products, slug }: Props) {
	return (
		<div className='container mx-auto max-sm:px-2 mb-10'>
			<h3 className='text-3xl max-[500px]:text-center max-[500px]:text-2xl'>
				Рекомендовані товари
			</h3>
			<div className='grid grid-cols-5 mt-8 max-lg:grid-cols-3 max-sm:grid-cols-2 gap-8'>
				{products
					?.filter(product => product.slug !== slug)
					?.slice(0, 5)
					.map(product => (
						<ShopProduct
							key={product.id}
							product={product}
							showMode='grid'
						/>
					))}
			</div>
		</div>
	)
}
