import { useState, useEffect } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { hrService } from '../services/hrService'
import { formatCurrency, cn } from '../utils/helpers'
import PageHeader from '../components/ui/PageHeader'
import DataTable from '../components/ui/DataTable'
import StatusBadge from '../components/ui/StatusBadge'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import MetricCard from '../components/ui/MetricCard'
import { Users, Calendar, IndianRupee, Edit, Download, ChevronLeft, ChevronRight, Play } from 'lucide-react'

const HR = () => {
  const [employees, setEmployees] = useState([])
  const [attendanceStats, setAttendanceStats] = useState(null)
  const [payroll, setPayroll] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const [empData, attData, payData] = await Promise.all([
          hrService.getEmployees(),
          hrService.getAttendanceStats(),
          hrService.getPayroll()
        ])
        setEmployees(empData)
        setAttendanceStats(attData)
        setPayroll(payData)
      } catch (error) {
        console.error("Failed to fetch HR data:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  if (isLoading && !employees.length) return <LoadingSpinner />

  // Render Employee Cards
  const EmployeesTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-reveal">
      {employees.map(emp => (
        <div key={emp.id} className="bg-card rounded-xl border border-border p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)] flex flex-col group">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                {emp.initials}
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{emp.name}</h3>
                <p className="text-sm text-muted">{emp.role}</p>
              </div>
            </div>
            <button className="p-2 text-muted hover:text-primary opacity-0 group-hover:opacity-100 transition-all">
              <Edit size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-auto pt-4 border-t border-border/50">
            <div>
              <p className="text-xs text-muted mb-1">Department</p>
              <p className="text-sm font-medium">{emp.department}</p>
            </div>
            <div>
              <p className="text-xs text-muted mb-1">Status</p>
              <StatusBadge status={emp.status} />
            </div>
            <div>
              <p className="text-xs text-muted mb-1">Salary</p>
              <p className="text-sm font-medium">{formatCurrency(emp.salary)}/mo</p>
            </div>
            <div>
              <p className="text-xs text-muted mb-1">Joined</p>
              <p className="text-sm font-medium">{new Date(emp.joinDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )

  // Render Attendance Tab
  const AttendanceTab = () => {
    // Generate simple calendar mock
    const days = Array.from({ length: 30 }, (_, i) => i + 1)
    
    return (
      <div className="space-y-6 animate-reveal">
        {attendanceStats && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-success/10 rounded-xl p-4 border border-success/20">
              <p className="text-sm text-success font-medium mb-1">Present Today</p>
              <p className="text-2xl font-bold text-success">{attendanceStats.present}</p>
            </div>
            <div className="bg-danger/10 rounded-xl p-4 border border-danger/20">
              <p className="text-sm text-danger font-medium mb-1">Absent Today</p>
              <p className="text-2xl font-bold text-danger">{attendanceStats.absent}</p>
            </div>
            <div className="bg-warning/10 rounded-xl p-4 border border-warning/20">
              <p className="text-sm text-warning font-medium mb-1">On Leave</p>
              <p className="text-2xl font-bold text-warning">{attendanceStats.onLeave}</p>
            </div>
          </div>
        )}

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-semibold text-foreground">April 2026</h3>
            <div className="flex gap-2">
              <button className="p-1.5 rounded-lg border border-border hover:bg-gray-50"><ChevronLeft size={16} /></button>
              <button className="p-1.5 rounded-lg border border-border hover:bg-gray-50"><ChevronRight size={16} /></button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-muted text-xs uppercase">
                <tr>
                  <th className="px-4 py-3 font-medium min-w-[200px]">Employee</th>
                  {days.map(d => (
                    <th key={d} className="px-2 py-3 font-medium text-center min-w-[40px]">{d}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {employees.map((emp, i) => (
                  <tr key={emp.id} className="hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-foreground sticky left-0 bg-card border-r border-border">{emp.name}</td>
                    {days.map(d => {
                      // Randomize attendance for mockup
                      const isWeekend = (d + 2) % 7 === 0 || (d + 3) % 7 === 0
                      let status = 'P'
                      let colorClass = 'text-success bg-success/10'
                      
                      if (isWeekend) {
                        status = '-'
                        colorClass = 'text-muted bg-gray-100'
                      } else if (i === 1 && d === 12) {
                        status = 'A'
                        colorClass = 'text-danger bg-danger/10'
                      } else if (i === 5 && d > 10) {
                        status = 'L'
                        colorClass = 'text-warning bg-warning/10'
                      }

                      return (
                        <td key={d} className="px-2 py-3 text-center">
                          <span className={cn("inline-flex items-center justify-center w-6 h-6 rounded text-xs font-medium", colorClass)}>
                            {status}
                          </span>
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  // Render Payroll Tab
  const PayrollTab = () => (
    <div className="space-y-6 animate-reveal">
      <div className="flex justify-between items-center bg-card p-4 rounded-xl border border-border">
        <div>
          <h3 className="font-semibold text-foreground">April 2026 Payroll</h3>
          <p className="text-sm text-muted">Review and process employee salaries</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-colors">
          <Play size={16} fill="currentColor" /> Run Payroll
        </button>
      </div>

      <DataTable 
        columns={[
          { header: 'Employee', accessorKey: 'name', cell: (row) => <span className="font-medium">{row.name}</span> },
          { header: 'Base Salary', accessorKey: 'baseSalary', cell: (row) => formatCurrency(row.baseSalary) },
          { header: 'Days Present', accessorKey: 'daysPresent' },
          { header: 'Deductions', accessorKey: 'deductions', cell: (row) => <span className="text-danger">-{formatCurrency(row.deductions)}</span> },
          { header: 'Net Salary', accessorKey: 'netSalary', cell: (row) => <span className="font-bold">{formatCurrency(row.netSalary)}</span> },
          { header: 'Status', accessorKey: 'status', cell: (row) => <StatusBadge status={row.status} /> },
          { header: 'Payslip', accessorKey: 'actions', cell: () => (
            <button className="flex items-center gap-1 text-primary hover:underline text-sm font-medium">
              <Download size={14} /> Download
            </button>
          )},
        ]}
        data={payroll}
      />
    </div>
  )

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Human Resources" 
        subtitle="Manage your team, track attendance, and process payroll seamlessly."
      />

      <Tabs.Root defaultValue="employees" className="flex flex-col">
        <Tabs.List className="flex border-b border-border mb-6">
          <Tabs.Trigger 
            value="employees" 
            className="px-6 py-3 text-sm font-medium text-muted hover:text-foreground data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary outline-none transition-all"
          >
            Employees
          </Tabs.Trigger>
          <Tabs.Trigger 
            value="attendance" 
            className="px-6 py-3 text-sm font-medium text-muted hover:text-foreground data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary outline-none transition-all"
          >
            Attendance
          </Tabs.Trigger>
          <Tabs.Trigger 
            value="payroll" 
            className="px-6 py-3 text-sm font-medium text-muted hover:text-foreground data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary outline-none transition-all"
          >
            Payroll
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content value="employees" className="outline-none">
          <EmployeesTab />
        </Tabs.Content>
        <Tabs.Content value="attendance" className="outline-none">
          <AttendanceTab />
        </Tabs.Content>
        <Tabs.Content value="payroll" className="outline-none">
          <PayrollTab />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}

export default HR
