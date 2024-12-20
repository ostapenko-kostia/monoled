import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { TOKEN } from './typing/enums'

const protectedRoutes = ['/admin', '/admin/:path*']

export function middleware(request: NextRequest) {
	if (protectedRoutes.includes(request.nextUrl.pathname)) {
		const token = request.cookies.get(TOKEN.ADMIN_ACCESS_TOKEN)?.value
		if (token) return NextResponse.next()
		return NextResponse.redirect(new URL('/admin-login', request.url))
	}

	const isLoginPage = request.nextUrl.pathname.includes('admin-login')

	if (isLoginPage) {
		const token = request.cookies.get(TOKEN.ADMIN_ACCESS_TOKEN)?.value
		if (!token) return NextResponse.next()
		return NextResponse.redirect(new URL('/admin', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/admin/:path*', '/admin-login/:path*']
}
