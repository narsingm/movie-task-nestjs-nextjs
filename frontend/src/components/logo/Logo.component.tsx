import Link from 'next/link'
import { Stack, SxProps, Typography } from '@mui/material'

import { style } from './Logo.style'
import { LogoProps } from './Logo.type'



export default function Logo({ sx = {} }: LogoProps) {


  return (
    <Stack sx={{ ...style.root, ...sx } as SxProps} component={Link} href='/my-movies'>
      <Stack sx={style.logo}>
        <Stack sx={style.iconBox}>M</Stack>
        <Typography sx={style.name}>Movie List</Typography>
      </Stack>
    </Stack>
  )
}
