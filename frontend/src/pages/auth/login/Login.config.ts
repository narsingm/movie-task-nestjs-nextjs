import { passwordTest } from '@/utils'
import * as yup from 'yup'



export const schema = yup.object({
  email: yup.string().email().trim().required().max(300),
  password: yup.string().trim().required().test(passwordTest(false)).max(100),
})

export type TSchema = yup.InferType<typeof schema>