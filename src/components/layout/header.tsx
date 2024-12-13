import Link from 'next/link'
import { MenuButton } from '../buttons/MenuButton'
import { SearchButton } from '../buttons/SearchButton'
import Image from 'next/image'

export function Header() {
	return (
		<header className='py-5 transition-colors duration-500 bg-[rgba(255,255,255,.5)]'>
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
