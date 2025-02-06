import { ProductSlider } from './product-slider'
import { ProductMainInfo } from './product-main-info'
import { ProductInfo } from './product-info'
import { ProductWithInfo } from '@/typing/interfaces'
import { TextField } from '@prisma/client'

interface Props {
	product: ProductWithInfo
	texts: TextField[] | undefined
}

export function Product({ product, texts }: Props) {
	return (
		<>
			<div className='container mx-auto max-sm:px-2 my-10 animate-opacity-1'>
				<h2 className='text-3xl text-center mb-5 max-sm:text-2xl'>{product.name}</h2>
				<div className='grid grid-cols-2 w-full pt-5 gap-10 justify-between max-lg:grid-cols-1'>
					<ProductSlider images={product.images} />
					<ProductMainInfo
						texts={texts}
						product={product}
					/>
				</div>
				<ProductInfo product={product} />
			</div>
		</>
	)
}
