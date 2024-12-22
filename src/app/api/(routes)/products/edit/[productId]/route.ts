import fs from 'fs/promises'
import { handleApiError } from '@/app/api/exceptions/handleApiError'
import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import Joi from 'joi'
import { ApiError } from '@/app/api/exceptions/apiError'
import slugify from '@sindresorhus/slugify'
import { checkIsAdmin } from '../../../admin/auth/utils/checkIsAdmin'
import path from 'path'

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads', 'images')

const productSchema = Joi.object({
	name: Joi.string(),
	price: Joi.number().positive(),
	description: Joi.string(),
	modelUrl: Joi.string(),
	info: Joi.object(),
	categorySlug: Joi.string(),
	isNew: Joi.boolean().default(false)
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

export async function PUT(
	req: NextRequest,
	{ params }: { params: Promise<{ productId: string }> }
) {
	try {
		const { productId } = await params
		const formData = await req.formData()
		const body = Object.fromEntries(formData)

		const productInfo = JSON.parse(body.productInfo as string)
		const images = formData.getAll('images') as File[]

		const { error, value } = productSchema.validate(productInfo, { abortEarly: false })

		if (error) {
			const errorDetails = error.details.map(err => err.message).join(', ')
			throw new ApiError(`Validation error: ${errorDetails}`, 400)
		}

		const isAdmin = checkIsAdmin(req)
		if (!isAdmin) throw new ApiError('You are not admin', 403)

		if (value.name && value.name.length) {
			value.slug = slugify(value.name)
			value.slug = await generateUniqueSlug(value.slug)
		}

		if (images && images.length) {
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
		}
		const product = await prisma.product.update({ where: { id: Number(productId) }, data: value })

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