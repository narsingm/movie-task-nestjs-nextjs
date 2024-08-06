import Link from 'next/link'
import { useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { Link as MuiLink, IconButton, Stack, Typography, Container } from '@mui/material'

import InputField from '@/components/_ui/inputField/InputField.component'
import { style } from './Login.style'
import { Page } from '@/types'
import { schema, TSchema } from './Login.config'
import { useLoginMutation } from '@/redux/api/auth.api'



const Login: Page = () => {
  const [login] = useLoginMutation()
  const [showPassword, setShowPassword] = useState<boolean>(false)


  const { control, handleSubmit, formState: { isSubmitting } } = useForm<TSchema>({
    resolver: yupResolver(schema)
  })


  const onSubmit = async (formData: TSchema) => {
    await login({ ...formData }).unwrap()
    window.location.href = '/my-movies'
  }


  return <>
    <Container className='section-spacing-my'>
      <Stack component='form' onSubmit={handleSubmit(onSubmit)} noValidate sx={style.box}>
        <Typography variant='h1' textAlign='center'>Login</Typography>

        {/* Fields */}
        <Stack gap={2}>

          {/* Email */}
          <InputField name='email' label='Email' control={control} />

          {/* Password */}
          <InputField name='password' label='Password' type={showPassword ? 'text' : 'password'} control={control}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowPassword(v => !v)}>
                  {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                </IconButton>
              )
            }}
          />

        </Stack>

        {/* Actions */}
        <LoadingButton variant='contained' size='large' type='submit' loading={isSubmitting}>Login</LoadingButton>
        <Typography textAlign='center'>Don't have an account? &nbsp; <MuiLink component={Link} href='/auth/register'>Register</MuiLink></Typography>

      </Stack>
    </Container>

    {/* Box Center Style */}
    <style global jsx>{`
      main{
        display:flex;
        justify-content:center;
        align-items:center;
      }
    `}</style>
  </>
}


Login.layoutProps = {
  pageType: 'auth',
  title: 'Login',
}

export default Login