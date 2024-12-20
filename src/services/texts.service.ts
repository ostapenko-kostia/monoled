import { TextField } from '@prisma/client'
import { api } from './axios'

class TextsService {
	async getAllTexts() {
		try {
			const res = await api.get<TextField[]>('/texts/all')
			if (res.status != 200) throw new Error('Помилка при отриманні данних')
			return res
		} catch {}
	}
}

export const textsService = new TextsService()
