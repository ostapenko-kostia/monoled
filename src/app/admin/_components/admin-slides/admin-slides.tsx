'use client'

import { Slide } from '@prisma/client'
import { useState } from 'react'
import clsx from 'clsx'
import { AdminSlidesList } from './admin-slides-list'

interface Props {
	slides: Slide[] | undefined
}

export function AdminSlidesTab({ slides }: Props) {
	const [tab, setTab] = useState<'desktop' | 'mobile'>('desktop')

	const mobileSlides = slides?.filter(slide => slide.device === 'MOBILE')
	const desktopSlides = slides?.filter(slide => slide.device === 'DESKTOP')

	return (
		<div className='p-4 animate-opacity-1'>
			<h2 className='text-2xl font-semibold'>Слайди</h2>
			<div className='w-full my-6'>
				<button
					onClick={() => setTab('desktop')}
					className={clsx('px-4 py-2 rounded-l-md bg-gray-100', {
						'!bg-gray-500 text-white': tab === 'desktop'
					})}
				>
					Комп'ютерні слайди
				</button>
				<button
					onClick={() => setTab('mobile')}
					className={clsx('px-4 py-2 rounded-r-md bg-gray-100', {
						'!bg-gray-500 text-white': tab === 'mobile'
					})}
				>
					Мобільні слайди
				</button>
			</div>
			{tab === 'desktop' && <AdminSlidesList view={tab} slides={desktopSlides} />}
			{tab === 'mobile' && <AdminSlidesList view={tab} slides={mobileSlides} />}
		</div>
	)
}
