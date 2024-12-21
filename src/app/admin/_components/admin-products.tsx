'use client'

import { ShopProduct } from '@/app/shop/_components/shop-product'
import type { Product } from '@prisma/client'
import { EditIcon, PlusCircleIcon, Trash2Icon } from 'lucide-react'

interface Props {
	products: Product[] | undefined
}

export function AdminProducts({ products }: Props) {
	return (
		<div className='w-full p-4'>
			<h2 className='mb-6 text-2xl font-semibold'>Товари</h2>
			<div className='grid grid-cols-4 w-full gap-10 max-xl:grid-cols-3 max-md:grid-cols-2 max-[480px]:grid-cols-1'>
				{products?.map(product => (
					<div
						className='relative'
						key={product.id}
					>
						<div className='absolute z-10 bg-white flex items-center gap-3 justify-center p-2 right-2 rounded-b-md'>
							<button>
								<EditIcon />
							</button>
							<button>
								<Trash2Icon />
							</button>
						</div>
						<ShopProduct
							showMode='grid'
							product={product}
						/>
					</div>
				))}
				<button className='w-full h-full min-h-56 bg-[rgba(0,0,0,.35)] hover:bg-[rgba(0,0,0,.6)] transition-colors duration-700 rounded-md flex flex-col gap-4 items-center justify-center'>
					<PlusCircleIcon size={90} stroke='#fff' />
					<h3 className='text-white text-2xl font-medium'>Створити</h3>
				</button>
			</div>
		</div>
	)
}
