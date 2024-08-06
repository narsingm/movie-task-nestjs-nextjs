import { Theme } from '@mui/material'
import { Plus_Jakarta_Sans } from 'next/font/google'



const plusJakartaSansFont = Plus_Jakarta_Sans({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
})


export const createTypography = () => {
  return {
    fontFamily: `${plusJakartaSansFont.style.fontFamily}, system-ui, sans-serif`,
    h1: {
      fontSize: '1.375rem',
      fontWeight: 700,
      lineHeight: 'var(--line-height)',
    },
    h2: {
      fontSize: '1.125rem',
      fontWeight: 700,
      lineHeight: 'var(--line-height)',
    },
    h3: {
      fontSize: '0.96875rem',
      fontWeight: 650,
      lineHeight: 'var(--line-height)',
    },
    body1: {
      fontSize: '.875rem',
      lineHeight: 'var(--line-height)',
    },
    body2: {
      fontSize: '.75rem',
      fontWeight: 500,
      lineHeight: 'var(--line-height)',
    },
  } as Theme['typography']
}

export const overridesTypography = (theme: Theme) => {
  return {
    h1: theme.unstable_sx({
      color: 'text.primary',
    }),
    h2: theme.unstable_sx({
      color: 'text.primary',
    }),
    h3: theme.unstable_sx({
      color: 'text.secondary',
    }),
    body1: theme.unstable_sx({
      color: 'text.secondary',
    }),
    body2: theme.unstable_sx({
      color: 'text.disabled',
    }),
  } as Theme['typography']
}