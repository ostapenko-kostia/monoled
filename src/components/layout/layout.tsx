'use client'

import type { PropsWithChildren } from 'react'
import { Footer } from './footer/footer'
import { usePathname } from 'next/navigation'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'

export default function Layout({ children }: PropsWithChildren<unknown>) {
	const pathname = usePathname()
	const queryClient = new QueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			<Toaster containerClassName='!z-[10000]' />
			<main>{children}</main>
			{pathname === '/' ? <></> : <Footer className='pb-10 [&_div]:pt-10' />}
		</QueryClientProvider>
	)
}
