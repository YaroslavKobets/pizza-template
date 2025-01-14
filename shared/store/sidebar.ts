import { create } from 'zustand'

interface State {
	isSidebarOpen: boolean
	toggleSidebar: () => void
}

export const useSidebarStore = create<State>(set => ({
	isSidebarOpen: false,
	toggleSidebar: () => set(state => ({ isSidebarOpen: !state.isSidebarOpen })),
}))
