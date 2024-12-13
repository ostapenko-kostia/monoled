import { Category } from '@prisma/client'
import { api } from './axios'

class CategoriesService {
	async getAllCategories() {
		return await api.get<Category[]>('/categories/all')
	}
}

export const categoriesService = new CategoriesService()
