import { Style } from '@/types/Style.type'



export const style: Style = {
  root: {
    '&:hover': {
      '.title': {
        textDecoration: 'underline',
        textUnderlineOffset: '2px',
      },
      '.poster img': {
        transform: 'scale(1.03)',
      },
    },
  },
  poster: {
    borderRadius: '8px',
    overflow: 'hidden',
    aspectRatio: '1/1.5',
    bgcolor: 'background.bg2',
    position: 'relative',
    'img': {
      transition: 'transform .5s ease',
      width: 1,
      height: 1,
      objectFit: 'cover',
    }
  }
}