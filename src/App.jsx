import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './store/authStore'
import Layout from './components/layout/Layout'

// Pages
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Onboarding from './pages/Onboarding'
import Dashboard from './pages/Dashboard'
import Inventory from './pages/Inventory'
import HR from './pages/HR'
import SupplyChain from './pages/SupplyChain'
import CRM from './pages/CRM'
import NotFound from './pages/NotFound'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore()
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  // If user hasn't completed onboarding, force them to onboarding page
  if (user && !user.onboardingComplete && window.location.pathname !== '/onboarding') {
    return <Navigate to="/onboarding" replace />
  }

  return children
}

function App() {
  const { isAuthenticated, user } = useAuthStore()

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          isAuthenticated 
            ? (user?.onboardingComplete ? <Navigate to="/dashboard" replace /> : <Navigate to="/onboarding" replace />)
            : <Navigate to="/login" replace />
        } 
      />
      
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="/onboarding" element={
        <ProtectedRoute>
          <Onboarding />
        </ProtectedRoute>
      } />

      {/* Main App Routes */}
      <Route element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/hr" element={<HR />} />
        <Route path="/supply" element={<SupplyChain />} />
        <Route path="/crm" element={<CRM />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
