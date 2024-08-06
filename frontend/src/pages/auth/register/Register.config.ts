import * as yup from 'yup'
import { passwordTest, stringTest } from '@/utils'



export const schema = yup.object({
  name: yup.string().trim().required().max(150).test(stringTest),
  email: yup.string().email().trim().required().max(300),
  password: yup.string().trim().required().test(passwordTest(true)).max(100),
})

export type TSchema = yup.InferType<typeof schema>