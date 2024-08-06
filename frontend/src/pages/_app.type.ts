import { NextPage as NextPageType } from 'next'
import { AppProps as AppPropsType } from 'next/app'
import { LayoutProps } from '@/layout/Layout.type'



type NextPage<P = {}, IP = P> = NextPageType<P, IP> & {
  layoutProps: LayoutProps
}

export type AppProps = AppPropsType & { Component: NextPage }