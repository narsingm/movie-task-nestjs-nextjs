import { Theme } from '@mui/material'



export const overridesComponent = (theme: Theme) => {
  return {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: 'outlined',
      },
      styleOverrides: {
        root: ({ ownerState }) => theme.unstable_sx({
          textTransform: 'unset',
          ...(ownerState.variant === 'contained' && {
            fontWeight: 400,
          })
        }),
        sizeLarge: theme.unstable_sx({
          py: 1.25,
          fontSize: 'body1.fontSize',
        }),
        contained: theme.unstable_sx({
          wordSpacing: 2
        })
      }
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: theme.unstable_sx({
          borderColor: 'dividerDark',
        }),
      }
    },
    MuiFormControl: {
      defaultProps: {
        fullWidth: true,
      },
      styleOverrides: {
        root: theme.unstable_sx({
          '& > .MuiInputLabel-outlined': {
            '&.MuiInputLabel-shrink, &.MuiInputLabel-shrink ~ div > fieldset.MuiOutlinedInput-notchedOutline': {
              fontSize: `calc(${theme.typography.body1.fontSize} + 2px) !important`,
            }
          }
        })
      }
    },
    MuiLink: {
      styleOverrides: {
        root: { cursor: 'pointer' }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: theme.unstable_sx({
          ':empty': {
            mt: 0
          },
          mx: 1.75,
          '&:not(.Mui-error)': {
            fontWeight: 500,
          }
        }),
      }
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: theme.unstable_sx({
          fontSize: '1.375rem',
        })
      }
    },
    MuiPagination: {
      defaultProps: {
        shape: 'rounded',
        color: 'primary',
      },
      styleOverrides: {
        root: theme.unstable_sx({
          '.MuiPaginationItem-page': {
            fontSize: 'body1.fontSize'
          }
        })
      }
    }
  } as Theme['components']
}