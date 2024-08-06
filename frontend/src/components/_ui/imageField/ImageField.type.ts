import { Control } from 'react-hook-form'



export type ImageFieldProps = {
  name: string
  control: Control<any>
  helperText?: string
  label?: string
  placeholder?: string
  description?: string
}