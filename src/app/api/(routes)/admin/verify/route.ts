import jwt from 'jsonwebtoken'
import { handleApiError } from '@/app/api/exceptions/handleApiError'
import Joi from 'joi'
import { NextRequest, NextResponse } from 'next/server'
import { ApiError } from '@/app/api/exceptions/apiError'

const schema = Joi.object({
	token: Joi.string().min(1).required().messages({
		'string.empty': 'Token is required',
		'any.required': 'Token is required'
	})
})

export async function POST(request: NextRequest) {
	try {
		const body = await request.json()
		const { error, value } = schema.validate(await body)

		if (error) {
			const errorDetails = error.details.map((err: any) => err.message).join(', ')
			throw new ApiError(`Validation error: ${errorDetails}`, 400)
		}

		const data = jwt.verify(value?.token ?? '', process.env.JWT_ACCESS_SECRET as string)
		return NextResponse.json(data, { status: 200 })
	} catch (error) {
		return handleApiError(error)
	}
}
