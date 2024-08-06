import { alpha } from '@mui/material'
import { Style } from '@/types'



export const style: Style = {
  box: {
    bgcolor: 'background.bg2',
    borderRadius: 1,
    overflow: 'hidden',
    position: 'relative',
    '&.error': {
      bgcolor: (theme: any) => alpha(theme.palette.error.main, .07),
    },
    '.wrapper': {
      display: 'grid',
      overflow: 'hidden',
      transition: 'grid-template-rows .2s ease-in-out',
    },
  },
  label: {
    mb: .5,
  },
  uploadBox: {
    p: 3,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    outline: 'unset',
    gap: .5,
    '&:hover, &:focus-visible': {
      bgcolor: 'action.hover',
    },
  },
  imageBox: {
    p: 2,
    minHeight: 0,
  },
  thumbnail: {
    borderRadius: 1,
    maxHeight: 256,
    width: 1,
    objectFit: 'contain',
    bgcolor: 'dividerDark',
  },
  input: {
    height: 0,
    width: 0,
    opacity: 0,
  },
  tools: {
    position: 'absolute',
    flexDirection: 'row',
    gap: 1,
    top: (theme: any) => theme.spacing(3),
    right: (theme: any) => theme.spacing(3),
  },
  toolAction: {
    color: 'white',
    bgcolor: 'rgba(0,0,0,.5) !important',
    transition: 'box-shadow .25s ease-in',
    '&:hover': {
      boxShadow: '0 0 0 .125em rgba(255,255,255,.9)',
    },
    '.icon': {
      fontSize: '1rem',
    }
  },
  viewImageDialog: {
    '.MuiDialog-paper': {
      bgcolor: 'unset',
      boxShadow: '0',
      borderRadius: 0,
    }
  }
}