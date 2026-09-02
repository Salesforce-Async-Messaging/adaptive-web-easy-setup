import { createElement } from 'lwc';
import App from 'c/app';

console.log('[LWC App] index.js executing');

// Create a container div with proper isolation
const root = document.createElement('div');
root.id = 'web-curation-overlay-root';
console.log('[LWC App] Created root container');

// Create the LWC app element
const app = createElement('c-app', { is: App });
console.log('[LWC App] Created c-app element');
root.appendChild(app);
console.log('[LWC App] Appended c-app to root');

// Function to safely append to body when it's available
function appendToBody() {
  if (document.body) {
    document.body.appendChild(root);
    console.log('[LWC App] Appended root to document.body');
    return true;
  }
  console.log('[LWC App] document.body not available yet');
  return false;
}

// Try to append immediately if body is already available
if (!appendToBody()) {
  console.log('[LWC App] Using MutationObserver to wait for body');
  // Use mutation observer to watch for body creation
  const observer = new MutationObserver((mutations, obs) => {
    if (document.body) {
      obs.disconnect();
      appendToBody();
    }
  });
  
  // Start observing
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
} else {
  console.log('[LWC App] Root appended immediately');
}
