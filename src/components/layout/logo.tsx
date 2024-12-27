'use client'

import Link from 'next/link'
import localFont from 'next/font/local'
import clsx from 'clsx'
import { useTexts } from '@/context/textContext'

const bestari = localFont({
	src: [{ path: '../../fonts/Bestari-Regular.woff2', weight: '400', style: 'normal' }]
})

function Logo() {
	const title = useTexts()?.find(text => text.slug === 'title')?.text

	return (
		<Link href='/'>
			<span className={clsx('uppercase text-3xl', bestari.className)}>{title ?? ''}</span>
		</Link>
	)
}

export default Logo
