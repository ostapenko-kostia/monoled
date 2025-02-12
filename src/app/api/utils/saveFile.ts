import { TOKEN } from '@/typing/enums'
import { NextRequest } from 'next/server'
import { ApiError } from '../exceptions/apiError'
import axios from 'axios'

export async function saveFile(file: File, req: NextRequest): Promise<string> {
	try {
		const storageURL = process.env.NEXT_PUBLIC_STORAGE_URL
		const formData = new FormData()
		formData.append('file', file)
		const res = await axios.post(`${storageURL}/upload`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${req.cookies.get(TOKEN.ADMIN_ACCESS_TOKEN)?.value}`
			}
		})
		const fileUrl = res?.data?.fileUrl
		return storageURL + (fileUrl ?? '/')
	} catch (error) {
		throw new ApiError(`Error: ${error}`, 500)
	}
}
