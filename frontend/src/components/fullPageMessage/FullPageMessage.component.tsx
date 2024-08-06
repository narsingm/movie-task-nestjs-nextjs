import { Box, Container, Typography, Button, Stack } from '@mui/material'
import { BiErrorAlt } from 'react-icons/bi'

import { style } from './FullPageMessage.style'
import { FullPageMessageProps } from './FullPageMessage.type'
import { FaRegCircleCheck } from 'react-icons/fa6'



export default function FullPageMessage(props: FullPageMessageProps) {
  const { heading, ActionButton, hideButton, type = 'error', centerContent, icon } = props
  const handleReload = () => window.location.reload()


  return (
    <Box component='section' sx={style.root}>

      {centerContent !== false &&
        <style global jsx>{`
          main{
            display:flex;
            justify-content:center;
            align-items:center;
          }
        `}</style>
      }

      <Stack component={Container} sx={style.container}>
        {icon ?? type === 'error' ? <BiErrorAlt className='error icon' /> : <FaRegCircleCheck className='success icon' />}
        <Typography variant='h1'>{heading || 'Sorry! Something went wrong'}</Typography>
        {!hideButton && (ActionButton ?? <Button variant='contained' sx={style.reloadButton} onClick={handleReload}>Try again</Button>)}
      </Stack>

    </Box>
  )
}
