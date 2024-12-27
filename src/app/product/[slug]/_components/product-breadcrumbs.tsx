import { textsService } from '@/services/texts.service'
import { Product } from '@prisma/client'
import Link from 'next/link'

interface Props {
	product: Product
}

export async function ProductBreadcrumbs({ product }: Props) {
	const texts = (await textsService.getAllTexts())?.data
	const homeTitle = texts?.find(text => text.slug === 'home-title')?.text
	const shopShortTitle = texts?.find(text => text.slug === 'shop-short-title')?.text

	return (
		<div className='bg-[#f0f1f3] py-7'>
			<div className='container mx-auto max-sm:px-2 flex items-center gap-5 h-[40px] max-[500px]:gap-3'>
				<Link href='/'>{homeTitle}</Link>
				<span className='font-semibold'>{' > '}</span>
				<Link href='/shop'>{shopShortTitle}</Link>
				<span className='font-semibold'>{' > '}</span>
				<hr className='h-full w-[1px] bg-black' />
				<span className='max-sm:text-sm'>{product.name}</span>
			</div>
		</div>
	)
}
