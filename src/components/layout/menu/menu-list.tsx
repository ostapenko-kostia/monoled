'use client'

import { SheetContext } from '@/components/ui/sheet'
import { Category } from '@prisma/client'
import Link from 'next/link'
import { useContext } from 'react'

interface Props {
	categories: Category[] | undefined
}

export function MenuList({ categories }: Props) {
	const sheetContext = useContext(SheetContext)

	return (
		<ul className='flex flex-col gap-5 text-xl'>
			{categories ? (
				<>
					<li>
						<Link
							href='/shop'
							className='text-2xl max-sm:text-xl'
							onClick={() => sheetContext?.closeSheet()}
						>
							- Всі категорії
						</Link>
					</li>
					{categories.map(i => (
						<li key={i.slug}>
							<Link
								href={`/shop?category=${i.slug}`}
								className='text-2xl max-sm:text-xl'
								onClick={() => sheetContext?.closeSheet()}
							>
								- {i.name}
							</Link>
						</li>
					))}
				</>
			) : (
				<li>Помилка при отриманні категорій, спробуйте оновити сторінку</li>
			)}
		</ul>
	)
}
