import { handleApiError } from '@/app/api/exceptions/handleApiError'
import { NextRequest, NextResponse } from 'next/server'
import { checkIsAdmin } from '../../../admin/auth/utils/checkIsAdmin'
import { ApiError } from '@/app/api/exceptions/apiError'
import { prisma } from '@/prisma/prisma-client'
import { deleteFile } from '@/app/api/utils/deleteFile'

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ productId: string }> }
) {
	try {
		const productId = parseInt((await params).productId, 10)
		if (isNaN(productId)) throw new ApiError('Invalid product ID parameter', 400)

		const isAdmin = await checkIsAdmin(req)
		if (!isAdmin) throw new ApiError('You are not admin', 403)

		const product = await prisma.product.findUnique({
			where: { id: productId }
		})
		const productInfo = await prisma.productInfo.findMany({
			where: { productId }
		})

		if (!product) throw new ApiError('Product not found', 404)

		if (product.images && Array.isArray(product.images)) {
			for (const image of product.images) {
				if (image) {
					try {
						await deleteFile(image, req)
					} catch (error) {
						console.warn(`Failed to delete file: ${image}`, error)
					}
				}
			}
		}

		productInfo?.forEach(async info => {
			await prisma.productInfo.delete({ where: { id: info.id } })
		})
		await prisma.product.delete({ where: { id: productId } })

		return NextResponse.json({ ok: true }, { status: 200 })
	} catch (error) {
		return handleApiError(error)
	}
}
