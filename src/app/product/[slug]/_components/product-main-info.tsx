import { Product } from '@prisma/client'
import { DownloadIcon } from 'lucide-react'
import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import cn from 'clsx'
import { stringifyWithoutQuotes } from '@/utils/stringifyWithoutQuotes'

interface Props {
	setCurrentInfoBlock: Dispatch<SetStateAction<'description' | 'characteristics' | 'info'>>
  product: Product
}

export function ProductMainInfo({ setCurrentInfoBlock, product }: Props) {
	return (
		<div className='mx-auto w-2/3'>
			<div className='max-lg:hidden'>
				<div className='text-xl mb-2 w-full flex items-center'>
					<h3>Характеристики:</h3>{' '}
					<Link
						onClick={() => setCurrentInfoBlock('characteristics')}
						className='text-sm ml-auto text-blue-500'
						href='#info'
					>
						{'(дивитись всі)'}
					</Link>
				</div>
				{Object.entries(JSON.parse(JSON.stringify(product.info)))
					.slice(0, 5)
					.map(([key, value], index) => (
						<div
							className={cn('w-full py-2 px-6 flex items-center justify-between', {
								'bg-[#eee]': index % 2 === 0
							})}
							key={key}
						>
							<span>{key}:</span>{' '}
							<span className='text-neutral-500'>{stringifyWithoutQuotes(value)}</span>
						</div>
					))}
			</div>
			<div className='mt-10'>
				<div className='flex items-end gap-3 max-lg:justify-center max-[500px]:flex-col max-[500px]:items-center'>
					<h3 className='text-xl'>Базова ціна:</h3>
					<span className='inline-flex items-end gap-2'>
						від
						<span className='text-2xl font-semibold tracking-wide'>{product.price} грн </span>
					</span>
				</div>
				<div className='flex items-center gap-8 h-14 mt-8 max-xl:flex-col max-xl:h-auto max-lg:flex-row max-sm:flex-col max-sm:w-full'>
					<button className='h-full max-sm:w-full max-sm:items-center max-sm:flex max-sm:justify-center max-xl:h-16 border-[1px] border-foreground bg-background text-foreground rounded-md hover:text-background hover:bg-foreground transition-colors duration-300'>
						<Link
							className='flex items-center px-6 h-full'
							href='/contact-us'
						>
							Як замовити?
						</Link>
					</button>
					<button className='h-full max-sm:w-full max-sm:items-center max-sm:flex max-sm:justify-center max-xl:h-16 border-[1px] border-foreground bg-background text-foreground rounded-md hover:text-background hover:bg-foreground transition-colors duration-300'>
						<Link
							className='flex items-center px-6 h-full gap-3'
							href='/contact-us'
						>
							<DownloadIcon />
							Завантажи модель (.3ds)
						</Link>
					</button>
				</div>
			</div>
		</div>
	)
}
