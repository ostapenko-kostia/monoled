'use client'

import Link from 'next/link'
import localFont from 'next/font/local'
import clsx from 'clsx'
import { useTexts } from '@/context/textContext'

const bestari = localFont({
	src: [{ path: '../../fonts/Quantify-Bold.woff2', weight: '700', style: 'normal' }]
})

function Logo() {
	const title = useTexts()?.find(text => text.slug === 'title')?.text

	return (
		<Link href='/'>
			<span className={clsx('text-4xl tracking-[0.07em]', bestari.className)}>
				{title ?? ''}
			</span>
		</Link>
	)
}

export default Logo
