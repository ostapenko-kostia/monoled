import { Product } from '@prisma/client'
import Image from 'next/image'
import cn from 'clsx'
import Link from 'next/link'

interface Props {
	product: Product
	showMode: 'grid' | 'list'
}

export function ShopProduct({ product, showMode }: Props) {
	return (
		<Link
			href={`/product/${product.slug}`}
			className={cn('flex w-full flex-col group cursor-pointer', {
				'min-[500px]:gap-10 min-[500px]:flex-row': showMode === 'list'
			})}
		>
			<div
				className={cn('relative z-0 w-full aspect-square', {
					'min-[500px]:h-[200px] 2xl:h-[250px] min-[500px]:w-auto': showMode === 'list'
				})}
			>
				{product.isNew && (
					<div className='absolute top-0 right-3 bg-blue-500 text-white z-[11] rounded-b-md px-4 py-2'>Новинка</div>
				)}
				<Image
					src={product.images[0] && product.images[0].length ? product.images[0] : "/placeholder-image.jpg"}
					alt={product.name}
					fill
					loading='lazy'
					sizes='100%, 100%'
					className={cn('object-cover rounded-lg', {
						'group-hover:opacity-0 transition-opacity duration-[400ms] absolute z-10':
							product.images[1]
					})}
				/>
				{product.images[1] && (
					<Image
						src={product.images[1]}
						alt={product.name}
						fill
						loading='lazy'
						sizes='100%, 100%'
						className='object-cover rounded-lg absolute top-0 left-0 w-full h-full'
					/>
				)}
			</div>
			<div>
				<p className='mt-5 text-lg group-hover:underline underline-offset-4 transition-colors duration-200 max-[500px]:text-base'>
					{product.name}
				</p>
				<p className='line-clamp-6 text-sm text-neutral-500 my-3 max-[500px]:text-xs'>
					{product.description}
				</p>
			</div>
		</Link>
	)
}
