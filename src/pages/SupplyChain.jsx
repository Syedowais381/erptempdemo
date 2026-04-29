import { useState, useEffect } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { supplyService } from '../services/supplyService'
import { formatCurrency, formatDate, cn } from '../utils/helpers'
import PageHeader from '../components/ui/PageHeader'
import DataTable from '../components/ui/DataTable'
import StatusBadge from '../components/ui/StatusBadge'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { Plus, Eye, Send, CheckCircle, Package } from 'lucide-react'

const SupplyChain = () => {
  const [purchaseOrders, setPurchaseOrders] = useState([])
  const [shipments, setShipments] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [pos, shps] = await Promise.all([
          supplyService.getPurchaseOrders(),
          supplyService.getShipments()
        ])
        setPurchaseOrders(pos)
        setShipments(shps)
      } catch (error) {
        console.error("Failed to fetch supply chain data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  if (isLoading && !purchaseOrders.length) return <LoadingSpinner />

  const PurchaseOrdersTab = () => (
    <div className="space-y-6 animate-reveal">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-muted">Manage your stock procurement and vendor orders.</p>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-colors">
          <Plus size={16} /> Create PO
        </button>
      </div>

      <DataTable 
        columns={[
          { header: 'PO Number', accessorKey: 'id', cell: (row) => <span className="font-medium">{row.id}</span> },
          { header: 'Supplier', accessorKey: 'supplier' },
          { header: 'Products', accessorKey: 'products', cell: (row) => `${row.products} items` },
          { header: 'Total Value', accessorKey: 'value', cell: (row) => formatCurrency(row.value) },
          { header: 'Status', accessorKey: 'status', cell: (row) => <StatusBadge status={row.status} /> },
          { header: 'Date', accessorKey: 'date', cell: (row) => formatDate(row.date) },
          { header: 'Actions', accessorKey: 'actions', cell: (row) => (
            <div className="flex items-center gap-2">
              <button className="p-1.5 hover:bg-gray-100 rounded-md text-muted hover:text-primary transition-colors" title="View">
                <Eye size={16} />
              </button>
              {row.status === 'Draft' && (
                <button className="p-1.5 hover:bg-primary/10 rounded-md text-muted hover:text-primary transition-colors" title="Send to Supplier">
                  <Send size={16} />
                </button>
              )}
              {row.status === 'Sent' && (
                <button className="p-1.5 hover:bg-success/10 rounded-md text-muted hover:text-success transition-colors" title="Mark as Received">
                  <CheckCircle size={16} />
                </button>
              )}
            </div>
          )},
        ]}
        data={purchaseOrders}
      />
    </div>
  )

  const Stepper = ({ status }) => {
    const steps = ['Booked', 'Pick Up', 'In Transit', 'Delivered']
    const currentIndex = steps.findIndex(s => s === status)
    
    return (
      <div className="flex items-center w-full max-w-xs">
        {steps.map((step, index) => {
          const isCompleted = index <= currentIndex
          const isLast = index === steps.length - 1
          
          return (
            <div key={step} className="flex items-center flex-1">
              <div className="relative flex flex-col items-center flex-1">
                <div className={cn(
                  "w-3 h-3 rounded-full border-2 z-10 bg-white",
                  isCompleted ? "border-primary bg-primary" : "border-border"
                )} />
                <div className="absolute top-4 w-16 text-center -translate-x-1/2 left-1/2">
                  <span className={cn("text-[10px] font-medium block truncate", isCompleted ? "text-foreground" : "text-muted")}>
                    {step}
                  </span>
                </div>
              </div>
              {!isLast && (
                <div className={cn(
                  "h-[2px] flex-1 w-full -ml-4 -mr-4",
                  index < currentIndex ? "bg-primary" : "bg-border"
                )} />
              )}
            </div>
          )
        })}
      </div>
    )
  }

  const ShipmentsTab = () => (
    <div className="space-y-6 animate-reveal">
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-muted">Track outgoing orders and deliveries to customers.</p>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-colors">
          <Package size={16} /> Book Shipment
        </button>
      </div>

      <DataTable 
        columns={[
          { header: 'Order ID', accessorKey: 'id', cell: (row) => <span className="font-medium">{row.id}</span> },
          { header: 'Customer', accessorKey: 'customer' },
          { header: 'Courier', accessorKey: 'courier' },
          { header: 'AWB Number', accessorKey: 'awb', cell: (row) => <span className="text-primary hover:underline cursor-pointer">{row.awb}</span> },
          { header: 'Status', accessorKey: 'status', cell: (row) => (
            <div className="py-2 h-12 w-64">
              <Stepper status={row.status} />
            </div>
          )},
          { header: 'Last Update', accessorKey: 'lastUpdate', cell: (row) => <span className="text-muted">{row.lastUpdate}</span> },
        ]}
        data={shipments}
      />
    </div>
  )

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Supply Chain" 
        subtitle="Manage vendors, purchase orders, and outbound shipments."
      />

      <Tabs.Root defaultValue="pos" className="flex flex-col">
        <Tabs.List className="flex border-b border-border mb-6">
          <Tabs.Trigger 
            value="pos" 
            className="px-6 py-3 text-sm font-medium text-muted hover:text-foreground data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary outline-none transition-all"
          >
            Purchase Orders
          </Tabs.Trigger>
          <Tabs.Trigger 
            value="shipments" 
            className="px-6 py-3 text-sm font-medium text-muted hover:text-foreground data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary outline-none transition-all"
          >
            Shipments
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="pos" className="outline-none">
          <PurchaseOrdersTab />
        </Tabs.Content>
        <Tabs.Content value="shipments" className="outline-none">
          <ShipmentsTab />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}

export default SupplyChain
