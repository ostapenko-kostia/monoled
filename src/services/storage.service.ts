import { IFile } from '@/app/admin/_components/admin-storage/admin-storage.typing'
import { api } from './axios'
import { cookies } from 'next/headers'
import { TOKEN } from '@/typing/enums'

class StorageService {
	async getAllFiles() {
		try {
			const res = await api.get<IFile[]>(`${process.env.NEXT_PUBLIC_STORAGE_URL}`, {
				headers: {
					Authorization: `Bearer ${(await cookies()).get(TOKEN.ADMIN_ACCESS_TOKEN)?.value}`
				}
			})
			if (res.status != 200) throw new Error('Помилка при отриманні файлів')
			return res
		} catch {}
	}
}

export const storageService = new StorageService()
