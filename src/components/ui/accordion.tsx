'use client'

import { ChevronRightIcon } from 'lucide-react'
import { PropsWithChildren, useState } from 'react'
import cn from 'clsx'
import { motion, Variants } from 'framer-motion'

interface Props {
	title: string
	defaultOpen?: boolean
}

export function Accordion({ title, children, defaultOpen = false }: PropsWithChildren<Props>) {
	const [isOpen, setIsOpen] = useState<boolean>(defaultOpen)

	const variants: Variants = {
		hidden: { height: 0, padding: 0 },
		visible: { height: 'auto' }
	}

	const toggleOpen = () => setIsOpen(prev => !prev)

	return (
		<div className='w-full p-3 rounded-md border-2 flex flex-col'>
			<button
				onClick={toggleOpen}
				className='flex items-center gap-2 text-xl font-medium w-full'
			>
				<ChevronRightIcon
					size={30}
					className={cn('transition-transform duration-300', isOpen ? 'rotate-90' : 'rotate-0')}
				/>
				<span className='inline-block h-full'>{title}</span>
			</button>
			<motion.div
				className='overflow-hidden pl-10 pt-5'
				variants={variants}
				initial={{ height: 0 }}
				animate={isOpen ? 'visible' : 'hidden'}
				transition={{ duration: 0.2 }}
			>
				{children}
			</motion.div>
		</div>
	)
}
