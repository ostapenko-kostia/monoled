'use client'

import Link from 'next/link'
import { MenuButton } from '../buttons/MenuButton'
import { SearchButton } from '../buttons/SearchButton'
import Image from 'next/image'
import cn from 'clsx'
import { useHomeStore } from '../home/home.store'

export function Header() {
	const { currentSlide } = useHomeStore()
	const isMutedBackground = currentSlide > 1

	return (
		<header
			className={cn(
				'py-5 transition-colors duration-500',
				isMutedBackground && 'bg-[rgba(255,255,255,.5)]'
			)}
		>
			<div className='px-8 max-sm:px-2 flex items-center justify-between'>
				<MenuButton />
				<Link href='/'>
					<Image
						className=''
						src='/uploads/logo.avif'
						alt='Monoled Logo'
						height={18.13}
						width={200}
					/>
				</Link>
				<SearchButton />
			</div>
		</header>
	)
}
