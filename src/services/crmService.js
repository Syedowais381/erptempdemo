const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const crmService = {
  getCustomers: async () => {
    await delay(700)
    return [
      { id: 'CUST-001', name: 'Priya Patel', email: 'priya.p@example.com', totalOrders: 12, totalSpend: 45000, lastOrder: '2026-04-29', source: 'Shopify' },
      { id: 'CUST-002', name: 'Amit Kumar', email: 'amit.k@example.com', totalOrders: 3, totalSpend: 18500, lastOrder: '2026-04-29', source: 'Manual' },
      { id: 'CUST-003', name: 'Sneha Reddy', email: 'sneha.r@example.com', totalOrders: 5, totalSpend: 12100, lastOrder: '2026-04-28', source: 'Zoho' },
      { id: 'CUST-004', name: 'Rajesh Singh', email: 'rajesh.s@example.com', totalOrders: 1, totalSpend: 8900, lastOrder: '2026-04-28', source: 'Shopify' },
      { id: 'CUST-005', name: 'Neha Gupta', email: 'neha.g@example.com', totalOrders: 8, totalSpend: 32450, lastOrder: '2026-04-27', source: 'Shopify' },
    ]
  },
  
  getStats: async () => {
    await delay(500)
    return {
      totalCustomers: 1245,
      activeDeals: 45,
      revenueFromCrm: 845000,
      newThisMonth: 128
    }
  }
}
