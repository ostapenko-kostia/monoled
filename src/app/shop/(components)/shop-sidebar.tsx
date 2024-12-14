'use client'

import { Category } from '@prisma/client'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import cn from 'clsx'

interface Props {
	allCategories: Category[] | undefined
}

export function ShopSidebar({ allCategories }: Props) {
	const params = useSearchParams()
	const pathname = usePathname()

	return (
		<aside className='bg-white border-b-[1px] overflow-y-hidden'>
			<header className='w-full py-4 uppercase font-light tracking-wide bg-[#f0f1f3] flex items-center justify-center text-center text-xl'>
				Категорії
			</header>
			<ul className='flex flex-col gap-5 py-5 px-6 border-t-[1px] border-l-[1px] h-full'>
				{allCategories ? (
					<>
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
					</>
				) : (
					<li>Помилка при завантаженні категорій, спробуйте оновити сторінку</li>
				)}
			</ul>
		</aside>
	)
}
