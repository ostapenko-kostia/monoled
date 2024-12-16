import { Category } from '@prisma/client'
import { MenuList } from './menu-list'
import { categoriesService } from '@/services/categories.service'
import Link from 'next/link'

export const revalidate = 180

export async function Menu() {
	const categories: Category[] | undefined = (await categoriesService.getAllCategories())?.data
	return (
		<div className='w-full h-full text-foreground flex items-start gap-20 justify-around pr-28'>
			<div className='pl-10 top-8'>
				<h2 className='text-5xl font-medium mb-10'>Товари</h2>
				<MenuList categories={categories} />
			</div>
			<div className='pl-10 top-8'>
				<ul className='flex flex-col gap-8'>
					<li className='text-4xl hover:text-blue-500 transition-colors duration-300'>
						<Link href='/contact-us'>Контакти</Link>
					</li>
					<li className='text-4xl hover:text-blue-500 transition-colors duration-300'>
						<Link href='/about'>Про бренд</Link>
					</li>
					<li className='text-4xl hover:text-blue-500 transition-colors duration-300'>
						<Link href='/blog'>Блог</Link>
					</li>
					<li className='text-4xl hover:text-blue-500 transition-colors duration-300'>
						<Link href='https://instagram.com/'>Інстаграм</Link>
					</li>
				</ul>
			</div>
		</div>
	)
}
