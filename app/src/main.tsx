import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { flushSync } from 'react-dom'

// Create a container div with proper isolation
const root = document.createElement('div')
root.id = 'web-curation-overlay-root'
flushSync(() => {
  createRoot(root).render(
    <App />
  )
})

// Function to safely append to body when it's available
function appendToBody() {
  if (document.body) {
    document.body.appendChild(root)
    return true
  }
  return false
}

// Try to append immediately if body is already available
if (!appendToBody()) {
  // Use mutation observer to watch for body creation
  const observer = new MutationObserver((mutations, obs) => {
    if (document.body) {
      obs.disconnect()
      appendToBody()
    }
  })
  
  // Start observing
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  })
}
