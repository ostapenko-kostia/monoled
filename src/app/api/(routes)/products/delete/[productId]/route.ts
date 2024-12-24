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
	{ params }: { params: { productId: string } }
) {
	try {
		const productId = parseInt(params.productId, 10);
		if (isNaN(productId)) throw new ApiError('Invalid product ID parameter', 400);

		const isAdmin = await checkIsAdmin(req);
		if (!isAdmin) throw new ApiError('You are not admin', 403);

		const product = await prisma.product.findUnique({
			where: { id: productId },
		});

		if (!product) throw new ApiError('Product not found', 404);

		if (product.images && Array.isArray(product.images)) {
			for (const image of product.images) {
				if (image) {
					const imagePath = path.join(DIR, image);
					try {
						await fs.unlink(imagePath);
						console.log(`File deleted: ${imagePath}`);
					} catch (error) {
						console.warn(`Failed to delete file: ${imagePath}`, error);
					}
				}
			}
		}

		await prisma.product.delete({ where: { id: productId } });

		return NextResponse.json({ ok: true }, { status: 200 });
	} catch (error) {
		return handleApiError(error);
	}
}
