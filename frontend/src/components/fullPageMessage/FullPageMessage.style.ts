import { Style } from '@/types'



export const style: Style = {
  root: {
    my: 10,
  },
  container: {
    textAlign: 'center',
    alignItems: 'center',
    gap: 2,
    '.icon': {
      fontSize: 65,
      mb: 1,
      '&.error': {
        color: 'error.main',
      },
      '&.success': {
        color: 'success.light',
      }
    }
  },
  reloadButton: {
    px: 3,
  }
}