import * as yup from 'yup'
import { fileSizeTest } from '@/utils'



export const schema = yup.object({
  isEditMode: yup.boolean().required(),
  id: yup.string().when('isEditMode', {
    is: true,
    then: schema => schema.required(),
    otherwise: schema => schema.notRequired(),
  }),
  title: yup.string().trim().required().max(300),
  publishingYear: yup.string().required(),
  image: yup.mixed<File | string>().required().test('required', 'Required *', e => !!e).test('fileSize', 'File size limit is 5 MB', value => fileSizeTest({ value, size: 5 })),
})


export type TSchema = yup.InferType<typeof schema>