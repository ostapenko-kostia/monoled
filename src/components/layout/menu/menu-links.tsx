'use client'

import { SheetContext } from '@/components/ui/sheet'
import { useTexts } from '@/context/textContext'
import Link from 'next/link'
import { useContext } from 'react'

export function MenuLinks() {
	const sheetContext = useContext(SheetContext)

	const texts = useTexts()
	const aboutTitle = texts?.find(text => text.slug === 'about-title')?.text
	const contactsTitle = texts?.find(text => text.slug === 'contacts-title')?.text
	const instagramTitle = texts?.find(text => text.slug === 'instagram-title')?.text

	return (
		<ul className='flex flex-col gap-8'>
			<li className='text-4xl max-sm:text-2xl hover:text-blue-500 transition-colors duration-300'>
				<Link
					href='/contact-us'
					onClick={() => sheetContext?.closeSheet()}
				>
					{contactsTitle}
				</Link>
			</li>

			<li className='text-4xl max-sm:text-2xl hover:text-blue-500 transition-colors duration-300'>
				<Link
					href='/about'
					onClick={() => sheetContext?.closeSheet()}
				>
					{aboutTitle}
				</Link>
			</li>

			<li className='text-4xl max-sm:text-2xl hover:text-blue-500 transition-colors duration-300'>
				<Link
					target='_blank'
					href='https://www.instagram.com/monoled_lighting/'
					onClick={() => sheetContext?.closeSheet()}
				>
					{instagramTitle}
				</Link>
			</li>
		</ul>
	)
}
