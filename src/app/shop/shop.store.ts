import { create } from 'zustand'
import { ISortingMethod } from './shop.types'

interface State {
	currentSortingId: ISortingMethod['id']
	setCurrentSortingId: (id: number) => void
	productsPerPage: number
	setProductPerPage: (quantity: number) => void
	currentShowMode: 'grid' | 'list'
	setCurrentShowMode: (showMode: 'grid' | 'list') => void
}

export const useShopStore = create<State>(set => ({
	currentSortingId: 1,
	setCurrentSortingId: id => set({ currentSortingId: id }),
	productsPerPage: 25,
	setProductPerPage: quantity => set({ productsPerPage: quantity }),
	currentShowMode: 'grid',
	setCurrentShowMode: showMode => set({ currentShowMode: showMode })
}))
