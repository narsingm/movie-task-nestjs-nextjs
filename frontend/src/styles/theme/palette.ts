import { Theme } from '@mui/material'



export const createPalette = () => {

  return {
    mode: 'light',
    divider: '#f0f0f0',
    dividerDark: '#dcdfe4',
    primary: {
      main: '#15c46c',
      contrastText: '#fff'
    },
    background: {
      bg1: '#fafafa',
      bg2: '#f6f6f6',
    },
    text: {
      secondary: 'rgba(0, 0, 0, .67)',
      disabled: 'rgba(0, 0, 0, 0.45)',
    },
  } as Theme['palette']
}



/* Typescript
======================== */
declare module '@mui/material/styles' {
  interface Palette {
    dividerDark: Palette['divider']
  }
  interface PaletteOptions {
    dividerDark?: PaletteOptions['divider']
  }
}

declare module '@mui/material/styles' {
  interface TypeBackground {
    bg1: string
    bg2: string
  }
}