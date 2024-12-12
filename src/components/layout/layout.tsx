import type { PropsWithChildren } from 'react'
import { Header } from './header'

export default function Layout({ children }: PropsWithChildren<unknown>) {
	return (
		<>
			<Header />
			<main>{children}</main>
		</>
	)
}
