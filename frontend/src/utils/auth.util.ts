import { removeCookie, setCookie } from './cookie.util'



export const handleLogout = () => {
  removeCookie('token')
  window.location.replace('/auth/login')
}