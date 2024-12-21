'use client'

import { useState } from 'react'
import type { Admin as TAdmin, Category, Product, Slide, TextField } from '@prisma/client'
import dynamic from 'next/dynamic'
import { AdminCategoriesTab } from './admin-categories/admin-categories'
import { AdminSlidesTab } from './admin-slides/admin-slides'
import { AdminsTab } from './admins-tab/admins-tab'
import { AdminProductsTab } from './admin-products/admin-products'
import { AdminTextFieldsTab } from './admin-texts/admin-texts'

interface Props {
	slides: Slide[] | undefined
	texts: TextField[] | undefined
	products: Product[] | undefined
	categories: Category[] | undefined
	admins: TAdmin[] | undefined
}

function AdminComponent({ slides, texts, products, categories, admins }: Props) {
	const [currentTab, setCurrentTab] = useState(0)

	const tabs = [
		<AdminProductsTab products={products} categories={categories} />,
		<AdminCategoriesTab categories={categories} products={products} />,
		<AdminSlidesTab slides={slides} />,
		<AdminsTab admins={admins} />,
		<AdminTextFieldsTab texts={texts} />
	]

	return (
		<div className='min-h-[80vh] container mx-auto max-sm:px-2 py-8 grid grid-cols-[1fr_2.5fr] max-lg:grid-cols-1 gap-5'>
			<aside className='bg-white overflow-y-hidden rounded-xl min-w-[360px] max-sm:min-w-min'>
				<h2 className='text-3xl text-center my-5 font-semibold'>Адмін панель</h2>
				<ul className='flex flex-col gap-5 py-5 px-6 h-full'>
					<li
						onClick={() => setCurrentTab(0)}
						className='text-xl max-sm:text-xl hover:text-blue-500 transition-colors duration-300 cursor-pointer'
					>
						Товари
					</li>
					<li
						onClick={() => setCurrentTab(1)}
						className='text-xl hover:text-blue-500 transition-colors duration-300 cursor-pointer'
					>
						Категорії
					</li>
					<li
						onClick={() => setCurrentTab(2)}
						className='text-xl max-sm:text-xl hover:text-blue-500 transition-colors duration-300 cursor-pointer'
					>
						Слайди
					</li>
					<li
						onClick={() => setCurrentTab(3)}
						className='text-xl max-sm:text-xl hover:text-blue-500 transition-colors duration-300 cursor-pointer'
					>
						Адміністратори
					</li>
					<li
						onClick={() => setCurrentTab(4)}
						className='text-xl max-sm:text-xl hover:text-blue-500 transition-colors duration-300 cursor-pointer'
					>
						Текстові поля
					</li>
				</ul>
			</aside>
			<div className='bg-white rounded-xl w-full overflow-x-hidden'>{tabs[currentTab]}</div>
		</div>
	)
}

export const Admin = dynamic(() => Promise.resolve(AdminComponent), { ssr: false })
