'use client'

import { UseFormRegister } from 'react-hook-form'

interface Props {
	register: UseFormRegister<any>
}

export function AdminProductCreateDescription({ register }: Props) {
	return (
		<div className='flex items-start flex-col gap-2'>
			<label
				htmlFor='description'
				className='flex items-center gap-2'
			>
				Опис <span className='text-red-400'>*</span>
			</label>
			<textarea
				className='w-full rounded-md border border-[#ccc] bg-white min-h-20 max-h-36 resize-y text-[#333] placeholder:text-[#808080] px-3 py-3 text-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
				required
				placeholder='1500'
				id='description'
				{...register('description', { required: true })}
			/>
		</div>
	)
}
