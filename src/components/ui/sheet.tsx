'use client'

import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import dynamic from 'next/dynamic'
import {
	cloneElement,
	createContext,
	type JSX,
	type PropsWithChildren,
	useContext,
	useState
} from 'react'
import { createPortal } from 'react-dom'

export const SheetContext = createContext<{
	isOpen: boolean
	openSheet: () => void
	closeSheet: () => void
} | null>(null)

function SheetComponent({
	trigger,
	side = 'right',
	children,
	title,
	className
}: PropsWithChildren<{
	trigger: JSX.Element
	title?: string
	side?: string
	className?: string
}>) {
	const [isOpen, setIsOpen] = useState(false)

	const openSheet = () => {
		setIsOpen(true)
		if(typeof window !== 'undefined') document.body.style.overflow = 'hidden'
	}

	const closeSheet = () => {
		setIsOpen(false)
		if(typeof window !== 'undefined') document.body.style.overflow = 'auto'
	}

	return (
		<SheetContext.Provider value={{ isOpen, closeSheet, openSheet }}>
			{cloneElement(trigger, { onClick: openSheet })}
			{createPortal(
				<SheetContent
					className={className}
					title={title}
					side={side}
				>
					{children}
				</SheetContent>,
				document.body
			)}
		</SheetContext.Provider>
	)
}

export const Sheet = dynamic(() => Promise.resolve(SheetComponent), { ssr: false })

function SheetContent({
	children,
	className,
	side,
	title
}: PropsWithChildren<{
	className?: string
	title?: string
	side?: string
}>) {
	const sheetContextValues = useContext(SheetContext)

	if (!sheetContextValues) throw new Error('SheetContent must be used within a <Sheet />')

	const { closeSheet, isOpen } = sheetContextValues

	const sideVariants = {
		hidden: { x: side === 'left' ? '-100%' : '100%' },
		visible: { x: '0%' },
		exit: { x: side === 'left' ? '-100%' : '100%' }
	}

	return (
		<AnimatePresence mode='wait'>
			{isOpen && (
				<div
					className='fixed left-0 top-0 w-screen h-screen overflow-hidden'
					id='sheet'
				>
					<motion.div
						key='sheet-overlay'
						className='fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.6)] z-[999]'
						onClick={closeSheet}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
					/>

					<motion.div
						key='sheet-content'
						id='sheet-content'
						className={clsx(
							'fixed top-0 p-4 pt-1 h-full bg-white z-[1000] w-[30rem] max-md:w-[25rem] max-sm:w-4/5',
							{
								'left-0': side === 'left',
								'right-0': side === 'right'
							}
						)}
						variants={sideVariants}
						initial='hidden'
						animate='visible'
						exit='exit'
						transition={{ duration: 0.3 }}
					>
						<div className='w-full py-4 flex justify-between items-center mb-2'>
							<h2 className='text-2xl font-bold text-black'>{title}</h2>
							<X
								className='cursor-pointer'
								onClick={closeSheet}
								size={30}
								color="#000"
							/>
						</div>
						<div className={clsx('w-full h-full', className)}>{children}</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	)
}
