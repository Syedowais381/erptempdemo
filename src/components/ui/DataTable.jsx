import EmptyState from './EmptyState'

const DataTable = ({ columns, data, emptyMessage = "No data found" }) => {
  if (!data || data.length === 0) {
    return <EmptyState message={emptyMessage} />
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card">
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-gray-50/50">
          <tr>
            {columns.map((col, i) => (
              <th 
                key={i}
                className="px-6 py-3 text-left text-xs font-medium text-muted uppercase tracking-wider"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-border">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50/50 transition-colors">
              {columns.map((col, colIndex) => (
                <td 
                  key={colIndex} 
                  className="px-6 py-4 whitespace-nowrap text-sm text-foreground"
                >
                  {col.cell ? col.cell(row) : row[col.accessorKey]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
