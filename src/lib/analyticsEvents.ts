type EventParameters = Record<string, string | number | boolean>

export function trackEvent(name: string, parameters: EventParameters = {}) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', name, parameters)
}
