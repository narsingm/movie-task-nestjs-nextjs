export type FullPageMessageProps = {
  heading?: string
  ActionButton?: React.ReactElement
  hideButton?: boolean
  type?: 'error' | 'success',
  icon?: React.ReactNode
  centerContent?: boolean
}