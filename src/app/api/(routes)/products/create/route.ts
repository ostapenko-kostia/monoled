import fs from 'fs/promises'
import { handleApiError } from '@/app/api/exceptions/handleApiError'
import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import Joi from 'joi'
import { ApiError } from '@/app/api/exceptions/apiError'
import slugify from '@sindresorhus/slugify'
import { checkIsAdmin } from '../../admin/auth/utils/checkIsAdmin'
import path from 'path'

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads', 'images')

const productSchema = Joi.object({
	name: Joi.string().min(1).required().messages({
		'string.empty': 'Name is required',
		'any.required': 'Name is required'
	}),
	price: Joi.number().positive().required().messages({
		'number.base': 'Price must be a number',
		'number.positive': 'Price must be greater than zero',
		'any.required': 'Price is required'
	}),
	description: Joi.string().min(1).required().messages({
		'string.empty': 'Description is required',
		'any.required': 'Description is required'
	}),
	categorySlug: Joi.string().min(1).required().messages({
		'string.empty': 'Category slug is required',
		'any.required': 'Category slug is required'
	}),
	info: Joi.object().optional(),
	modelUrl: Joi.string().optional(),
	isNew: Joi.boolean().default(false).optional()
})

async function generateUniqueSlug(slug: string): Promise<string> {
	let uniqueSlug = slug
	let counter = 1

	while (await prisma.product.findUnique({ where: { slug: uniqueSlug } })) {
		uniqueSlug = `${slug}-${counter}`
		counter++
	}

	return uniqueSlug
}

export async function POST(req: NextRequest) {
	try {
		const formData = await req.formData()
		const body = Object.fromEntries(formData)

		const productInfo = JSON.parse(body.productInfo as string)
		const images = formData.getAll('images') as File[]

		const { error, value } = productSchema.validate(productInfo, { abortEarly: false })

		if (error) {
			const errorDetails = error.details.map(err => err.message).join(', ')
			throw new ApiError(`Validation error: ${errorDetails}`, 400)
		}

		value.slug = slugify(value.name)

		value.slug = await generateUniqueSlug(value.slug)

		const isAdmin = checkIsAdmin(req)
		if (!isAdmin) throw new ApiError('You are not admin', 403)

		const savedImages: string[] = []

		for (const file of images) {
			if (file && file.type?.startsWith('image/')) {
				const savedPath = await saveFile(file)
				savedImages.push(savedPath)
			} else {
				throw new ApiError('Each image must be of type image/*', 400)
			}
		}

		value.images = savedImages

		const product = await prisma.product.create({ data: value })

		return NextResponse.json(
			{ ok: true, product },
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
