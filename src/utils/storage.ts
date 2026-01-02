export function saveToLocalStorage(name: string, data: any) {
  try {
    localStorage.setItem(name, JSON.stringify(data))
  } catch (error) {
    console.error(error)
  }
}

export function getFromLocalStorage(name: string) {
  try {
    const data = localStorage.getItem(name)
    if (data) {
      return JSON.parse(data)
    }
  } catch (error) {
    console.error(error)
  }

  return undefined
}

export function removeFromLocalStorage(name: string) {
  try {
    localStorage.removeItem(name)
  } catch (error) {
    console.error(error)
  }
}
