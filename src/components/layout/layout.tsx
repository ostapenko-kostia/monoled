import type { PropsWithChildren } from 'react'
import { Header } from './header'

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<>
			<Header />
			<main className='container mx-auto max-sm:px-1'>{children}</main>
		</>
	)
}
