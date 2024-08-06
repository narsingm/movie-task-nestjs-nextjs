import Link from 'next/link'
import { Button } from '@mui/material'

import FullPageMessage from '@/components/fullPageMessage/FullPageMessage.component'
import { Page } from '@/types'



const PageNotFound: Page = () => {
  return (
    <FullPageMessage
      heading='404: Page Not Found'
      ActionButton={
        <Button variant='contained' href='/' component={Link}>Go to Home</Button>
      }
    />
  )
}


PageNotFound.layoutProps = {
  title: 'Page not found',
  pageType: 'public'
}

export default PageNotFound