'use client'

import cn from 'clsx'
import Logo from '@/components/layout/logo'
import { useTexts } from '@/context/textContext'

interface Props {
	className?: string
}

export function Footer({ className }: Props) {
	const texts = useTexts();
	const copyrightText = texts?.find(text => text.slug === 'copyright')?.text
	return (
		<footer
			className={cn(
				className,
				'bg-foreground text-background px-8 py-5 max-sm:px-4 w-ful h-full flex flex-col items-center text-center gap-4'
			)}
		>
			<Logo />
			<span className='text-neutral-400'>{copyrightText}</span>
		</footer>
	)
}
