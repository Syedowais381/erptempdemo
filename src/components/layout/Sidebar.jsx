import { Link, useLocation } from 'react-router-dom'
import { useUiStore } from '../../store/uiStore'
import { LayoutDashboard, Package, Users, Truck, Briefcase, Settings, HelpCircle, LogOut } from 'lucide-react'
import { useAuthStore } from '../../store/authStore'
import { cn } from '../../utils/helpers'

const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Inventory', path: '/inventory', icon: Package },
  { name: 'HR', path: '/hr', icon: Users },
  { name: 'Supply Chain', path: '/supply', icon: Truck },
  { name: 'CRM', path: '/crm', icon: Briefcase },
]

const Sidebar = () => {
  const { sidebarCollapsed } = useUiStore()
  const { logout, user } = useAuthStore()
  const location = useLocation()

  return (
    <aside className={cn(
      "bg-[#0A0A0A] text-[#A1A1AA] flex flex-col transition-all duration-300 h-screen fixed md:relative z-40",
      sidebarCollapsed ? "w-[64px]" : "w-[240px]"
    )}>
      {/* Logo Area */}
      <div className="h-16 flex items-center px-4 border-b border-[#1A1A1A]">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-lg">B</span>
        </div>
        {!sidebarCollapsed && (
          <div className="ml-3 overflow-hidden">
            <h1 className="text-white font-bold text-lg tracking-wide whitespace-nowrap">BizOS</h1>
            <p className="text-xs text-muted truncate">{user?.businessName}</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path)
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-3 py-2.5 rounded-lg transition-colors group",
                isActive ? "bg-[#1A1A1A] text-white" : "hover:bg-[#1A1A1A] hover:text-white"
              )}
            >
              <item.icon className={cn("shrink-0", sidebarCollapsed ? "w-6 h-6 mx-auto" : "w-5 h-5")} />
              {!sidebarCollapsed && <span className="ml-3 font-medium whitespace-nowrap">{item.name}</span>}
              
              {/* Tooltip for collapsed state */}
              {sidebarCollapsed && (
                <div className="absolute left-14 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50">
                  {item.name}
                </div>
              )}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-[#1A1A1A] space-y-1">
        <button className="w-full flex items-center px-3 py-2.5 rounded-lg hover:bg-[#1A1A1A] hover:text-white transition-colors group">
          <Settings className={cn("shrink-0", sidebarCollapsed ? "w-6 h-6 mx-auto" : "w-5 h-5")} />
          {!sidebarCollapsed && <span className="ml-3 font-medium">Settings</span>}
        </button>
        <button className="w-full flex items-center px-3 py-2.5 rounded-lg hover:bg-[#1A1A1A] hover:text-white transition-colors group">
          <HelpCircle className={cn("shrink-0", sidebarCollapsed ? "w-6 h-6 mx-auto" : "w-5 h-5")} />
          {!sidebarCollapsed && <span className="ml-3 font-medium">Help & Support</span>}
        </button>
        <button 
          onClick={logout}
          className="w-full flex items-center px-3 py-2.5 rounded-lg hover:bg-[#1A1A1A] hover:text-white transition-colors group mt-2"
        >
          <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
            {user?.name?.charAt(0) || 'U'}
          </div>
          {!sidebarCollapsed && (
            <div className="ml-3 flex-1 overflow-hidden text-left">
              <p className="text-sm font-medium text-white truncate">{user?.name}</p>
              <p className="text-xs text-muted truncate">Log out</p>
            </div>
          )}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
