import Link from 'next/link'
import localFont from 'next/font/local'
import clsx from 'clsx'

const bestari = localFont({
	src: [
		{ path: '../../fonts/Bestari-Regular.woff2', weight: '400', style: 'normal' }
	]
})


const Logo = () => {
	return (
		<Link href="/">
			<span className={clsx('uppercase text-3xl', bestari.className)}>Monoled</span>
		</Link>
	)
}

export default Logo
