export const checkPermission = async (name: string): Promise<boolean> => {
  try {
    const result = await navigator.permissions.query({ name } as any)
    if (result.state === 'granted') return true
    return false
  } catch {
    return false
  }
}
