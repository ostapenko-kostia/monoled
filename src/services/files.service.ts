import { api } from './axios'

class FileService {
	async deleteFile(title: string) {
		return await api.delete(`/storage/delete/${title}`)
	}

	async createFile(data: FormData) {
		return await api.post(`/storage/upload`, data, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
	}
}

export const fileService = new FileService()
