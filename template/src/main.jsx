import 'three-hex-tiling'
import '@/i18n'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '@/app'
import '@/styles.css'

// Keep Tab available to game controls without moving focus outside editable fields.
function preventTabFocus (event) {
  if (event.key !== 'Tab') return
  if (!(event.target instanceof window.Element)) return
  if (event.target.closest('input, textarea, select, [contenteditable]:not([contenteditable="false"]), [role="textbox"]')) return
  event.preventDefault()
}

window.addEventListener('keydown', preventTabFocus)

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    window.removeEventListener('keydown', preventTabFocus)
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
