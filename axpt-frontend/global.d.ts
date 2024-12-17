interface Window {
  ic?: {
    plug?: {
      requestConnect: () => Promise<void>
      agent: {
        getPrincipal: () => Promise<{ toText: () => string }>
      }
    }
  }
}
