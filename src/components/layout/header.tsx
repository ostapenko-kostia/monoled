import Link from 'next/link'
import { MenuButton } from '../buttons/MenuButton'
import { SearchButton } from '../buttons/SearchButton'
import Image from 'next/image'

export function Header() {
	return (
		<header className='py-5'>
			<div className='px-8 max-sm:px-2 flex items-center justify-between'>
				<MenuButton />
				<Link href='/'>
					<Image
						src='/logo.png'
						alt='Monoled Logo'
						height={82}
						width={200}
					/>
				</Link>
				<SearchButton />
			</div>
		</header>
	)
}