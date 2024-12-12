'use client'

import { useSearchParams } from 'next/navigation'
import Select from 'react-select'
import { SORTING_METHODS } from './shop.data'
import { useShopStore } from './shop.store'
import dynamic from 'next/dynamic'
import { ChangeEvent } from 'react'
import { LayoutGridIcon, ListIcon } from 'lucide-react'
import cn from 'clsx'

function Shop() {
	const params = useSearchParams()
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

	const categories = params.get('categories') ?? ''

	return (
		<div className='container mx-auto max-sm:px-2 mt-12'>
			<h2 className='text-3xl'>Продукція MONOLED</h2>
			<div className='grid grid-cols-[1fr_4fr] w-full mt-8'>
				<aside>
					<header className='w-full py-4 uppercase font-light tracking-wide bg-[#f0f1f3] flex items-center justify-center text-center text-xl'>
						Категорії
					</header>
				</aside>
				<section>
					<header className='border-b-[1px] bg-white px-4 py-2 flex items-center gap-5 h-[60px]'>
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
							className='w-[300px]'
							styles={{
								container: base => ({ ...base, width: '300px' })
							}}
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
								className='rounded-[4px] border-[1px] border-[rgb(204,204,204)] h-full px-2 '
							/>
							шт.
						</div>
						<div className='ml-auto flex items-center gap-2'>
							<button
								className={cn(
									'w-10 h-10 rounded-sm bg-[rgb(233,233,233)] flex items-center justify-center hover:bg-[rgb(100,100,100)] transition-colors duration-200',
									{ 'bg-[rgb(100,100,100)]': currentShowMode === 'list' }
								)}
								title='Список'
								onClick={() => setCurrentShowMode('list')}
							>
								<ListIcon
									color='rgb(180, 180, 180)'
									fill='rgb(180, 180, 180)'
								/>
							</button>
							<button
								className={cn(
									'w-10 h-10 rounded-sm bg-[rgb(233,233,233)] flex items-center justify-center hover:bg-[rgb(100,100,100)] transition-colors duration-200',
									{ 'bg-[rgb(100,100,100)]': currentShowMode === 'grid' }
								)}
								title='Сітка'
								onClick={() => setCurrentShowMode('grid')}
							>
								<LayoutGridIcon
									color='rgb(180, 180, 180)'
									fill='rgb(180, 180, 180)'
								/>
							</button>
						</div>
					</header>
				</section>
			</div>
		</div>
	)
}

export const ShopComponent = dynamic(() => Promise.resolve(Shop), { ssr: false })
