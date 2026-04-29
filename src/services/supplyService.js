const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const supplyService = {
  getPurchaseOrders: async () => {
    await delay(700)
    return [
      { id: 'PO-2026-041', supplier: 'Jaipur Textiles', products: 4, value: 125000, status: 'Draft', date: '2026-04-29' },
      { id: 'PO-2026-040', supplier: 'Surat Fabrics Co', products: 12, value: 340000, status: 'Sent', date: '2026-04-25' },
      { id: 'PO-2026-039', supplier: 'Varanasi Weavers', products: 2, value: 85000, status: 'Received', date: '2026-04-18' },
    ]
  },
  
  getShipments: async () => {
    await delay(600)
    return [
      { id: 'ORD-8001', customer: 'Priya Patel', courier: 'Delhivery', awb: 'DEL123456789', status: 'In Transit', lastUpdate: '2 hours ago' },
      { id: 'ORD-8002', customer: 'Amit Kumar', courier: 'BlueDart', awb: 'BD987654321', status: 'Pick Up', lastUpdate: '5 hours ago' },
      { id: 'ORD-8003', customer: 'Sneha Reddy', courier: 'XpressBees', awb: 'XB555666777', status: 'Delivered', lastUpdate: '1 day ago' },
    ]
  }
}
