import { Theme, createTheme } from '@mui/material'

import { createTypography, overridesTypography } from './typography'
import { createPalette } from './palette'
import { overridesComponent } from './components'
import { overridesShadows } from './shadows'



let theme = createTheme({
  palette: createPalette(),
  typography: {
    ...createTypography(),
    subtitle1: undefined,
    subtitle2: undefined
  },
  shape: {
    borderRadius: 8
  }
})


theme = createTheme(theme, {
  components: overridesComponent(theme),
  typography: overridesTypography(theme),
  shadows: overridesShadows(theme),
} as Theme)


export { theme }