import { Loader2 } from 'lucide-react'
import { cn } from '../../utils/helpers'

const LoadingSpinner = ({ className, size = 24 }) => {
  return (
    <div className={cn("flex items-center justify-center w-full h-full p-4", className)}>
      <Loader2 size={size} className="animate-spin text-primary" />
    </div>
  )
}

export default LoadingSpinner
