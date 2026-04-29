const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const inventoryService = {
  getProducts: async () => {
    await delay(800)
    return [
      { id: 1, name: 'Cotton Block Print Kurta', sku: 'ZARA-KRT-001', category: 'Ethnic Wear', stock: 5, minThreshold: 10, supplier: 'Jaipur Textiles', price: 1500 },
      { id: 2, name: 'Linen Blend Trousers', sku: 'ZARA-TRS-002', category: 'Western Wear', stock: 45, minThreshold: 20, supplier: 'Surat Fabrics Co', price: 1490 },
      { id: 3, name: 'Silk Blend Saree', sku: 'ZARA-SAR-001', category: 'Ethnic Wear', stock: 12, minThreshold: 15, supplier: 'Varanasi Weavers', price: 4990 },
      { id: 4, name: 'Indigo Print Shirt', sku: 'ZARA-SHT-003', category: 'Western Wear', stock: 32, minThreshold: 15, supplier: 'Jaipur Textiles', price: 1490 },
      { id: 5, name: 'Embroidered Dupatta', sku: 'ZARA-DUP-001', category: 'Accessories', stock: 2, minThreshold: 25, supplier: 'Varanasi Weavers', price: 890 },
      { id: 6, name: 'Cotton Maxi Dress', sku: 'ZARA-DRS-004', category: 'Western Wear', stock: 0, minThreshold: 10, supplier: 'Surat Fabrics Co', price: 2490 },
    ]
  },
  
  getStats: async () => {
    await delay(600)
    return {
      totalProducts: 145,
      totalValue: 845000,
      lowStock: 4,
      outOfStock: 1
    }
  }
}
