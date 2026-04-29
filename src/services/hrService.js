const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const hrService = {
  getEmployees: async () => {
    await delay(700)
    return [
      { id: 1, name: 'Anjali Desai', initials: 'AD', role: 'Store Manager', department: 'Retail', salary: 45000, joinDate: '2024-01-15', status: 'Active' },
      { id: 2, name: 'Vikram Singh', initials: 'VS', role: 'Warehouse Supervisor', department: 'Logistics', salary: 38000, joinDate: '2023-06-10', status: 'Active' },
      { id: 3, name: 'Pooja Sharma', initials: 'PS', role: 'Marketing Executive', department: 'Marketing', salary: 42000, joinDate: '2025-02-01', status: 'Active' },
      { id: 4, name: 'Rohan Mehta', initials: 'RM', role: 'Sales Associate', department: 'Retail', salary: 25000, joinDate: '2025-08-20', status: 'Active' },
      { id: 5, name: 'Kavita Iyer', initials: 'KI', role: 'HR Manager', department: 'HR', salary: 55000, joinDate: '2022-11-05', status: 'Active' },
      { id: 6, name: 'Sanjay Kumar', initials: 'SK', role: 'Delivery Driver', department: 'Logistics', salary: 22000, joinDate: '2024-04-12', status: 'On Leave' },
    ]
  },
  
  getAttendanceStats: async () => {
    await delay(500)
    return {
      present: 10,
      absent: 1,
      onLeave: 1,
      total: 12
    }
  },

  getPayroll: async () => {
    await delay(800)
    return [
      { id: 1, name: 'Anjali Desai', baseSalary: 45000, daysPresent: 22, deductions: 1200, netSalary: 43800, status: 'Pending' },
      { id: 2, name: 'Vikram Singh', baseSalary: 38000, daysPresent: 21, deductions: 500, netSalary: 37500, status: 'Paid' },
      { id: 3, name: 'Pooja Sharma', baseSalary: 42000, daysPresent: 22, deductions: 0, netSalary: 42000, status: 'Pending' },
    ]
  }
}
