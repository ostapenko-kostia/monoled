import Logo from '@/components/layout/logo'
import { MenuButton } from '../../buttons/MenuButton'
import { SearchButton } from '../../buttons/SearchButton'
import { HeaderWrapper } from './header-wrapper'

export async function Header() {
	return (
		<HeaderWrapper>
			<div className='px-8 max-sm:px-2 flex items-center justify-between'>
				<MenuButton />
				<Logo />
				<SearchButton />
			</div>
		</HeaderWrapper>
	)
}
