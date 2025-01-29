import { Dialog } from '@/components/ui/dialog'
import { stringifyWithoutQuotes } from '@/utils/stringifyWithoutQuotes'
import { Product } from '@prisma/client'
import { InfoIcon } from 'lucide-react'

interface Props {
	product: Product
	categoryName: string
}

export function AdminProductInfo({ product, categoryName }: Props) {
	const keysToDisplay: Record<string, string> = {
		id: 'ID',
		name: 'Назва',
		price: 'Ціна',
		categorySlug: 'Slug категорї',
		images: 'Зображення',
		slug: 'Slug',
		info: 'Інформація',
		quantityLeft: "Кількість на складі",
		modelUrl: 'URL моделі',
		isNew: 'Новинка',
		description: 'Опис',
		createdAt: 'Дата створення',
		updatedAt: 'Дата оновлення'
	}

	return (
		<Dialog
			title={product.name}
			trigger={
				<button>
					<InfoIcon />
				</button>
			}
		>
			<ul>
				<li className='my-2 [&_span]:text-neutral-500 text-lg'>
					<span>Категорія:</span> {categoryName}
				</li>
				{Object.entries(product).map(([key, value]) => (
					<li
						className='my-2 [&_span]:text-neutral-500 text-lg'
						key={key}
					>
						<span>{keysToDisplay[key]}:</span> {stringifyWithoutQuotes(value)}
					</li>
				))}
			</ul>
		</Dialog>
	)
}
