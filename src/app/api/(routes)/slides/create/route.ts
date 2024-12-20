import { handleApiError } from '@/app/api/exceptions/handleApiError'
import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import Joi from 'joi'
import { ApiError } from '@/app/api/exceptions/apiError'
import { checkIsAdmin } from '../../admin/auth/utils/checkIsAdmin'

const slideSchema = Joi.object({
	background: Joi.string().min(1).required().messages({
		'string.empty': 'Background is required',
		'any.required': 'Background is required'
	}),
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
		const body = await req.json()
		const { error, value } = slideSchema.validate(body, { abortEarly: false })

		if (error) {
			const errorDetails = error.details.map(err => err.message).join(', ')
			throw new ApiError(`Validation error: ${errorDetails}`, 400)
		}

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
