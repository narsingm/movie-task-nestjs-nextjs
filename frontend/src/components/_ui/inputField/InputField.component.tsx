import { TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

import { InputFieldProps } from './InputField.type'



export default function InputField(props: InputFieldProps): JSX.Element {
  const { control, name, onChange, onBlur, ...restProps } = props
  const isNumber = restProps.type === 'number'

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={isNumber ? null : ''}
      render={({ fieldState: { error }, field }) => {

        const { ref, value, ...restField } = field

        return (
          <TextField
            {...restField}
            {...restProps}
            value={value || ''}
            inputRef={ref}
            error={!!error}
            onBlur={e => {
              restField.onBlur()
              onBlur && onBlur(e)
            }}
            onChange={e => {
              const newValue = isNumber ? e.target.value || null : e.target.value
              onChange ? onChange(e, field, newValue) : restField.onChange(newValue)
            }}
            helperText={error ? error?.message : restProps.helperText}
          />
        )
      }}
    />
  )
}
