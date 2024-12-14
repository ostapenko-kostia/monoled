import { Product } from '@prisma/client'
import Image from 'next/image'
import cn from 'clsx'

interface Props {
	product: Product
	showMode: 'grid' | 'list'
}

export function ShopProduct({ product, showMode }: Props) {
	return (
		<div
			className={cn('flex w-full flex-col group cursor-pointer', {
				'min-[500px]:gap-10 min-[500px]:flex-row': showMode === 'list'
			})}
		>
			<div
				className={cn('relative w-full aspect-square', {
					'min-[500px]:h-[200px] 2xl:h-[250px] min-[500px]:w-auto': showMode === 'list'
				})}
			>
				<Image
					src={product.images[0]}
					alt={product.name}
					fill
					sizes='100%, 100%'
					className='object-cover rounded-lg'
				/>
			</div>
			<div>
				<p className='mt-5 text-lg group-hover:underline group-hover:text-blue-500 underline-offset-4 transition-colors duration-200 max-[500px]:text-base'>
					{product.name}
				</p>
				<p className='line-clamp-6 text-sm text-neutral-500 my-3 max-[500px]:text-xs'>
					{product.description}
				</p>
			</div>
		</div>
	)
}
