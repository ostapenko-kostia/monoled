import { MenuButton } from '../buttons/MenuButton'
import { SearchButton } from '../buttons/SearchButton'
import Logo from '@/components/layout/logo'

export function Header() {
	return (
		<header className="py-5 transition-colors duration-500 bg-[rgba(255,255,255,.5)]">
			<div className="px-8 max-sm:px-2 flex items-center justify-between">
				<MenuButton />
				<Logo />
				<SearchButton />
			</div>
		</header>
	)
}
