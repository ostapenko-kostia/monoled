'use client'

import styles from './accordion.module.scss'
import { ChevronRightIcon } from 'lucide-react'
import { PropsWithChildren, useState } from 'react'
import cn from 'clsx'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
	title: string
	defaultOpen?: boolean
}

export function Accordion({ title, children, defaultOpen = false }: PropsWithChildren<Props>) {
	const [isOpen, setIsOpen] = useState<boolean>(defaultOpen)

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
			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						className='overflow-hidden pl-10 pt-5'
						initial={{ height: 0 }}
						animate={{ height: 'auto' }}
						exit={{ height: 0 }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	)
}
