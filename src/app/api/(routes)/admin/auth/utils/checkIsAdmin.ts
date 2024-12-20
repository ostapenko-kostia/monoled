import jwt from 'jsonwebtoken';
import { TOKEN } from '@/typing/enums';
import { NextRequest } from 'next/server';

export function checkIsAdmin(req: NextRequest): boolean {
	try {
		const token = req.cookies.get(TOKEN.ADMIN_ACCESS_TOKEN)?.value;

		if (!token) {
			console.error('Token is missing or undefined');
			return false;
		}

		const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string) as { login: string } | null;

		if (!decoded || !decoded.login) {
			console.error('Decoded token is invalid or missing login');
			return false;
		}

		return true; 
	} catch (error: any) {
		console.error('Error verifying token:', error.message);
		return false; 
	}
}
