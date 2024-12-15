'use client'

import { type Product } from '@prisma/client'
import Link from 'next/link'

interface Props {
	product: Product
}

export function Product({ product }: Props) {
	return (
		<>
			<div className='bg-[#f0f1f3] py-7'>
				<div className='container mx-auto max-sm:px-2 flex items-center gap-5 h-[40px]'>
					<Link href='/'>Головна</Link>
					<span className='font-semibold'>{' > '}</span>
					<Link href='/shop'>Каталог</Link>
					<span className='font-semibold'>{' > '}</span>
					<hr className='h-full w-[1px] bg-black' />
					{product.name}
				</div>
			</div>
		</>
	)
}
