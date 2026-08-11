/**
 * View Transitions API Helper
 * Executes a state update or navigation callback wrapped in document.startViewTransition
 * when supported by the browser, with graceful fallback.
 */
export function navigateWithViewTransition(updateFn: () => void): void {
  if (typeof document !== 'undefined' && 'startViewTransition' in document) {
    (document as any).startViewTransition(() => {
      updateFn();
    });
  } else {
    updateFn();
  }
}
