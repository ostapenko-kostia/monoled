import { Accordion } from '@/components/ui/accordion'
import { Category } from '@prisma/client'
import { MenuList } from './menu-list'
import { categoriesService } from '@/app/services/categories.service'

export const revalidate = 180

export async function Menu() {
	const categories: Category[] | undefined = (await categoriesService.getAllCategories())?.data
	return (
		<div className='w-full h-full text-foreground'>
			<Accordion title='Категорії'>
				<MenuList categories={categories} />
			</Accordion>
		</div>
	)
}
