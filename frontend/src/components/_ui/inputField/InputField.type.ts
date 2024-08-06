import { ChangeEvent } from 'react'
import { TextFieldProps } from '@mui/material'
import { Control, ControllerRenderProps } from 'react-hook-form'



export type InputFieldProps = Omit<TextFieldProps, 'onChange'> & {
  name: string
  control: Control<any>
  onChange?: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: ControllerRenderProps, value: string | null) => void
} 