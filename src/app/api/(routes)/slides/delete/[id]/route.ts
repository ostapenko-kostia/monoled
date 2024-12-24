import { handleApiError } from '@/app/api/exceptions/handleApiError'
import { NextRequest, NextResponse } from 'next/server'
import { checkIsAdmin } from '../../../admin/auth/utils/checkIsAdmin'
import { ApiError } from '@/app/api/exceptions/apiError'
import { prisma } from '@/prisma/prisma-client'
import fs from 'fs/promises'
import path from 'path'

const DIR = path.join(process.cwd(), 'public');

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const id = parseInt((await params).id, 10);
		if (isNaN(id)) throw new ApiError('Invalid ID parameter', 400);

		const isAdmin = await checkIsAdmin(req);
		if (!isAdmin) throw new ApiError('You are not admin', 403);

		const slide = await prisma.slide.findUnique({ where: { id } });
		if (!slide) throw new ApiError('Slide not found', 404);

		if (slide.background) {
			const imagePath = path.join(DIR, slide.background);
			try {
				await fs.unlink(imagePath);
				console.log(`File deleted: ${imagePath}`);
			} catch (error) {
				console.warn(`Failed to delete file: ${imagePath}`, error);
			}
		}

		await prisma.slide.delete({ where: { id } });

		return NextResponse.json({ ok: true }, { status: 200 });
	} catch (error) {
		return handleApiError(error);
	}
}
