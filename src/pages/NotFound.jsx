import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 page-transition">
      <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
        <span className="text-4xl font-bold">404</span>
      </div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Page Not Found</h1>
      <p className="text-muted mb-8 text-center max-w-md">The page you are looking for doesn't exist or has been moved.</p>
      <Link 
        to="/dashboard"
        className="px-6 py-2.5 bg-primary hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors"
      >
        Return to Dashboard
      </Link>
    </div>
  )
}

export default NotFound
