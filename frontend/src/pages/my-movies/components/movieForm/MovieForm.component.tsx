import moment from 'moment'
import { LoadingButton } from '@mui/lab'
import { useRouter } from 'next/router'
import { Grid, Stack } from '@mui/material'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { MobileDatePicker } from '@mui/x-date-pickers'

import { MovieFormProps } from './MovieForm.type'
import { TSchema, schema } from './MovieForm.config'
import { useAddMovieMutation, useUpdateMovieMutation } from '@/redux/api/movie.api'
import { useUploadFileMutation } from '@/redux/api/common.api'
import ImageField from '@/components/_ui/imageField/ImageField.component'
import InputField from '@/components/_ui/inputField/InputField.component'



export default function MovieForm(props: MovieFormProps) {
  const { isEditMode, data } = props
  const router = useRouter()
  const [addMovie] = useAddMovieMutation()
  const [updateMovie] = useUpdateMovieMutation()
  const [uploadFile] = useUploadFileMutation()


  const { control, handleSubmit, formState: { isSubmitting } } = useForm<TSchema>({
    resolver: yupResolver(schema),
    defaultValues: {
      ...(isEditMode ?
        {
          isEditMode: true,
          id: router.query.id as string,
          image: data.image,
          publishingYear: data.publishingYear,
          title: data.title,
        } :
        {
          isEditMode: false
        }
      )
    }
  })


  const onSubmit = async (formData: TSchema) => {

    if (formData.image instanceof File) {
      const { filePath } = await uploadFile(formData.image).unwrap()
      formData.image = filePath
    }

    const finalData = { ...formData, image: formData.image }

    if (isEditMode) await updateMovie(finalData).unwrap()
    else await addMovie(finalData).unwrap()

    router.push('/my-movies')
  }


  return (
    <Stack component='form' noValidate onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>

        {/* Title */}
        <Grid item xs={12} sm={9}>
          <InputField name='title' label='Movie Title *' control={control} />
        </Grid>

        {/* Publishing Year */}
        <Grid item xs={12} sm={3}>
          <Controller name='publishingYear' control={control}
            render={({ fieldState: { error }, field: { ref, value, onChange, ...restField } }) =>
              <MobileDatePicker
                {...restField}
                inputRef={ref}
                label='Release year *'
                views={['year']}
                value={value ? moment(value) : null}
                onChange={value => onChange(value?.format('YYYY'))}
                slotProps={{
                  textField: { error: !!error, helperText: error?.message }
                }}
              />
            }
          />
        </Grid>

        {/* Image Upload */}
        <Grid item xs={12}>
          <ImageField name='image' placeholder='movie poster *' control={control} />
        </Grid>

        {/* Actions */}
        <Grid item xs={12}>
          <Stack direction='row' justifyContent='end' gap={1}>
            <LoadingButton variant='text' disabled={isSubmitting} onClick={() => router.push('/my-movies')}>Cancel</LoadingButton>
            <LoadingButton variant='contained' type='submit' loading={isSubmitting}>{isEditMode ? 'Update Movie' : 'Add Movie'}</LoadingButton>
          </Stack>
        </Grid>

      </Grid>
    </Stack>
  )
}
