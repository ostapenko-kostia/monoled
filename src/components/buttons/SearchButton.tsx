import { SearchIcon } from 'lucide-react'
import { Dialog } from '../ui/dialog'

export function SearchButton() {
	return (
		<Dialog
			title='Пошук'
			trigger={
				<button>
					<SearchIcon
						size={30}
						strokeWidth={1.5}
					/>
				</button>
			}
		>
			<search>
				<form action='/shop' className='relative w-full'>
					<input
						className='w-full p-3 border border-gray-300 rounded'
						type='search'
						placeholder='Я шукаю...'
						name='search'
					/>
					<button type='submit' className='absolute top-1/2 -translate-y-1/2 right-3'>
						<SearchIcon />
					</button>
				</form>
			</search>
		</Dialog>
	)
}
