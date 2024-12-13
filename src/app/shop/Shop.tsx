'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Select from 'react-select'
import { SORTING_METHODS } from './shop.data'
import { useShopStore } from './shop.store'
import dynamic from 'next/dynamic'
import { ChangeEvent } from 'react'
import { LayoutGridIcon, ListIcon } from 'lucide-react'
import cn from 'clsx'
import { Category } from '@prisma/client'
import Link from 'next/link'

interface Props {
	allCategories: Category[]
}

function ShopComponent({ allCategories }: Props) {
	const params = useSearchParams()
	const pathname = usePathname()
	const {
		currentSortingId,
		setCurrentSortingId,
		productsPerPage,
		setProductPerPage,
		currentShowMode,
		setCurrentShowMode
	} = useShopStore()

	const handleProductsPerPageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value: number = Number(e.target.value)

		if (value < 1) {
			setProductPerPage(1)
		} else if (value > 100) {
			setProductPerPage(100)
		} else {
			setProductPerPage(value)
		}
	}

	const currentCategories = params.get('categories') ?? ''

	return (
		<div className='container mx-auto max-sm:px-2 mt-12'>
			<h2 className='text-3xl max-lg:text-center'>Продукція MONOLED</h2>
			<div className='grid grid-cols-[1fr_3fr] max-lg:grid-cols-[1fr_2fr] max-sm:grid-cols-1 max-sm:gap-5 w-full mt-8'>
				<aside className='bg-white'>
					<header className='w-full py-4 uppercase font-light tracking-wide bg-[#f0f1f3] flex items-center justify-center text-center text-xl'>
						Категорії
					</header>
					<ul className='flex flex-col gap-5 py-5 px-6 border-t-[1px]'>
						<li
							className={cn({
								'text-[rgb(10,120,191)]':
									(!params.toString().includes('categories') ||
										!params.get('categories')?.length) &&
									pathname.includes('shop')
							})}
						>
							<Link href='/shop'>
								{(!params.toString().includes('categories') || !params.get('categories')?.length) &&
									pathname.includes('shop') &&
									'-'}{' '}
								Всі категорії
							</Link>
						</li>
						{allCategories.map(i => {
							const isCurrentSelected =
								params.toString().includes(i.slug) && pathname.includes('shop')
							return (
								<li
									key={i.slug}
									className={cn({
										'text-[rgb(10,120,191)]': isCurrentSelected
									})}
								>
									<Link href={`/shop?categories=${i.slug}`}>
										{isCurrentSelected && '-'} {i.name}
									</Link>
								</li>
							)
						})}
					</ul>
				</aside>
				<section className='w-full border-l-[1px]'>
					<div className='w-full py-4 uppercase font-light tracking-wide bg-[#f0f1f3] flex items-center justify-center text-center text-xl'>
						Товари
					</div>
					<header className='border-[1px] border-l-0 bg-white px-4 py-2 flex items-center gap-5 h-[60px] max-lg:flex-col max-lg:h-auto max-lg:py-5'>
						<Select
							options={SORTING_METHODS.map(i => ({ value: i.id, label: i.name }))}
							value={
								SORTING_METHODS.some(i => i.id === currentSortingId)
									? {
											value: currentSortingId,
											label: SORTING_METHODS.find(i => i.id === currentSortingId)?.name
										}
									: { value: 1, label: 'За популярністю' }
							}
							onChange={i => setCurrentSortingId(i?.value || 1)}
							className='w-[300px] max-[400px]:w-full'
							theme={theme => ({
								...theme,
								colors: {
									...theme.colors,
									primary25: '#e0e0e0',
									primary: '#cccccc',
									primary50: '#d3d3d3'
								}
							})}
						/>
						<div className='flex gap-2 h-full items-center'>
							Показати
							<input
								type='number'
								value={productsPerPage.toString()}
								onChange={handleProductsPerPageChange}
								min='1'
								max='100'
								placeholder='шт.'
								className='rounded-[4px] border-[1px] border-[rgb(204,204,204)] h-full px-2 max-lg:h-[40px]'
							/>
							шт.
						</div>
						<div className='ml-auto flex items-center gap-2 max-lg:mx-auto'>
							<button
								className={cn(
									'w-10 h-10 rounded-sm bg-[rgb(200,200,200)] flex items-center justify-center hover:bg-[rgb(100,100,100)] transition-colors duration-200',
									{ '!bg-[rgb(120,120,120)]': currentShowMode === 'list' }
								)}
								title='Список'
								onClick={() => setCurrentShowMode('list')}
							>
								<ListIcon
									color='rgb(255, 255, 255)'
									fill='rgb(255, 255, 255)'
								/>
							</button>
							<button
								className={cn(
									'w-10 h-10 rounded-sm bg-[rgb(200,200,200)] flex items-center justify-center hover:bg-[rgb(100,100,100)] transition-colors duration-200',
									{ '!bg-[rgb(120,120,120)]': currentShowMode === 'grid' }
								)}
								title='Сітка'
								onClick={() => setCurrentShowMode('grid')}
							>
								<LayoutGridIcon
									color='rgb(255, 255, 255)'
									fill='rgb(255, 255, 255)'
								/>
							</button>
						</div>
					</header>
					<main></main>
				</section>
			</div>
		</div>
	)
}

export const Shop = dynamic(() => Promise.resolve(ShopComponent), { ssr: false })
