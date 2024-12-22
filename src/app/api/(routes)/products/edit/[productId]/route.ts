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

		const isAdmin = checkIsAdmin(req)
		if (!isAdmin) throw new ApiError('You are not admin', 403)

		if (productInfo.name && productInfo.name.length) {
			productInfo.slug = slugify(productInfo.name)
			productInfo.slug = await generateUniqueSlug(productInfo.slug)
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

			productInfo.images = savedImages
		}
		const product = await prisma.product.update({ where: { id: Number(productId) }, data: productInfo })

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
