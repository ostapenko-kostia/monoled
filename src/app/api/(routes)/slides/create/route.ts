import fs from 'fs/promises'
import { handleApiError } from '@/app/api/exceptions/handleApiError'
import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import Joi from 'joi'
import { ApiError } from '@/app/api/exceptions/apiError'
import { checkIsAdmin } from '../../admin/auth/utils/checkIsAdmin'
import path from 'path'
import slugify from '@sindresorhus/slugify'

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads', 'images')

const slideSchema = Joi.object({
	text: Joi.string().min(1).required().messages({
		'string.empty': 'Text is required',
		'any.required': 'Text is required'
	}),
	url: Joi.string().min(1).required().messages({
		'string.empty': 'Url is required',
		'any.required': 'Url is required'
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

		const isAdmin = checkIsAdmin(req)
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
	const fileName = `${Date.now()}-${slugify(file.name)}`
	const targetPath = path.join(UPLOADS_DIR, fileName)

	try {
		await fs.mkdir(path.dirname(targetPath), { recursive: true })

		await fs.writeFile(targetPath, Buffer.from(await file.arrayBuffer()))

		return path.join('/uploads', 'images', fileName).replace(/\\/g, '/')
	} catch (error) {
		throw new ApiError(`Failed to save file: ${fileName}`, 500)
	}
}
