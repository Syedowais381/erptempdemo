import { useState, useEffect } from 'react'
import { crmService } from '../services/crmService'
import { formatCurrency, formatDate } from '../utils/helpers'
import PageHeader from '../components/ui/PageHeader'
import MetricCard from '../components/ui/MetricCard'
import DataTable from '../components/ui/DataTable'
import Modal from '../components/ui/Modal'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { Users, Briefcase, IndianRupee, UserPlus, Eye, Mail } from 'lucide-react'

const CRM = () => {
  const [customers, setCustomers] = useState([])
  const [stats, setStats] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCustomer, setSelectedCustomer] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [customersData, statsData] = await Promise.all([
          crmService.getCustomers(),
          crmService.getStats()
        ])
        setCustomers(customersData)
        setStats(statsData)
      } catch (error) {
        console.error("Failed to fetch CRM data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  if (isLoading && !stats) return <LoadingSpinner />

  const CustomerModal = () => (
    <Modal open={!!selectedCustomer} onOpenChange={() => setSelectedCustomer(null)} title="Customer Profile">
      {selectedCustomer && (
        <div className="space-y-6 mt-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-2xl">
              {selectedCustomer.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <h3 className="font-bold text-lg text-foreground">{selectedCustomer.name}</h3>
              <p className="text-muted text-sm flex items-center gap-1">
                <Mail size={14} /> {selectedCustomer.email}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-border">
              <p className="text-xs text-muted mb-1">Lifetime Value</p>
              <p className="text-lg font-bold text-foreground">{formatCurrency(selectedCustomer.totalSpend)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-border">
              <p className="text-xs text-muted mb-1">Total Orders</p>
              <p className="text-lg font-bold text-foreground">{selectedCustomer.totalOrders}</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-3">Order History Overview</h4>
            <div className="space-y-3">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="flex justify-between items-center p-3 bg-white border border-border rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Order #ORD-{8000 + i}</p>
                    <p className="text-xs text-muted">{formatDate(new Date(Date.now() - i * 86400000 * 5).toISOString())}</p>
                  </div>
                  <p className="text-sm font-semibold">{formatCurrency(Math.floor(Math.random() * 5000) + 1000)}</p>
                </div>
              )).slice(0, selectedCustomer.totalOrders)}
            </div>
          </div>
        </div>
      )}
    </Modal>
  )

  const SourceBadge = ({ source }) => {
    let color = "bg-gray-100 text-gray-800"
    if (source === 'Shopify') color = "bg-[#95BF47]/10 text-[#95BF47]"
    else if (source === 'Zoho') color = "bg-[#0000FF]/10 text-[#0000FF]"
    else if (source === 'Manual') color = "bg-primary/10 text-primary"

    return (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${color}`}>
        {source}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Customer Relationship" 
        subtitle="Manage your customer base, track lifetime value, and view order histories."
      />

      {/* Stats Row */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-reveal">
          <MetricCard title="Total Customers" value={stats.totalCustomers} icon={Users} />
          <MetricCard title="Active Deals" value={stats.activeDeals} icon={Briefcase} colorClass="border-chart-2" />
          <MetricCard title="Revenue from CRM" value={formatCurrency(stats.revenueFromCrm)} icon={IndianRupee} colorClass="border-success" />
          <MetricCard title="New This Month" value={stats.newThisMonth} icon={UserPlus} colorClass="border-primary" />
        </div>
      )}

      {/* Customers Table */}
      <div className="bg-card rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-border p-6 animate-reveal delay-100">
        <h2 className="text-lg font-bold text-foreground mb-6">Customer Directory</h2>
        <DataTable 
          columns={[
            { header: 'Name', accessorKey: 'name', cell: (row) => (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-xs">
                  {row.name.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="font-medium text-foreground">{row.name}</span>
              </div>
            )},
            { header: 'Email', accessorKey: 'email', cell: (row) => <span className="text-muted">{row.email}</span> },
            { header: 'Total Orders', accessorKey: 'totalOrders' },
            { header: 'Total Spend', accessorKey: 'totalSpend', cell: (row) => formatCurrency(row.totalSpend) },
            { header: 'Last Order Date', accessorKey: 'lastOrder', cell: (row) => formatDate(row.lastOrder) },
            { header: 'Source', accessorKey: 'source', cell: (row) => <SourceBadge source={row.source} /> },
            { header: 'Actions', accessorKey: 'actions', cell: (row) => (
              <button 
                onClick={() => setSelectedCustomer(row)}
                className="flex items-center gap-1 text-primary hover:underline text-sm font-medium"
              >
                <Eye size={16} /> View
              </button>
            )},
          ]}
          data={customers}
        />
      </div>

      <CustomerModal />
    </div>
  )
}

export default CRM
