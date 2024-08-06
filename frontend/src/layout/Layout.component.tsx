import Head from 'next/head'
import { LayoutProps } from './Layout.type'
import { Box } from '@mui/material'

import Header from './components/header/Header.component'
import Footer from './components/footer/Footer.component'
import WebsiteLoader from '@/components/websiteLoader/WebsiteLoader.component'
import ErrorBoundary from '@/components/errorBoundary/ErrorBoundary.component'
import { useNProgress } from '@/hooks'
import { useAuth } from '@/hooks/useAuth.hook'
import { getCookie } from '@/utils'



export default function Layout(props: LayoutProps & { children: React.ReactNode }) {
  const { title, children, header = true, footer = true } = props
  const { isLoading, isError } = useAuth(props)
  const ngProgress = useNProgress()
  const token = getCookie('token')


  const renderChildren = () => {
    if (!token && props.pageType === 'protected') return null
    return children
  }


  return <>
    <Head>
      {title && <title>{`${title} | Movie List`}</title>}
    </Head>

    {
      isLoading ?
        <WebsiteLoader />
        :
        <>
          {header && <Header />}
          <Box component='main' flex={1} py={4}>
            <ErrorBoundary error={isError}>
              {renderChildren()}
            </ErrorBoundary>
          </Box>
          {footer && <Footer />}
        </>
    }

    {ngProgress}
  </>
}
