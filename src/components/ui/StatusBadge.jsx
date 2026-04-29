const StatusBadge = ({ status }) => {
  let colorClass = "bg-gray-100 text-gray-800"
  
  const s = status?.toLowerCase() || ""
  if (s.includes("delivered") || s.includes("active") || s.includes("paid") || s.includes("received")) {
    colorClass = "bg-[#10B981]/10 text-[#10B981]" // Success
  } else if (s.includes("processing") || s.includes("pending") || s.includes("transit") || s.includes("draft")) {
    colorClass = "bg-[#F59E0B]/10 text-[#F59E0B]" // Warning
  } else if (s.includes("leave") || s.includes("out") || s.includes("cancelled")) {
    colorClass = "bg-[#EF4444]/10 text-[#EF4444]" // Danger
  } else if (s.includes("shipped") || s.includes("sent")) {
    colorClass = "bg-[#6366F1]/10 text-[#6366F1]" // Primary
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium ${colorClass}`}>
      {status}
    </span>
  )
}

export default StatusBadge
