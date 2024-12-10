import { create } from 'zustand'

interface IHomeStore {
	currentSlide: number
	setCurrentSlide: (i: number) => void
}

export const useHomeStore = create<IHomeStore>(set => ({
	currentSlide: 0,
	setCurrentSlide: (i: number) => set({ currentSlide: i })
}))
