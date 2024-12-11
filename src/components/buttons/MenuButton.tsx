'use client'

import { MenuIcon } from 'lucide-react'
import { Sheet } from '../ui/sheet'

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
			123
		</Sheet>
	)
}
