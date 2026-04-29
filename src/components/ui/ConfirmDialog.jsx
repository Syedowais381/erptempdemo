import Modal from './Modal'

const ConfirmDialog = ({ open, onOpenChange, title, message, onConfirm, confirmText = "Confirm", cancelText = "Cancel", isDanger = false }) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange} title={title} description={message}>
      <div className="flex justify-end gap-3 mt-6">
        <button 
          onClick={() => onOpenChange(false)}
          className="px-4 py-2 rounded-lg text-sm font-medium text-foreground bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          {cancelText}
        </button>
        <button 
          onClick={() => {
            onConfirm()
            onOpenChange(false)
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors ${
            isDanger ? 'bg-danger hover:bg-red-600' : 'bg-primary hover:bg-indigo-600'
          }`}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  )
}

export default ConfirmDialog
