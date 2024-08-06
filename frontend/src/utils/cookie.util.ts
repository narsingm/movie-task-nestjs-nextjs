export const setCookie = (name: string, value: string, days: number) => {
  const expirationDate = new Date()
  expirationDate.setDate(expirationDate.getDate() + days)
  const cookieValue = `${name}=${encodeURIComponent(value)}; expires=${expirationDate.toUTCString()}; path=/`
  document.cookie = cookieValue
}


export const getCookie = (name: string): string => {
  try {
    const cookies = document.cookie.split('; ').reduce((acc: Record<string, string>, cookie) => {
      const [cookieName, cookieValue] = cookie.split('=')
      acc[cookieName] = decodeURIComponent(cookieValue)
      return acc
    }, {})
    return cookies[name] || ''
  }
  catch (error) { return '' }
}


export const removeCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
}
