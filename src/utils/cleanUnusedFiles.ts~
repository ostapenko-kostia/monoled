#!/usr/bin/env node


import fs from 'fs/promises'
import path from 'path'
import { prisma } from '@/prisma/prisma-client'

const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads', 'images')

async function cleanUnusedFiles() {
	const filesInDb = await prisma.product.findMany({
		select: { images: true }
	})
	const usedFiles = new Set(filesInDb.flatMap(product => product.images))

	const allFiles = await fs.readdir(UPLOADS_DIR)
	for (const file of allFiles) {
		if (!usedFiles.has(file)) {
			const filePath = path.join(UPLOADS_DIR, file)
			try {
				await fs.unlink(filePath)
				console.log(`Deleted unused file: ${filePath}`)
			} catch (error) {
				console.error(`Failed to delete unused file ${filePath}:`, error)
			}
		}
	}
}

cleanUnusedFiles()
