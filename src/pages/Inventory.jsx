import { useState, useEffect } from 'react'
import { inventoryService } from '../services/inventoryService'
import { formatCurrency, cn } from '../utils/helpers'
import PageHeader from '../components/ui/PageHeader'
import MetricCard from '../components/ui/MetricCard'
import DataTable from '../components/ui/DataTable'
import Modal from '../components/ui/Modal'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { Package, AlertTriangle, IndianRupee, Plus, Search, Filter, Edit, Trash2 } from 'lucide-react'

const Inventory = () => {
  const [products, setProducts] = useState([])
  const [stats, setStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [productsData, statsData] = await Promise.all([
          inventoryService.getProducts(),
          inventoryService.getStats()
        ])
        setProducts(productsData)
        setStats(statsData)
      } catch (error) {
        console.error("Failed to fetch inventory data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.sku.toLowerCase().includes(searchQuery.toLowerCase())
    if (!matchesSearch) return false
    
    if (filter === 'Low Stock') return p.stock > 0 && p.stock <= p.minThreshold
    if (filter === 'Out of Stock') return p.stock === 0
    if (filter === 'In Stock') return p.stock > p.minThreshold
    return true
  })

  if (isLoading && !stats) return <LoadingSpinner />

  const AddProductModal = () => (
    <Modal open={isModalOpen} onOpenChange={setIsModalOpen} title="Add New Product" description="Fill in the details to add a new product to your inventory.">
      <form className="space-y-4 mt-4" onSubmit={(e) => { e.preventDefault(); setIsModalOpen(false); }}>
        <div className="space-y-1">
          <label className="text-sm font-medium text-foreground">Product Name</label>
          <input type="text" required className="w-full px-3 py-2 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm" placeholder="e.g. Cotton Block Print Kurta" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">SKU</label>
            <input type="text" required className="w-full px-3 py-2 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm" placeholder="e.g. ZARA-KRT-001" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">Category</label>
            <select className="w-full px-3 py-2 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm">
              <option>Ethnic Wear</option>
              <option>Western Wear</option>
              <option>Accessories</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">Price (INR)</label>
            <input type="number" required className="w-full px-3 py-2 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">Initial Stock</label>
            <input type="number" required className="w-full px-3 py-2 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">Min Threshold</label>
            <input type="number" required className="w-full px-3 py-2 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">Supplier</label>
            <select className="w-full px-3 py-2 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary text-sm">
              <option>Jaipur Textiles</option>
              <option>Surat Fabrics Co</option>
              <option>Varanasi Weavers</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-foreground bg-gray-100 hover:bg-gray-200 transition-colors">Cancel</button>
          <button type="submit" className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-primary hover:bg-indigo-600 transition-colors">Add Product</button>
        </div>
      </form>
    </Modal>
  )

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Inventory Management" 
        subtitle="Manage your products, track stock levels, and coordinate with suppliers."
        action={
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            <Plus size={16} /> Add Product
          </button>
        }
      />

      {/* Stats Row */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-reveal">
          <MetricCard title="Total Products" value={stats.totalProducts} icon={Package} />
          <MetricCard title="Total Stock Value" value={formatCurrency(stats.totalValue)} icon={IndianRupee} colorClass="border-chart-2" />
          <MetricCard title="Low Stock Items" value={stats.lowStock} icon={AlertTriangle} colorClass="border-warning" />
          <MetricCard title="Out of Stock" value={stats.outOfStock} icon={AlertTriangle} colorClass="border-danger" />
        </div>
      )}

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-card p-4 rounded-xl border border-border animate-reveal delay-100">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input 
            type="text" 
            placeholder="Search products by name or SKU..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-muted hidden sm:block" />
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full sm:w-auto pl-3 pr-8 py-2 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          >
            <option value="All">All Products</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
            <option value="In Stock">In Stock</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="animate-reveal delay-200">
        <DataTable 
          columns={[
            { header: 'Product Name', accessorKey: 'name', cell: (row) => (
              <div>
                <p className="font-medium text-foreground">{row.name}</p>
                <p className="text-xs text-muted">{row.sku}</p>
              </div>
            )},
            { header: 'Category', accessorKey: 'category' },
            { header: 'Stock Level', accessorKey: 'stock', cell: (row) => {
              const ratio = Math.min(100, (row.stock / (row.minThreshold * 2)) * 100)
              const isLow = row.stock > 0 && row.stock <= row.minThreshold
              const isOut = row.stock === 0
              
              return (
                <div className="w-32">
                  <div className="flex justify-between text-xs mb-1">
                    <span className={cn("font-medium", isOut ? "text-danger" : isLow ? "text-warning" : "text-foreground")}>
                      {row.stock} in stock
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div 
                      className={cn("h-1.5 rounded-full transition-all", isOut ? "bg-danger" : isLow ? "bg-warning" : "bg-success")}
                      style={{ width: `${ratio}%` }}
                    />
                  </div>
                </div>
              )
            }},
            { header: 'Supplier', accessorKey: 'supplier' },
            { header: 'Price', accessorKey: 'price', cell: (row) => formatCurrency(row.price) },
            { header: 'Actions', accessorKey: 'actions', cell: (row) => (
              <div className="flex items-center gap-2">
                <button className="p-1.5 hover:bg-gray-100 rounded-md text-muted hover:text-primary transition-colors">
                  <Edit size={16} />
                </button>
                <button className="p-1.5 hover:bg-danger/10 rounded-md text-muted hover:text-danger transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            )},
          ]}
          data={filteredProducts}
        />
      </div>

      <AddProductModal />
    </div>
  )
}

export default Inventory
