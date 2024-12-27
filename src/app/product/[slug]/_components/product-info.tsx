'use client'

import { useTexts } from '@/context/textContext'
import { Product } from '@prisma/client'
import cn from 'clsx'
import { useState } from 'react'

interface Props {
	product: Product
}

export function ProductInfo({ product }: Props) {
	const [currentInfoBlock, setCurrentInfoBlock] = useState<'description' | 'info'>('description')
	const texts = useTexts()

	const descriptionTitle = texts?.find(text => text.slug === 'description-title')?.text
	const infoTitle = texts?.find(text => text.slug === 'info-title')?.text
	const mainInfoText = texts?.find(text => text.slug === 'main-info')?.text

	return (
		<div
			id='info'
			className='pt-10'
		>
			<header className='flex items-center bg-white max-lg:justify-center max-[430px]:flex-col max-[430px]:w-full'>
				<button
					onClick={() => setCurrentInfoBlock('description')}
					className={cn('bg-neutral-100 h-full px-6 py-5 max-[430px]:w-full', {
						'underline underline-offset-[6px] !bg-neutral-200': currentInfoBlock === 'description'
					})}
				>
					{descriptionTitle}
				</button>
				<button
					onClick={() => setCurrentInfoBlock('info')}
					className={cn('bg-neutral-100 h-full px-6 py-5 max-[430px]:w-full', {
						'underline underline-offset-[6px] !bg-neutral-200': currentInfoBlock === 'info'
					})}
				>
					{infoTitle}
				</button>
			</header>
			<main>
				{currentInfoBlock === 'description' && (
					<div className='p-5 bg-white'>
						<h3 className='mb-5 text-xl'>{descriptionTitle}:</h3>
						<p className='w-2/3 max-xl:w-3/4 max-lg:w-full text-lg text-neutral-500 pl-5 font-light'>
							{product.description}
						</p>
					</div>
				)}
				{currentInfoBlock === 'info' && (
					<div className='p-5 bg-white'>
						<div className='font-light text-xl'>{mainInfoText}</div>
					</div>
				)}
			</main>
		</div>
	)
}
