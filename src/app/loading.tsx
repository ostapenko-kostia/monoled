import { LoaderIcon } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Monoled - Завантаження...'
}

export default function Page() {
	return (
		<div className='w-full'>
			<LoaderIcon
				className='animate-spin mx-auto mt-40'
				size={30}
			/>
			<h1 className='text-center text-3xl mt-9'>Завантаження</h1>
		</div>
	)
}
