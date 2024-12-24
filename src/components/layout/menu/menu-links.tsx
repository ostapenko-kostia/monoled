'use client'

import { SheetContext } from '@/components/ui/sheet'
import Link from 'next/link'
import { useContext } from 'react'

export function MenuLinks() {
	const sheetContext = useContext(SheetContext)

	return (
		<ul className='flex flex-col gap-8'>
			<li className='text-4xl max-sm:text-2xl hover:text-blue-500 transition-colors duration-300'>
				<Link
					href='/contact-us'
					onClick={() => sheetContext?.closeSheet()}
				>
					Контакти
				</Link>
			</li>

			<li className='text-4xl max-sm:text-2xl hover:text-blue-500 transition-colors duration-300'>
				<Link
					href='/about'
					onClick={() => sheetContext?.closeSheet()}
				>
					Про бренд
				</Link>
			</li>

			<li className='text-4xl max-sm:text-2xl hover:text-blue-500 transition-colors duration-300'>
				<Link
					href='/blog'
					onClick={() => sheetContext?.closeSheet()}
				>
					Блог
				</Link>
			</li>

			<li className='text-4xl max-sm:text-2xl hover:text-blue-500 transition-colors duration-300'>
				<Link
					href='https://instagram.com/'
					onClick={() => sheetContext?.closeSheet()}
				>
					Інстаграм
				</Link>
			</li>
		</ul>
	)
}
