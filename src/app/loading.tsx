import { textsService } from '@/services/texts.service'
import { LoaderIcon } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Monoled - Завантаження...'
}

export default async function Page() {
	const texts = (await textsService.getAllTexts())
	const loadingText = texts?.find(text => text.slug === 'loading')?.text
	return (
		<div className='w-full my-40 min-h-[88vh]'>
			<LoaderIcon
				className='animate-spin mx-auto'
				size={30}
			/>
			<h1 className='text-center text-3xl mt-9'>{loadingText}</h1>
		</div>
	)
}
