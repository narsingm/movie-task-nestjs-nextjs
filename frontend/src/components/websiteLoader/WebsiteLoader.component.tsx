import Logo from '../logo/Logo.component'
import { CircularProgress, Backdrop, Stack } from '@mui/material'
import { style } from './WebsiteLoader.style'



export default function WebsiteLoader() {

  return (
    <Backdrop sx={style.root} open={true}>
      <Stack direction='column' sx={style.progressContainer}>
        <CircularProgress color="inherit" />
      </Stack>
      <Logo />
    </Backdrop>
  )
}
