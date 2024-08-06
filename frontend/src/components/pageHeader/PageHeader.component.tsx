import { Stack, SxProps, Typography } from '@mui/material'

import { PageHeaderProps } from './PageHeader.type'
import { style } from './PageHeader.style'



export default function PageHeader(props: PageHeaderProps) {
  const { heading, actions, sx } = props

  return (
    <Stack sx={{ ...style.root, ...sx } as SxProps}>
      <Stack>
        <Typography variant='h1'>{heading}</Typography>
      </Stack>

      <Stack sx={style.actions}>
        {actions}
      </Stack>
    </Stack>
  )
}
