import { ChangeEvent } from 'react'
import { FormControl, FormLabel, IconButton, Stack, TextField, Fade, CircularProgress } from '@mui/material'
import { Controller } from 'react-hook-form'
import { MdCheck, MdClose, MdRemoveRedEye, MdOutlineReportProblem } from 'react-icons/md'

import { FileUploadFieldProps } from './FileUploadField.type'



export default function FileUploadField(props: FileUploadFieldProps) {
  const { name, control, label, accept = '', loading, loadingText = 'Uploading...', failed, ...restProps } = props


  return (
    <Controller
      name={name}
      control={control}
      defaultValue=''
      render={({ fieldState: { error }, field: { ref, onChange, value, ...restField } }) => {

        const handleChange = ({ target: { files } }: ChangeEvent<HTMLInputElement>) => {
          if (!files?.length) return
          onChange(files[0])
        }

        const link = value ? value instanceof File ? URL.createObjectURL(value as File) : value : ''

        return (
          <FormControl error={!!error}>
            {label && <FormLabel sx={{ lineHeight: 1, mb: .75, mt: -.25 }}>{label}</FormLabel>}

            <TextField
              {...restProps}
              {...restField}
              inputRef={ref}
              error={!!error}
              onChange={handleChange}
              inputProps={{ accept }}
              type={(value || loading) ? 'text' : 'file'}
              helperText={error ? error?.message : restProps.helperText}
              InputProps={{
                readOnly: (value || loading) ? true : false,
                startAdornment: <>{
                  loading ?
                    <Fade in>
                      <Stack direction='row' alignItems='center' gap={1}>
                        <CircularProgress size={20} /> {loadingText}
                      </Stack>
                    </Fade>
                    :
                    value &&
                    (failed ?
                      <Fade in>
                        <Stack direction='row' alignItems='center' gap={1}>
                          <MdOutlineReportProblem /> Not&nbsp;Uploaded
                        </Stack>
                      </Fade>
                      :
                      <Fade in>
                        <Stack direction='row' alignItems='center' gap={1}>
                          <MdCheck /> Uploaded
                        </Stack>
                      </Fade>
                    )
                }</>,
                endAdornment: <>{
                  (value && !loading) &&
                  <Stack direction='row'>
                    <Fade in>
                      <IconButton color='inherit' LinkComponent='a' href={link} target='_blank'>
                        <MdRemoveRedEye />
                      </IconButton>
                    </Fade>
                    <Fade in>
                      <IconButton color='inherit' onClick={() => onChange('')}>
                        <MdClose />
                      </IconButton>
                    </Fade>
                  </Stack>
                }</>
              }}
            />
          </FormControl>
        )
      }}
    />
  )
}
