import Head from 'next/head'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { IconContext } from 'react-icons/lib'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'

import Layout from '@/layout/Layout.component'
import { theme } from '@/styles/theme'
import { AppProps } from './_app.type'
import { store } from '@/redux/store/store'
import '@/styles/globals.css'
import '@/lib/yup/config'



export default function App(props: AppProps) {
  const { Component, pageProps } = props
  const layoutProps = Component.layoutProps


  return <>
    <Head>
      <title>Movie List - Unlimited movies, TV shows and beyond</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>

    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <IconContext.Provider value={{ className: 'icon' }}>
            <Toaster position='bottom-left' />
            <CssBaseline enableColorScheme />
            <Layout {...layoutProps}>
              <Component {...pageProps} />
            </Layout>
          </IconContext.Provider>
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  </>
}