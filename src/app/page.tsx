import { Home } from '@/components/home/home'
import { slideService } from '@/services/slides.service'
import { textsService } from '@/services/texts.service'
import { Slide, TextField } from '@prisma/client'

export const revalidate = 180

export default async function HomePage() {
	const slides: Slide[] | undefined = (await slideService.getAllSlides())?.data
	const texts: TextField[] | undefined = (await textsService.getAllTexts())

	return <Home slides={slides} />
}
