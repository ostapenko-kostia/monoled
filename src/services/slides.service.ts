import { Slide } from '@prisma/client'
import { api } from './axios'

class SlideService {
	async getAllSlides() {
		try {
			const res = await api.get<Slide[]>('/slides/all')
			if (res.status != 200) throw new Error('Помилка при отриманні слайдів')
			return res
		} catch {}
	}
}

export const slideService = new SlideService()
