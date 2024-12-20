import { AdminDto } from '@/app/api/dtos/adminDto'
import { ApiError } from '@/app/api/exceptions/apiError'
import { handleApiError } from '@/app/api/exceptions/handleApiError'
import { prisma } from '@/prisma/prisma-client'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import { TOKEN } from '@/typing/enums'
import { tokenService } from './tokens'

export async function POST(req: Request) {
	try {
		// Перевірка Content-Type
		if (req.headers.get('Content-Type') !== 'application/json') {
			throw new ApiError('Invalid Content-Type. Expected application/json', 400)
		}

		// Отримання тіла запиту
		let body
		try {
			body = await req.json()
		} catch {
			throw new ApiError('Invalid JSON input', 400)
		}

		const { email, password } = body

		if (!email || !password || !email.length || !password.length) {
			throw new ApiError('Email or password is empty', 400)
		}

		// Реєстрація
		const userData = await loginFunc({ login: email, password })

		// Відповідь
		const res = NextResponse.json(userData, { status: 200 })
		res.cookies.set({
			name: TOKEN.ADMIN_ACCESS_TOKEN,
			value: userData.accessToken,
			httpOnly: true,
			path: '/',
			sameSite: 'lax',
			maxAge: 60 * 30
		})

		return res
	} catch (error) {
		return handleApiError(error)
	}
}

const loginFunc = async ({ login, password }: { login: string; password: string }) => {
	// check if admin exists
	const admin = await prisma.admin.findUnique({
		where: { login }
	})
	if (!admin) throw new ApiError('Admin not found', 400)

	// check if password is correct
	const isPasswordCorrect = await bcrypt.compare(password, admin.password)
	if (!isPasswordCorrect) throw new ApiError('Password is incorrect', 400)

	// create tokens
	const adminDto = new AdminDto(admin)
	const tokens = tokenService.generateAdminAccessToken({ ...adminDto })

	// Return
	return {
		...tokens,
		user: adminDto
	}
}
