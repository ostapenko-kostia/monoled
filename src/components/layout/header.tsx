import Link from 'next/link'
import { MenuButton } from '../buttons/MenuButton'
import { SearchButton } from '../buttons/SearchButton'
import Image from 'next/image'

export function Header() {
	return (
		<header className='py-5'>
			<div className='container mx-auto max-sm:px-1 flex items-center justify-between'>
				<MenuButton />
				<Link href='/'>
					<Image
						src='/logo.png'
						alt='Monoled Logo'
						height={82}
						width={150}
					/>
				</Link>
				<SearchButton />
			</div>
		</header>
	)
}
