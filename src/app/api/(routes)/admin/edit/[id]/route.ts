import { handleApiError } from '@/app/api/exceptions/handleApiError'
import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import Joi from 'joi'
import { ApiError } from '@/app/api/exceptions/apiError'
import bcrypt from 'bcrypt'
import { checkIsAdmin } from '../../../admin/auth/utils/checkIsAdmin'

const adminSchema = Joi.object({
	email: Joi.string().email().min(1).required().messages({
		'string.empty': 'Email is required',
		'any.required': 'Email is required'
	}),
	password: Joi.string().min(1).required().messages({
		'string.empty': 'Password is required',
		'any.required': 'Password is required'
	})
})

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	try {
		const id = Number((await params).id)
		const body = await req.json()
		const { error, value } = adminSchema.validate(body, { abortEarly: false })

		if (error) {
			const errorDetails = error.details.map(err => err.message).join(', ')
			throw new ApiError(`Validation error: ${errorDetails}`, 400)
		}

		const isAdmin = checkIsAdmin(req)

		if (!isAdmin) throw new ApiError('You are not admin', 403)

		value.password = await bcrypt.hash(value.password, 3)

		const admin = await prisma.admin.update({
			where: { id },
			data: { login: value.email, password: value.password }
		})

		return NextResponse.json(
			{ ok: true, admin },
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
