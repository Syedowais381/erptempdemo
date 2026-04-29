import { create } from 'zustand'

export const useUiStore = create((set) => ({
  sidebarCollapsed: false,
  activeModule: 'dashboard',
  
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),
  
  setActiveModule: (moduleName) => set({ activeModule: moduleName })
}))
