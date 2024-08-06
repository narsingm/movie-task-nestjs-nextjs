import { Style } from '@/types'



export const style: Style = {
  standardVariant: {
    height: 1,
    width: 1,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 2,
    'svg': {
      flexShrink: 0,
    },
    '.ant-empty-img-1': {
      fill: '#aeb8c2',
    },
    '.ant-empty-img-2': {
      fill: '#f5f5f7',
    },
    '.ant-empty-img-3': {
      fill: '#dce0e6',
    },
    '.ant-empty-img-4': {
      fill: '#fff',
    },
    '.ant-empty-img-5': {
      fillOpacity: '0.8',
      fill: '#f5f5f5',
    },
  },
  messageVariant: {
    height: 1,
    width: 1,
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'text.disabled',
  }
}