import { Admin } from '@prisma/client'
import { api } from './axios'

class AdminService {
	async auth(email: string, password: string) {
		return await api.post('/admin/auth', { email, password })
	}

	async getAllAdmins() {
		try {
			const res = await api.get<Admin[]>('/admin/all')
			if (res.status != 200) throw new Error('Помилка при отриманні адміністраторів')
			return res
		} catch {}
	}
}

export const adminService = new AdminService()
