import { Bell, Search, Menu } from 'lucide-react'
import { useUiStore } from '../../store/uiStore'
import { useAuthStore } from '../../store/authStore'
import { useLocation } from 'react-router-dom'

const Topbar = () => {
  const { toggleSidebar } = useUiStore()
  const { user } = useAuthStore()
  const location = useLocation()
  
  // Get page title from route
  const getPageTitle = () => {
    const path = location.pathname.substring(1)
    if (!path) return 'Dashboard'
    if (path === 'hr') return 'Human Resources'
    if (path === 'crm') return 'CRM'
    return path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' ')
  }

  return (
    <header className="h-16 bg-white border-b border-border flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg text-muted transition-colors md:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold text-foreground hidden sm:block">
          {getPageTitle()}
        </h2>
      </div>

      <div className="flex items-center gap-4 flex-1 justify-end">
        <div className="relative max-w-md w-full hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input 
            type="text" 
            placeholder="Search across BizOS..." 
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        <button className="relative p-2 hover:bg-gray-100 rounded-full text-muted transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full border-2 border-white"></span>
        </button>

        <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold border border-primary/20">
          {user?.name?.charAt(0) || 'U'}
        </div>
      </div>
    </header>
  )
}

export default Topbar
