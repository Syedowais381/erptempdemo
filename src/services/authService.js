// Mocking API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const authService = {
  login: async (credentials) => {
    await delay(1000)
    // Mock successful response
    if (credentials.email && credentials.password) {
      return {
        token: 'mock-jwt-token-12345',
        user: {
          id: 1,
          name: 'Rahul Sharma',
          email: credentials.email,
          businessName: 'Zara Clothing Co.',
          role: 'Admin',
          onboardingComplete: true
        }
      }
    }
    throw new Error('Invalid credentials')
  },
  
  register: async (data) => {
    await delay(1000)
    return {
      token: 'mock-jwt-token-67890',
      user: {
        id: 2,
        name: data.fullName,
        email: data.email,
        businessName: data.businessName,
        role: 'Admin',
        onboardingComplete: false
      }
    }
  }
}
