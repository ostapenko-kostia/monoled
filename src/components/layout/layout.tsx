'use client'

import type { PropsWithChildren } from 'react'
import { Header } from './header'
import { Footer } from './footer/footer'
import { usePathname } from 'next/navigation'

export default function Layout({ children }: PropsWithChildren<unknown>) {
	const pathname = usePathname()
	return (
		<>
			<main>{children}</main>
			{pathname === '/' ? <></> : <Footer />}
		</>
	)
}
