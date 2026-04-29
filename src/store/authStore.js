import { create } from 'zustand'

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  businessConfig: {
    activeModules: ['dashboard', 'inventory', 'hr', 'supply', 'crm'],
  },
  
  login: (userData, token) => set({ 
    user: userData, 
    token, 
    isAuthenticated: true 
  }),
  
  logout: () => set({ 
    user: null, 
    token: null, 
    isAuthenticated: false 
  }),
  
  completeOnboarding: () => set((state) => ({
    user: { ...state.user, onboardingComplete: true }
  })),

  setBusinessConfig: (config) => set((state) => ({
    businessConfig: { ...state.businessConfig, ...config }
  }))
}))
