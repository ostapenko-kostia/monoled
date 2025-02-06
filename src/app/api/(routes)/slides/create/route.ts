import { handleApiError } from '@/app/api/exceptions/handleApiError'
import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import Joi from 'joi'
import { ApiError } from '@/app/api/exceptions/apiError'
import { checkIsAdmin } from '../../admin/auth/utils/checkIsAdmin'
import { api } from '@/services/axios'

const slideSchema = Joi.object({
	text: Joi.string().min(1).required().messages({
		'string.empty': 'Text is required',
		'any.required': 'Text is required'
	}),
	url: Joi.string().min(1).required().messages({
		'string.empty': 'Url is required',
		'any.required': 'Url is required'
	}),
	device: Joi.string().valid('MOBILE', 'DESKTOP').required().messages({
		'string.empty': 'Device is required',
		'any.required': 'Device is required',
		'any.valid': 'Device must be MOBILE or DESKTOP'
	})
})

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData()
		const body = Object.fromEntries(formData)

		const productInfo = JSON.parse(body.info as string)
		const background = formData.get('background') as File

		const { error, value } = slideSchema.validate(productInfo, { abortEarly: false })

		if (error) {
			const errorDetails = error.details.map(err => err.message).join(', ')
			throw new ApiError(`Validation error: ${errorDetails}`, 400)
		}

		let savedImage: string = ''

		if (background && background.type?.startsWith('image/')) {
			const savedPath = await saveFile(background)
			savedImage = savedPath
		} else {
			throw new ApiError('Each image must be of type image/*', 400)
		}

		value.background = savedImage

		const isAdmin = await checkIsAdmin(req)
		if (!isAdmin) throw new ApiError('You are not admin', 403)

		const slide = await prisma.slide.create({ data: value })

		return NextResponse.json(
			{ ok: true, slide },
			{
				status: 200,
				headers: {
					'Content-Type': 'application/json'
				}
			}
		)
	} catch (error) {
		return handleApiError(error)
	}
}

async function saveFile(file: File): Promise<string> {
	try {
		const storageURL = process.env.NEXT_PUBLIC_STORAGE_URL
		const formData = new FormData()
		formData.append('image', file)
		const fileUrl = (
			await api.post(`${storageURL}/upload`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' }
			})
		)?.data?.fileUrl
		return storageURL + (fileUrl ?? '/')
	} catch (error) {
		throw new ApiError(`Failed to save file: ${file.name}`, 500)
	}
}
