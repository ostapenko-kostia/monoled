'use client'

import { ProductWithInfo } from '@/typing/interfaces'
import { UseFormRegister } from 'react-hook-form'

interface Props {
	product: ProductWithInfo
	register: UseFormRegister<any>
}

export function AdminProductEditPrice({ product, register }: Props) {
	return (
		<div className='flex items-start flex-col gap-2'>
			<label
				htmlFor='price'
				className='flex items-center gap-2'
			>
				Ціна
			</label>
			<input
				className='w-full rounded-md border border-[#ccc] bg-white h-10 text-[#333] placeholder:text-[#808080] px-3 py-3 text-sm focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500;'
				type='number'
				placeholder={product.price.toString() ?? 'Ціна...'}
				id='price'
				{...register('price')}
			/>
		</div>
	)
}
