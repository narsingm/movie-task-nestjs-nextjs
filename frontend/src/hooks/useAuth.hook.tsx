import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { getCookie } from '@/utils'
import { useReduxDispatch } from '@/hooks'
import { handleLayoutState } from '@/redux/slice/layout.slice'
import { useLazyGetProfileQuery } from '@/redux/api/auth.api'
import { LayoutProps } from '@/layout/Layout.type'



export const useAuth = ({ pageType }: LayoutProps) => {
  const router = useRouter()
  const token = getCookie('token')
  const dispatch = useReduxDispatch()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [getProfile, { data: profile }] = useLazyGetProfileQuery()


  useEffect(() => {
    if (!token && pageType === 'protected') router.replace('/auth/login')
    else if (token && pageType === 'auth') router.replace('/my-movies')
    else if (!token) setLoading(false)
  }, [router.pathname, profile])


  useEffect(() => {
    if (token) getProfile().unwrap().catch(() => setError(true)).finally(() => setLoading(false))
  }, [])


  useEffect(() => {
    if (!loading) dispatch(handleLayoutState({ isWebsiteLoading: false, isLoggedIn: !!profile }))
  }, [loading])


  return {
    isLoading: pageType === 'public' ? false : loading,
    isError: error,
  }
}
