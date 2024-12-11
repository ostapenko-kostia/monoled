import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.scss'
import Layout from '@/components/layout/layout'

const montserrat = Montserrat({
	subsets: ['latin', 'cyrillic'],
	weight: ['300', '400', '500', '700', '900']
})

export const metadata: Metadata = {
	title: 'Monoled',
	description: 'Monoled'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={montserrat.className}>
				<Layout>{children}</Layout>
			</body>
		</html>
	)
}
