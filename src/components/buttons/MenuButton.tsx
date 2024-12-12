import { MenuIcon } from 'lucide-react'
import dynamic from 'next/dynamic'
import { Menu } from '../layout/menu/menu'
const Sheet = dynamic(() => import('../ui/sheet').then(mod => mod.Sheet), { ssr: false })

export function MenuButton() {
	return (
		<Sheet
			side='left'
			title='Меню'
			trigger={
				<button title='Відкрити меню'>
					<MenuIcon
						size={40}
						strokeWidth={1.5}
					/>
				</button>
			}
		>
			<Menu />
		</Sheet>
	)
}
