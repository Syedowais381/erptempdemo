import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

const Modal = ({ open, onOpenChange, title, description, children }) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fadeIn" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card p-6 rounded-xl shadow-xl z-50 w-full max-w-md animate-reveal">
          <div className="flex justify-between items-start mb-4">
            <div>
              <Dialog.Title className="text-lg font-semibold text-foreground">
                {title}
              </Dialog.Title>
              {description && (
                <Dialog.Description className="text-sm text-muted mt-1">
                  {description}
                </Dialog.Description>
              )}
            </div>
            <Dialog.Close className="text-muted hover:text-foreground transition-colors">
              <X size={20} />
            </Dialog.Close>
          </div>
          <div>
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export default Modal
