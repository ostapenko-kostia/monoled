'use client'

import { SORTING_METHODS } from '../shop.data'
import Select from 'react-select'
import { useShopStore } from '../shop.store'
import { ChangeEvent } from 'react'
import { LayoutGridIcon, ListIcon } from 'lucide-react'
import cn from 'clsx'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

function ShopHeaderComponent() {
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

	return (
		<motion.header
			className='border-[1px] border-l-0 bg-white px-4 py-2 flex items-center gap-5 h-full max-lg:flex-col max-lg:py-5'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.3, bounce: 0, ease: 'easeInOut' }}
		>
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
			<div className='ml-auto flex items-center gap-2 max-lg:mx-auto max-md:hidden'>
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
		</motion.header>
	)
}

export const ShopHeader = dynamic(() => Promise.resolve(ShopHeaderComponent), { ssr: false })
