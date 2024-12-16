'use client'

import { SheetContext } from '@/components/ui/sheet'
import { Category } from '@prisma/client'
import cn from 'clsx'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useContext, useEffect } from 'react'

interface Props {
	categories: Category[] | undefined
}

export function MenuList({ categories }: Props) {
	const pathname = usePathname()
	const params = useSearchParams()

	const sheetContext = useContext(SheetContext)

	return (
		<ul className='flex flex-col gap-5 text-xl'>
			{categories ? (
				<>
					<li
						className={cn({
							'text-[rgb(10,120,191)]':
								(!params.toString().includes('category') || !params.get('category')?.length) &&
								pathname.includes('shop')
						})}
					>
						<Link
							href='/shop'
							className='text-3xl'
							onClick={() => sheetContext?.closeSheet()}
						>
							- Всі категорії
						</Link>
					</li>
					{categories.map(i => (
						<li
							key={i.slug}
							className={cn({
								'text-[rgb(10,120,191)]':
									params.toString().includes(i.slug) && pathname.includes('shop')
							})}
						>
							<Link
								href={`/shop?category=${i.slug}`}
								className='text-3xl'
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
