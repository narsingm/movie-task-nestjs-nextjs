import { AppProps } from '@/pages/_app.type'



export type Page =
  React.FC<any>
  &
  Pick<AppProps['Component'], 'layoutProps'>