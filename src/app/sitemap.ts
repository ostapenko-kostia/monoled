import { productsService } from '@/services/products.service'
import { ProductWithInfo } from '@/typing/interfaces'
import { NextResponse } from 'next/server'

export async function GET() {
	const products: ProductWithInfo[] | undefined = (await productsService.getAllProducts())?.data

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://lumineka.com.ua/</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>1.00</priority>
    </url>
    <url>
      <loc>https://lumineka.com.ua/product/</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>0.80</priority>
    </url>
    <url>
      <loc>https://lumineka.com.ua/shop</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>0.80</priority>
    </url>
    <url>
      <loc>https://lumineka.com.ua/about</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>0.70</priority>
    </url>
    <url>
      <loc>https://lumineka.com.ua/contact-us</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>0.70</priority>
    </url>
    ${products
			?.map(
				product => `
    <url>
      <loc>https://lumineka.com.ua/product/${product.slug}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <priority>0.80</priority>
    </url>`
			)
			.join('')}
  </urlset>`

	return NextResponse.json(sitemap, {
		headers: { 'Content-Type': 'application/xml' }
	})
}
