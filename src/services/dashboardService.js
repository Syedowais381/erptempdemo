const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const dashboardService = {
  getMetrics: async () => {
    await delay(600)
    return {
      revenue: { value: 1245000, change: 12.5 },
      orders: { value: 342, change: 5.2 },
      employees: { value: 12, attendance: 95 },
      lowStock: { value: 4, change: -2 }
    }
  },
  
  getRevenueChart: async (period = '30D') => {
    await delay(600)
    // Mock chart data
    const data = []
    let base = 30000
    for(let i=1; i<=30; i++) {
      base += (Math.random() * 10000 - 3000)
      data.push({
        date: `2026-04-${i.toString().padStart(2, '0')}`,
        revenue: Math.floor(base)
      })
    }
    return data
  },
  
  getRecentOrders: async () => {
    await delay(500)
    return [
      { id: 'ORD-8001', customer: 'Priya Patel', amount: 4500, status: 'Delivered', date: '2026-04-29' },
      { id: 'ORD-8002', customer: 'Amit Kumar', amount: 12500, status: 'Processing', date: '2026-04-29' },
      { id: 'ORD-8003', customer: 'Sneha Reddy', amount: 2100, status: 'Shipped', date: '2026-04-28' },
      { id: 'ORD-8004', customer: 'Rajesh Singh', amount: 8900, status: 'Delivered', date: '2026-04-28' },
      { id: 'ORD-8005', customer: 'Neha Gupta', amount: 3450, status: 'Processing', date: '2026-04-27' },
    ]
  },
  
  getTopProducts: async () => {
    await delay(500)
    return [
      { id: 1, name: 'Cotton Block Print Kurta', unitsSold: 145, revenue: 217500 },
      { id: 2, name: 'Linen Blend Trousers', unitsSold: 98, revenue: 146000 },
      { id: 3, name: 'Silk Blend Saree', unitsSold: 64, revenue: 319360 },
      { id: 4, name: 'Indigo Print Shirt', unitsSold: 56, revenue: 83440 },
    ]
  },
  
  getAlerts: async () => {
    await delay(500)
    return {
      stock: [
        { id: 1, name: 'Cotton Block Print Kurta', currentStock: 5 },
        { id: 2, name: 'Embroidered Dupatta', currentStock: 2 },
      ],
      hr: [
        { id: 1, text: '5 leave requests pending' },
        { id: 2, text: 'Payroll due in 3 days' },
      ]
    }
  }
}
