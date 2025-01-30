import { textsService } from '@/services/texts.service'
import { slideService } from '@/services/slides.service'
import { productsService } from '@/services/products.service'
import { categoriesService } from '@/services/categories.service'
import { adminService } from '@/services/admin.service'
import type { Admin as TAdmin, Category, Slide, TextField } from '@prisma/client'
import { Admin } from './_components/admin'
import { ProductWithInfo } from '@/typing/interfaces'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
	const slides: Slide[] | undefined = (await slideService.getAllSlides())?.data
	const texts: TextField[] | undefined = (await textsService.getAllTexts())
	const products: ProductWithInfo[] | undefined = (await productsService.getAllProducts())?.data
	const categories: Category[] | undefined = (await categoriesService.getAllCategories())?.data
	const admins: TAdmin[] | undefined = (await adminService.getAllAdmins())?.data

	return (
		<Admin
			slides={slides}
			texts={texts}
			products={products}
			categories={categories}
			admins={admins}
		/>
	)
}
