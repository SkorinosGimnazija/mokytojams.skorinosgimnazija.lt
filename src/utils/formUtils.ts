export function createFormData(values: Record<string, any>) {
  const fd = new FormData()

  for (const [key, value] of Object.entries(values)) {
    if (value == null) continue

    const items = Array.isArray(value) ? value : [value]
    for (const item of items) {
      if (item != null) {
        fd.append(key, item)
      }
    }
  }

  return fd
}