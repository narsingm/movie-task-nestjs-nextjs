import { TextFieldProps } from '@mui/material'
import { Control } from 'react-hook-form'



export type FileUploadFieldProps = Omit<TextFieldProps, 'label' | 'placeholder'> & {
  name: string
  control: Control<any>
  accept?: string
  label?: string
  loading?: boolean
  loadingText?: string
  failed?: boolean
} 