import { cn } from '../../utils/helpers'

const MetricCard = ({ title, value, change, icon: Icon, className, colorClass = "border-primary" }) => {
  return (
    <div className={cn(
      "bg-card rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.08)] border-b-4",
      colorClass,
      className
    )}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-muted text-sm font-medium">{title}</h3>
        {Icon && <Icon className="w-5 h-5 text-muted" />}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-foreground">{value}</span>
        {change !== undefined && (
          <span className={cn(
            "text-sm font-medium",
            change > 0 ? "text-success" : change < 0 ? "text-danger" : "text-muted"
          )}>
            {change > 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
    </div>
  )
}

export default MetricCard
