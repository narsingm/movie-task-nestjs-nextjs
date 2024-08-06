import Link from 'next/link'
import { Button, Container, Skeleton, Stack, Theme, useMediaQuery } from '@mui/material'
import { MdLogout } from 'react-icons/md'

import Logo from '@/components/logo/Logo.component'
import { style } from './Header.style'
import { useReduxSelector } from '@/hooks/redux.hook'
import { handleLogout } from '@/utils'



export default function Header() {
  const { isLoggedIn, isWebsiteLoading } = useReduxSelector(state => state.layout)
  const isSmUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'))


  return (
    <Stack component='header' sx={style.root}>
      <Container sx={style.container}>

        {/* Logo */}
        <Logo sx={style.logo} />

        {/* Profile */}
        <Stack direction='row' alignItems='center' gap={1.5}>
          {isWebsiteLoading ?
            <Skeleton variant="rounded" width={150} height={43} />
            : isLoggedIn ?
              <Button variant='text' startIcon={<MdLogout />} onClick={handleLogout} sx={style.button}>Logout</Button>
              :
              <>
                <Button variant='outlined' href='/auth/login' LinkComponent={Link} sx={style.button}>Login</Button>
                {isSmUp && <Button variant='contained' href='/auth/register' LinkComponent={Link} sx={style.button}>Register</Button>}
              </>
          }
        </Stack>

      </Container>
    </Stack>
  )
}
