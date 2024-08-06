import { Alert, Button, CircularProgress, Stack } from '@mui/material'
import { RenderContentProps } from './RenderContent.type'



export default function RenderContent(props: RenderContentProps) {
  const { loading, error, children } = props


  const handleReload = () => {
    window.location.reload()
  }


  return (
    error ?
      <Alert severity='error' action={
        <Button color='inherit' size='small' onClick={handleReload}>Try again</Button>
      }>
        Sorry! Something went wrong
      </Alert>
      :
      loading ?
        <Stack component={CircularProgress} mx='auto' />
        :
        children
  )
}
