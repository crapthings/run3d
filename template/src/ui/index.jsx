import { createPortal } from 'react-dom'

// Render HTML overlays above the scene while allowing pointer events through empty areas.
export function Ui ({ children }) {
  return createPortal(
    <div className='pointer-events-none fixed inset-0 z-10'>
      {children}
    </div>,
    document.getElementById('ui-root')
  )
}
