import { handleApiError } from '@/app/api/exceptions/handleApiError'
import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import Joi from 'joi'
import { ApiError } from '@/app/api/exceptions/apiError'
import slugify from '@sindresorhus/slugify';
import { checkIsAdmin } from '../../admin/auth/utils/checkIsAdmin'

const productSchema = Joi.object({
	name: Joi.string().min(1).required().messages({
		'string.empty': 'Name is required',
		'any.required': 'Name is required'
	}),
	images: Joi.array().items(Joi.string().required()).min(1).required().messages({
		'array.min': 'At least one image is required'
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
	modelUrl: Joi.string().required().messages({
		'any.required': 'Model URL is required'
	}),
	info: Joi.object().min(1),
	categorySlug: Joi.string().min(1).required().messages({
		'string.empty': 'Category slug is required',
		'any.required': 'Category slug is required'
	}),
  isNew: Joi.boolean().default(false)
})

export async function POST(req: NextRequest) {
	try {
		const body = await req.json()
		const { error, value } = productSchema.validate(body, { abortEarly: false })

		if (error) {
			const errorDetails = error.details.map(err => err.message).join(', ')
			throw new ApiError(`Validation error: ${errorDetails}`, 400)
		}

		value.slug = slugify(value.name)

    const isAdmin = checkIsAdmin(req)

    if(!isAdmin) throw new ApiError('You are not admin', 403)

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
