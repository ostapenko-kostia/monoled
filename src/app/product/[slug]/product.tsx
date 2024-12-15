'use client'

import { type Product } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import cn from 'clsx'
import { DownloadIcon } from 'lucide-react'

interface Props {
	product: Product
}

export function Product({ product }: Props) {
	const [selectedImage, setSelectedImage] = useState<number>(0)
	const [currentInfoBlock, setCurrentInfoBlock] = useState<
		'description' | 'characteristics' | 'info'
	>('description')

	const stringifyWithoutQuotes = (value: any) => {
		if (typeof value === 'string') return value
		return JSON.stringify(value)
	}

	return (
		<>
			<div className='bg-[#f0f1f3] py-7'>
				<div className='container mx-auto max-sm:px-2 flex items-center gap-5 h-[40px]'>
					<Link href='/'>Головна</Link>
					<span className='font-semibold'>{' > '}</span>
					<Link href='/shop'>Каталог</Link>
					<span className='font-semibold'>{' > '}</span>
					<hr className='h-full w-[1px] bg-black' />
					{product.name}
				</div>
			</div>
			<div className='container mx-auto max-sm:px-2 my-10'>
				<h2 className='text-3xl'>{product.name}</h2>
				<div className='grid grid-cols-2 w-full gap-10 pt-5 justify-between'>
					<div className='flex items-start gap-6'>
						<div className='flex flex-col w-20 h-auto items-center gap-5'>
							{product.images.map((image, index) => {
								return (
									image.length && (
										<button
											onClick={() => setSelectedImage(index)}
											className='relative w-full aspect-square'
											key={index}
										>
											<Image
												fill
												sizes='100%, 100%'
												className={cn('object-cover rounded-md', {
													'border-2 border-solid border-black': selectedImage === index
												})}
												src={image}
												alt={product.name.toString() + index.toString()}
											/>
										</button>
									)
								)
							})}
						</div>
						<Image
							className='object-cover rounded-lg'
							src={product.images[selectedImage]}
							alt={product.name}
							width={450}
							height={450}
						/>
					</div>
					<div>
						<div>
							<div className='text-xl mb-2 w-full flex items-center'>
								<h3>Характеристики:</h3>{' '}
								<Link
									onClick={() => setCurrentInfoBlock('characteristics')}
									className='text-sm ml-auto text-blue-500'
									href='#info'
								>
									{'(дивитись всі)'}
								</Link>
							</div>
							{Object.entries(JSON.parse(JSON.stringify(product.info)))
								.slice(0, 5)
								.map(([key, value], index) => (
									<div
										className={cn('w-full py-2 px-6 flex items-center justify-between', {
											'bg-[#eee]': index % 2 === 0
										})}
										key={key}
									>
										<span>{key}:</span>{' '}
										<span className='text-neutral-500'>{stringifyWithoutQuotes(value)}</span>
									</div>
								))}
						</div>
						<div className='mt-10'>
							<div className='flex items-end gap-3'>
								<h3 className='text-xl'>Базова ціна:</h3>{' '}
								<span>
									від{" "}
									<span className='text-2xl font-semibold tracking-wide'>{product.price} грн </span>
								</span>
							</div>
							<div className='flex items-center gap-8 h-14 mt-8'>
								<button className='h-full bg-slate-600 text-white rounded-md'>
									<Link
										className='flex items-center px-6 h-full font-medium'
										href='/contact-us'
									>
										Як замовити?
									</Link>
								</button>
								<button className='h-full bg-blue-600 text-white rounded-md'>
									<Link
										className='flex items-center px-6 h-full font-medium gap-3'
										href='/contact-us'
									>
										<DownloadIcon />
										Завантажи модель (.3ds)
									</Link>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div
					id='info'
					className='pt-10'
				>
					<header className='flex items-center bg-white'>
						<button
							onClick={() => setCurrentInfoBlock('description')}
							className={cn('bg-neutral-100 h-full px-6 py-5', {
								'underline underline-offset-[6px] !bg-neutral-200':
									currentInfoBlock === 'description'
							})}
						>
							Опис
						</button>
						<button
							onClick={() => setCurrentInfoBlock('characteristics')}
							className={cn('bg-neutral-100 h-full px-6 py-5', {
								'underline underline-offset-[6px] !bg-neutral-200':
									currentInfoBlock === 'characteristics'
							})}
						>
							Характеристики
						</button>
						<button
							onClick={() => setCurrentInfoBlock('info')}
							className={cn('bg-neutral-100 h-full px-6 py-5', {
								'underline underline-offset-[6px] !bg-neutral-200': currentInfoBlock === 'info'
							})}
						>
							Інформація
						</button>
					</header>
					<main>
						{currentInfoBlock === 'characteristics' && (
							<div className='p-5 bg-white'>
								<h3 className='mb-5 text-xl'>Основні характеристики:</h3>
								{Object.entries(JSON.parse(JSON.stringify(product.info))).map(
									([key, value], index) => (
										<div
											className={cn('w-full py-2 px-6 flex items-center justify-between', {
												'bg-[#eee]': index % 2 === 0
											})}
											key={key}
										>
											<span>{key}:</span>{' '}
											<span className='text-neutral-500'>{stringifyWithoutQuotes(value)}</span>
										</div>
									)
								)}
							</div>
						)}
						{currentInfoBlock === 'description' && (
							<div className='p-5 bg-white'>
								<h3 className='mb-5 text-xl'>Опис:</h3>
								<p className='w-2/3 text-lg text-neutral-500 pl-5 font-light'>
									{product.description}
								</p>
							</div>
						)}
						{currentInfoBlock === 'info' && (
							<div className='p-5 bg-white'>
								<div className='font-light'>
									Ми доставляємо замовлення по всій Україні.
									<br />
									<br />
									Терміни доставки замовлення залежать від наявності товарів на складі. Якщо в
									момент оформлення замовлення всі обрані товари є в наявності, то ми доставимо
									замовлення протягом 1 - 2 тижнів, в залежності від віддаленості Вашого регіону.
									Якщо замовлений товар відсутній на складі, то максимальний термін доставки
									замовлення може скласти 8 тижнів. Але ми намагаємося доставляти замовлення
									клієнтам якомога швидше, і 90% замовлень клієнтів відправляються протягом перших 3
									тижнів. У разі, якщо частина товарів з Вашого замовлення через 3 тижні не надійшла
									на склад, ми відправимо всі наявні товари, а потім за наш рахунок дійшли Вам решту
									замовлення.
									<br />
									<br /> <span className='font-medium'>Способи оплати:</span>
									<br />
									<br />
									<ul className='list-disc list-inside'>
										<li>Оплата при отриманні</li>
										<li>Оплата в терміналі</li>
										<li>Безготівковій розрахунок</li>
									</ul>
									<br />
									Інтернет-магазин - сайт має адресу в мережі Інтернет. Товар - продукція,
									представлена ​​до продажу в інтернет-магазині.
									<br />
									<br /> Клієнт - розмістила Замовлення фізична або юридична особа. Замовлення -
									оформлений належним чином запит Клієнта на купівлю Товару. <br />
									<br />
									Транспортна компанія - третя особа, що надає послуги з доставки Товарів Клієнта
								</div>
							</div>
						)}
					</main>
				</div>
			</div>
		</>
	)
}
