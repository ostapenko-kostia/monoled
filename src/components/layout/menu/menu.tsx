import { Accordion } from '@/components/ui/accordion'
import { Category } from '@prisma/client'
import { MenuList } from './menu-list'
import { categoriesService } from '@/app/services/categories.service'

export const revalidate = 180

export async function Menu() {
	try {
		const categories: Category[] = (await categoriesService.getAllCategories()).data

		return (
			<div className='w-full h-full text-foreground'>
				<Accordion title='Категорії'>
					<MenuList categories={categories} />
				</Accordion>
			</div>
		)
	} catch (error) {
		return (
			<div className='w-full h-full text-foreground'>
				<Accordion title='Категорії'>
					<div>Не вдалося завантажити категорії, спробуйте оновити сторінку</div>
				</Accordion>
			</div>
		)
	}
}
