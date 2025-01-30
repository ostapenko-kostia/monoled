'use client'

import { ProductWithInfo } from '@/typing/interfaces'
import { UseFormRegister } from 'react-hook-form'

interface Props {
	product: ProductWithInfo
	register: UseFormRegister<any>
}

export function AdminProductEditDescription({ product, register }: Props) {
	return (
		<div className='flex items-start flex-col gap-2'>
			<label
				htmlFor='description'
				className='flex items-center gap-2'
			>
				Опис
			</label>
			<textarea
				className='w-full rounded-md border border-[#ccc] bg-white min-h-36 max-h-72 resize-y text-[#333] placeholder:text-[#808080] px-3 py-3 text-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
				placeholder={product.description ?? 'Опис...'}
				id='description'
				{...register('description')}
			/>
		</div>
	)
}
