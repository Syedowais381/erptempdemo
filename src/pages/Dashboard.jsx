import { useState, useEffect } from 'react'
import { dashboardService } from '../services/dashboardService'
import { formatCurrency, cn } from '../utils/helpers'
import MetricCard from '../components/ui/MetricCard'
import DataTable from '../components/ui/DataTable'
import StatusBadge from '../components/ui/StatusBadge'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, ShoppingBag, Users, AlertTriangle, ChevronRight, Plus } from 'lucide-react'

const Dashboard = () => {
  const [metrics, setMetrics] = useState(null)
  const [chartData, setChartData] = useState([])
  const [recentOrders, setRecentOrders] = useState([])
  const [topProducts, setTopProducts] = useState([])
  const [alerts, setAlerts] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [chartPeriod, setChartPeriod] = useState('30D')

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [metricsData, chart, orders, products, alertsData] = await Promise.all([
          dashboardService.getMetrics(),
          dashboardService.getRevenueChart(chartPeriod),
          dashboardService.getRecentOrders(),
          dashboardService.getTopProducts(),
          dashboardService.getAlerts()
        ])
        setMetrics(metricsData)
        setChartData(chart)
        setRecentOrders(orders)
        setTopProducts(products)
        setAlerts(alertsData)
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [chartPeriod])

  if (isLoading && !metrics) return <LoadingSpinner />

  return (
    <div className="space-y-6">
      {/* Hero Metrics Row */}
      {metrics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-reveal">
          <MetricCard 
            title="Total Revenue" 
            value={formatCurrency(metrics.revenue.value)} 
            change={metrics.revenue.change}
            icon={TrendingUp}
            colorClass="border-primary"
          />
          <MetricCard 
            title="Total Orders" 
            value={metrics.orders.value} 
            change={metrics.orders.change}
            icon={ShoppingBag}
            colorClass="border-chart-2"
          />
          <MetricCard 
            title="Active Employees" 
            value={metrics.employees.value} 
            change={metrics.employees.attendance}
            icon={Users}
            colorClass="border-chart-3"
          />
          <MetricCard 
            title="Low Stock Alerts" 
            value={metrics.lowStock.value} 
            change={metrics.lowStock.change}
            icon={AlertTriangle}
            colorClass="border-danger"
          />
        </div>
      )}

      {/* Revenue Chart */}
      <div className="bg-card rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08)] p-6 border border-border animate-reveal delay-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">Revenue Overview</h2>
            <p className="text-sm text-muted">Your earnings over time</p>
          </div>
          <div className="flex bg-gray-100 p-1 rounded-lg">
            {['7D', '30D', '90D', '1Y'].map(period => (
              <button
                key={period}
                onClick={() => setChartPeriod(period)}
                className={cn(
                  "px-4 py-1.5 text-xs font-medium rounded-md transition-all",
                  chartPeriod === period ? "bg-white text-foreground shadow-sm" : "text-muted hover:text-foreground"
                )}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border)" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-muted)' }} dy={10} tickFormatter={(val) => val.substring(8, 10)} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--color-muted)' }} tickFormatter={(val) => `₹${val/1000}k`} />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-card)' }}
                formatter={(value) => [formatCurrency(value), 'Revenue']}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Area type="monotone" dataKey="revenue" stroke="var(--color-primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-reveal delay-200">
        <div className="lg:col-span-2 bg-card rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-foreground">Recent Orders</h2>
            <button className="text-sm font-medium text-primary hover:underline flex items-center">
              View all <ChevronRight size={16} />
            </button>
          </div>
          <DataTable 
            columns={[
              { header: 'Order ID', accessorKey: 'id', cell: (row) => <span className="font-medium">{row.id}</span> },
              { header: 'Customer', accessorKey: 'customer' },
              { header: 'Amount', accessorKey: 'amount', cell: (row) => formatCurrency(row.amount) },
              { header: 'Status', accessorKey: 'status', cell: (row) => <StatusBadge status={row.status} /> },
              { header: 'Date', accessorKey: 'date' },
            ]}
            data={recentOrders}
          />
        </div>

        <div className="bg-card rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-border p-6">
          <h2 className="text-lg font-bold text-foreground mb-6">Top Products</h2>
          <div className="space-y-6">
            {topProducts.map((product, index) => (
              <div key={product.id}>
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">{product.name}</p>
                    <p className="text-xs text-muted">{product.unitsSold} units sold</p>
                  </div>
                  <p className="text-sm font-bold text-foreground">{formatCurrency(product.revenue)}</p>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${Math.max(10, 100 - (index * 20))}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row: Alerts */}
      {alerts && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-reveal delay-300">
          <div className="bg-card rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-border p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-danger/10 flex items-center justify-center text-danger">
                <AlertTriangle size={16} />
              </div>
              <h2 className="text-lg font-bold text-foreground">Low Stock Alerts</h2>
            </div>
            <div className="space-y-4">
              {alerts.stock.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-border">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.name}</p>
                    <p className="text-xs text-danger font-medium mt-1">Only {item.currentStock} left in stock</p>
                  </div>
                  <button className="flex items-center gap-1 px-3 py-1.5 bg-white border border-border rounded-lg text-xs font-medium text-foreground hover:bg-gray-50 transition-colors">
                    <Plus size={14} /> Create PO
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.08)] border border-border p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-lg bg-warning/10 flex items-center justify-center text-warning">
                <Users size={16} />
              </div>
              <h2 className="text-lg font-bold text-foreground">HR Alerts</h2>
            </div>
            <div className="space-y-4">
              {alerts.hr.map(item => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-border">
                  <p className="text-sm font-medium text-foreground">{item.text}</p>
                  <button className="px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-medium hover:bg-indigo-600 transition-colors">
                    Review
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
