export type LayoutProps = {
  title: string
  pageType: 'public' | 'auth' | 'protected'
  header?: boolean
  footer?: boolean
}