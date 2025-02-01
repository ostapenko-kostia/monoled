'use client'

import { DownloadIcon } from 'lucide-react'
import Link from 'next/link'
import { stringifyWithoutQuotes } from '@/utils/stringifyWithoutQuotes'
import { useTexts } from '@/context/textContext'
import clsx from 'clsx'
import { ProductWithInfo } from '@/typing/interfaces'

interface Props {
	product: ProductWithInfo
}

export function ProductMainInfo({ product }: Props) {
	const texts = useTexts()

	const productCharacteristicsTitle = texts?.find(
		text => text.slug === 'product-characteristics-title'
	)?.text
	const productCharacteristicsEmpty = texts?.find(
		text => text.slug === 'product-characteristics-empty'
	)?.text
	const basePriceText = texts?.find(text => text.slug === 'base-price')?.text
	const howToOrder = texts?.find(text => text.slug === 'how-to-order')?.text
	const downloadModel = texts?.find(text => text.slug === 'download-product-model')?.text
	const productInStock = texts?.find(text => text.slug === 'product-in-stock')?.text
	const productOutOfStock = texts?.find(text => text.slug === 'product-out-of-stock')?.text

	return (
		<div className='mx-auto w-full animate-opacity-1'>
			<div>
				<div className='text-3xl mb-6 w-full flex items-center'>
					<h3>{productCharacteristicsTitle}</h3>{' '}
				</div>
				<div className='grid-cols-2 grid gap-x-8 gap-y-3 max-sm:grid-cols-1'>
					{product.info.length ? (
						product.info
							.sort((a, b) => a.order - b.order)
							.map((field, index) => (
								<div
									className='w-full py-2 flex flex-col items-start gap-2 border-b-[1px] border-black'
									key={index}
								>
									<span className='text-neutral-500'>{field.title}:</span>{' '}
									<span className='text-lg'>{stringifyWithoutQuotes(field.value)}</span>
								</div>
							))
					) : (
						<>{productCharacteristicsEmpty}</>
					)}
				</div>
			</div>
			<div className='mt-10 w-full flex flex-col gap-1'>
				<div
					className={clsx("max-lg:text-center max-lg:w-full text-lg", {
						'text-green-700': product.quantityLeft > 0,
						'text-red-700': product.quantityLeft <= 0
					})}
				>
					{product.quantityLeft > 0
						? `${productInStock} ${product.quantityLeft} шт.`
						: `${productOutOfStock}`}
				</div>
				<div className='flex items-end gap-3 max-lg:justify-center max-[500px]:flex-col max-[500px]:items-center'>
					<h3 className='text-2xl'>{basePriceText}:</h3>
					<span className='inline-flex items-end gap-2'>
						<span className='text-2xl font-semibold tracking-wide'>{product.price} грн </span>
					</span>
				</div>
				<div className='flex items-center gap-8 h-14 mt-8 max-xl:flex-col max-xl:h-auto max-lg:flex-row max-lg:justify-center max-[500px]:flex-col'>
					<button className='h-full max-sm:w-full max-sm:items-center max-sm:flex max-sm:justify-center max-xl:h-16 border-[1px] border-foreground bg-background text-foreground rounded-md hover:text-background hover:bg-foreground transition-colors duration-300'>
						<Link
							className='flex items-center px-6 h-full'
							href='/contact-us'
						>
							{howToOrder}
						</Link>
					</button>
					<button className='h-full max-sm:w-full max-sm:items-center max-sm:flex max-sm:justify-center max-xl:h-16 border-[1px] border-foreground bg-background text-foreground rounded-md hover:text-background hover:bg-foreground transition-colors duration-300'>
						<a
							className='flex items-center px-6 h-full gap-3'
							href={product.modelUrl ?? '#'}
							download
						>
							<DownloadIcon />
							{downloadModel}
						</a>
					</button>
				</div>
			</div>
		</div>
	)
}
