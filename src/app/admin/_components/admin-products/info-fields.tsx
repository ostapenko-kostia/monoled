'use client'

import { ProductWithInfo } from '@/typing/interfaces'
import { ChevronDownIcon, ChevronUpIcon, XIcon } from 'lucide-react'
import { useState } from 'react'

interface Props {
	info: ProductWithInfo['info']
	moveUp: (index: number) => void
	moveDown: (index: number) => void
	deleteInfoField: (index: number) => void
	addInfoField: (key: string, value: string) => void
}

export function InfoFields({ info, addInfoField, deleteInfoField, moveDown, moveUp }: Props) {
	const [key, setKey] = useState('')
	const [value, setValueInput] = useState('')
	return (
		<div>
			<div className='flex flex-col gap-2'>
				<h4 className='text-lg font-medium'>Додаткова інформація:</h4>
				<ul className='flex flex-col gap-4'>
					{info
						.sort((a, b) => a.order - b.order)
						.map((info, index) => (
							<li
								className='border rounded-md py-2 px-4 flex justify-between items-center gap-2'
								key={index}
							>
								{`${info.title}: ${info.value}`}
								<div className='flex items-center gap-4'>
									<button
										type='button'
										onClick={() => moveUp(index)}
									>
										<ChevronUpIcon />
									</button>
									<button
										type='button'
										onClick={() => moveDown(index)}
									>
										<ChevronDownIcon />
									</button>
									<button
										type='button'
										onClick={() => deleteInfoField(index)}
									>
										<XIcon />
									</button>
								</div>
							</li>
						))}
				</ul>
			</div>

			<div className='flex gap-2 items-center mt-3'>
				<input
					type='text'
					placeholder='Ключ'
					value={key}
					onChange={e => setKey(e.target.value)}
					className='w-1/2 rounded-md border border-[#ccc] bg-white h-10 text-[#333] placeholder:text-[#808080] px-3 py-3 text-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
				/>
				<input
					type='text'
					placeholder='Значення'
					value={value}
					onChange={e => setValueInput(e.target.value)}
					className='w-1/2 rounded-md border border-[#ccc] bg-white h-10 text-[#333] placeholder:text-[#808080] px-3 py-3 text-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
				/>
				<button
					type='button'
					onClick={() => {
						addInfoField(key, value)
						setKey('')
						setValueInput('')
					}}
					className='bg-black text-white rounded-md px-4 py-2'
				>
					Додати
				</button>
			</div>
		</div>
	)
}
