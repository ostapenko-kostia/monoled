'use client'

import { SheetContext } from '@/components/ui/sheet'
import { Category } from '@prisma/client'
import cn from 'clsx'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useContext, useEffect } from 'react'

interface Props {
	categories: Category[]
}

export function MenuList({ categories }: Props) {
	const pathname = usePathname()
	const params = useSearchParams()

	const sheetContext = useContext(SheetContext)

	return (
		<ul className='flex flex-col gap-3'>
			<li
				className={cn({
					'text-[rgb(10,120,191)]':
						(!params.toString().includes('categories') || !params.get('categories')?.length) &&
						pathname.includes('shop')
				})}
			>
				<Link
					href='/shop'
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
						href={`/shop?categories=${i.slug}`}
						onClick={() => sheetContext?.closeSheet()}
					>
						- {i.name}
					</Link>
				</li>
			))}
		</ul>
	)
}
