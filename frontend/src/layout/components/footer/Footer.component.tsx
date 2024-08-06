import { Container, Stack, Typography } from '@mui/material'
import { style } from './Footer.style'



export default function Footer() {
  return (
    <Stack component='footer' sx={style.root}>
      <Container sx={style.container}>
        <Typography>&copy; Movie List. All right reserved</Typography>
      </Container>
    </Stack>
  )
}
