import { Product } from '@prisma/client'
import Image from 'next/image'

interface Props {
	product: Product
}

export function ShopProduct({ product }: Props) {
	return (
		<article className='flex flex-col w-full group cursor-pointer'>
			<div className='relative w-full aspect-square'>
				<Image
					src={product.images[0]}
					alt={product.name}
					fill
					sizes='100%, 100%'
					className='object-cover'
				/>
			</div>
			<p className='mt-5 text-lg group-hover:underline group-hover:text-blue-500 underline-offset-4 transition-colors duration-200'>
				{product.name}
			</p>
			<p className='line-clamp-6 text-sm text-neutral-500 mt-3'>{product.description}</p>
		</article>
	)
}
