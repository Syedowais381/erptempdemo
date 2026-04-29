import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { authService } from '../../services/authService'
import { Loader2, TrendingUp, Users, Package } from 'lucide-react'

const AuthSidebar = () => (
  <div className="hidden lg:flex flex-col justify-between w-1/2 bg-[#0A0A0A] text-white p-12 relative overflow-hidden">
    <div className="relative z-10">
      <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-8">
        <span className="text-white font-bold text-2xl">B</span>
      </div>
      <h1 className="text-4xl font-bold mb-4 tracking-tight">Your entire business,<br />one intelligent platform.</h1>
      <p className="text-[#A1A1AA] text-lg max-w-md">Streamline your operations, manage inventory, handle HR, and grow your CRM—all from a single, beautiful dashboard.</p>
    </div>

    {/* Floating Feature Cards */}
    <div className="relative z-10 space-y-4 mt-12 animate-reveal delay-200">
      <div className="bg-[#1A1A1A]/80 backdrop-blur border border-white/10 rounded-xl p-4 max-w-sm flex items-center gap-4 transform translate-x-12 hover:-translate-y-1 transition-transform">
        <div className="w-10 h-10 rounded-lg bg-success/20 text-success flex items-center justify-center shrink-0">
          <TrendingUp size={20} />
        </div>
        <div>
          <p className="text-sm font-medium">Revenue Growth</p>
          <p className="text-xs text-[#A1A1AA]">+12.5% this month</p>
        </div>
      </div>
      <div className="bg-[#1A1A1A]/80 backdrop-blur border border-white/10 rounded-xl p-4 max-w-sm flex items-center gap-4 transform translate-x-4 hover:-translate-y-1 transition-transform">
        <div className="w-10 h-10 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
          <Users size={20} />
        </div>
        <div>
          <p className="text-sm font-medium">Team Management</p>
          <p className="text-xs text-[#A1A1AA]">12 active employees</p>
        </div>
      </div>
      <div className="bg-[#1A1A1A]/80 backdrop-blur border border-white/10 rounded-xl p-4 max-w-sm flex items-center gap-4 transform translate-x-20 hover:-translate-y-1 transition-transform">
        <div className="w-10 h-10 rounded-lg bg-warning/20 text-warning flex items-center justify-center shrink-0">
          <Package size={20} />
        </div>
        <div>
          <p className="text-sm font-medium">Smart Inventory</p>
          <p className="text-xs text-[#A1A1AA]">2 low stock alerts</p>
        </div>
      </div>
    </div>
    
    <div className="absolute -bottom-[20%] -right-[10%] w-[80%] h-[80%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
  </div>
)

const Login = () => {
  const [email, setEmail] = useState('admin@zara.co.in')
  const [password, setPassword] = useState('password123')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const { login } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    try {
      const response = await authService.login({ email, password })
      login(response.user, response.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex w-full bg-background page-transition">
      <AuthSidebar />
      
      <div className="flex-1 flex flex-col justify-center items-center p-8">
        <div className="w-full max-w-md animate-reveal">
          {/* Mobile Logo */}
          <div className="lg:hidden w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-8 mx-auto">
            <span className="text-white font-bold text-2xl">B</span>
          </div>

          <div className="text-center lg:text-left mb-8">
            <h2 className="text-3xl font-bold text-foreground">Welcome back</h2>
            <p className="text-muted mt-2">Enter your details to access your workspace.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-danger/10 text-danger rounded-lg text-sm font-medium border border-danger/20">
                {error}
              </div>
            )}
            
            <div className="space-y-1">
              <label className="text-sm font-medium text-foreground block">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="name@business.com"
              />
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-foreground block">Password</label>
                <a href="#" className="text-xs text-primary hover:underline font-medium">Forgot password?</a>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="remember" className="rounded border-border text-primary focus:ring-primary" />
              <label htmlFor="remember" className="text-sm text-muted">Remember me for 30 days</label>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-primary hover:bg-indigo-600 text-white font-medium py-2.5 rounded-lg transition-colors flex justify-center items-center"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-muted mt-8">
            Don't have an account? <Link to="/register" className="text-primary font-medium hover:underline">Create a workspace</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export { AuthSidebar }
export default Login
