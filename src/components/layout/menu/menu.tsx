'use client'

import { Accordion } from '@/components/ui/accordion/accordion'
import Link from 'next/link'
import { MENU_CATEGORIES_LINKS } from './menu.data'
import cn from 'clsx'
import { useSearchParams } from 'next/navigation'

export function Menu() {
	const params = useSearchParams().toString()

	return (
		<div className='w-full h-full text-foreground'>
			<Accordion
				title='Категорії'
				defaultOpen
			>
				<ul className='flex flex-col gap-3'>
					{MENU_CATEGORIES_LINKS.map(i => (
						<li
							key={i.slug}
							className={cn({ 'text-[rgb(10,120,191)]': params.includes(i.slug) })}
						>
							<Link href={`/shop?categories=${i.slug}`}>- {i.title}</Link>
						</li>
					))}
				</ul>
			</Accordion>
		</div>
	)
}
