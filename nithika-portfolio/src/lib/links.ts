/** Only configured, valid public web URLs are rendered as external links. */
export function webLink(value?: string): string | undefined {
  if (!value?.trim()) return undefined
  try {
    const url = new URL(value.trim())
    return (url.protocol === 'https:' || url.protocol === 'http:') && !url.username && !url.password ? url.href : undefined
  } catch {
    return undefined
  }
}

export function emailLink(value?: string): string | undefined {
  const email = value?.trim()
  return email && /^[^\s@<>?&#]+@[^\s@<>?&#]+\.[^\s@<>?&#]+$/.test(email) ? email : undefined
}

export function resumeLink(value?: string): string | undefined {
  const path = value?.trim()
  if (!path) return undefined
  const link = path.startsWith('/') && !path.startsWith('//') ? path : webLink(path)
  return link && /\.pdf(?:[?#]|$)/i.test(link) ? link : undefined
}
