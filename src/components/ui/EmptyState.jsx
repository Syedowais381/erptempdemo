const EmptyState = ({ message, action }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 border border-dashed border-border rounded-xl bg-card">
      <p className="text-muted text-sm mb-4">{message}</p>
      {action && action}
    </div>
  )
}

export default EmptyState
