import { ProductWithItems } from '@/typing/interfaces'
import cn from 'clsx'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
	product: ProductWithItems
	index: number
	showMode: 'grid' | 'list'
}

export const ShopProduct = dynamic(() =>
	Promise.resolve(({ product, showMode, index }: Props) => {
		// Get the default product item (first one) to display
		const defaultItem = product.items && product.items.length > 0 ? product.items[0] : null

		return (
			<Link
				href={`/product/${product.slug}`}
				className={cn('flex w-full flex-col group cursor-pointer', {
					'min-[500px]:gap-10 min-[500px]:flex-row': showMode === 'list'
				})}
			>
				<div
					className={cn('z-0 relative w-full aspect-square', {
						'min-[500px]:h-[200px] 2xl:h-[250px] min-[500px]:w-auto': showMode === 'list'
					})}
				>
					{product.isNew && (
						<div className='absolute top-0 right-3 bg-blue-500 text-white z-[11] rounded-b-md px-4 py-2'>
							Новинка
						</div>
					)}
					<Image
						src={
							defaultItem?.images[0] && defaultItem.images[0].length
								? defaultItem.images[0]
								: '/placeholder-image.jpg'
						}
						alt={product.name}
						width={360}
						height={360}
						priority={index <= 6}
						loading={index <= 6 ? 'eager' : 'lazy'}
						className={cn('object-cover rounded-lg h-full w-full', {
							'group-hover:opacity-0 transition-opacity duration-[400ms] absolute z-10':
								defaultItem?.images[1]
						})}
					/>
					{defaultItem?.images[1] && (
						<Image
							src={defaultItem.images[1]}
							alt={product.name}
							width={360}
							height={360}
							loading='lazy'
							className='object-cover h-full w-full rounded-lg absolute top-0 left-0'
						/>
					)}
				</div>
				<div>
					<p className='mt-5 text-lg group-hover:underline underline-offset-4 transition-colors duration-200 max-[500px]:text-base'>
						{product.name}
					</p>
					<div
						className='line-clamp-6 text-sm text-neutral-500 my-3 max-[500px]:text-xs'
						dangerouslySetInnerHTML={{ __html: product.description }}
					/>
					{defaultItem && <p className='font-semibold text-lg'>{defaultItem.price} грн.</p>}
				</div>
			</Link>
		)
	})
)
