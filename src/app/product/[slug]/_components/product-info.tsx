'use client'

import { stringifyWithoutQuotes } from '@/utils/stringifyWithoutQuotes'
import { Product } from '@prisma/client'
import cn from 'clsx'
import { useState } from 'react'

interface Props {
	product: Product
}

export function ProductInfo({ product }: Props) {
	const [currentInfoBlock, setCurrentInfoBlock] = useState<'description' | 'info'>('description')
	return (
		<div
			id='info'
			className='pt-10'
		>
			<header className='flex items-center bg-white max-lg:justify-center max-[430px]:flex-col max-[430px]:w-full'>
				<button
					onClick={() => setCurrentInfoBlock('description')}
					className={cn('bg-neutral-100 h-full px-6 py-5 max-[430px]:w-full', {
						'underline underline-offset-[6px] !bg-neutral-200': currentInfoBlock === 'description'
					})}
				>
					Опис
				</button>
				<button
					onClick={() => setCurrentInfoBlock('info')}
					className={cn('bg-neutral-100 h-full px-6 py-5 max-[430px]:w-full', {
						'underline underline-offset-[6px] !bg-neutral-200': currentInfoBlock === 'info'
					})}
				>
					Інформація
				</button>
			</header>
			<main>
				{currentInfoBlock === 'description' && (
					<div className='p-5 bg-white'>
						<h3 className='mb-5 text-xl'>Опис:</h3>
						<p className='w-2/3 max-xl:w-3/4 max-lg:w-full text-lg text-neutral-500 pl-5 font-light'>
							{product.description}
						</p>
					</div>
				)}
				{currentInfoBlock === 'info' && (
					<div className='p-5 bg-white'>
						<div className='font-light'>
							Ми доставляємо замовлення по всій Україні.
							<br />
							<br />
							Терміни доставки замовлення залежать від наявності товарів на складі. Якщо в момент
							оформлення замовлення всі обрані товари є в наявності, то ми доставимо замовлення
							протягом 1 - 2 тижнів, в залежності від віддаленості Вашого регіону. Якщо замовлений
							товар відсутній на складі, то максимальний термін доставки замовлення може скласти 8
							тижнів. Але ми намагаємося доставляти замовлення клієнтам якомога швидше, і 90%
							замовлень клієнтів відправляються протягом перших 3 тижнів. У разі, якщо частина
							товарів з Вашого замовлення через 3 тижні не надійшла на склад, ми відправимо всі
							наявні товари, а потім за наш рахунок дійшли Вам решту замовлення.
							<br />
							<br /> <span className='font-medium'>Способи оплати:</span>
							<br />
							<br />
							<ul className='list-disc list-inside'>
								<li>Оплата при отриманні</li>
								<li>Оплата в терміналі</li>
								<li>Безготівковій розрахунок</li>
							</ul>
							<br />
							Інтернет-магазин - сайт має адресу в мережі Інтернет. Товар - продукція, представлена
							​​до продажу в інтернет-магазині.
							<br />
							<br /> Клієнт - розмістила Замовлення фізична або юридична особа. Замовлення -
							оформлений належним чином запит Клієнта на купівлю Товару. <br />
							<br />
							Транспортна компанія - третя особа, що надає послуги з доставки Товарів Клієнта
						</div>
					</div>
				)}
			</main>
		</div>
	)
}
