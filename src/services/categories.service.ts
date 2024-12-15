import { Category } from '@prisma/client'
import { api } from './axios'

class CategoriesService {
	async getAllCategories() {
		try {
			const res = await api.get<Category[]>('/categories/all')
			if (res.status != 200) throw new Error('Помилка при отриманні категорій')
			return res
		} catch {}
	}
}

export const categoriesService = new CategoriesService()
