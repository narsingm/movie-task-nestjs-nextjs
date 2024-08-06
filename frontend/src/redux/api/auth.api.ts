import { api } from './api.config'
import { removeCookie } from '@/utils'
import { ProfileDTO } from '@/dto/Profile.dto'



export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation<{ token: string }, { email: string, password: string }>({
      query: (body) => ({
        url: '/auth/login',
        method: 'POST',
        body,
        headers: { hideToast: 'true' },
      }),
    }),

    register: builder.mutation<{ token: string }, { name: string, email: string, password: string }>({
      query: (body) => ({
        url: '/auth/register',
        method: 'POST',
        body,
        headers: { hideToast: 'true' },
      }),
    }),

    getProfile: builder.query<ProfileDTO, void>({
      query: () => `/auth/profile`,
      providesTags: ['profile'],
      async onQueryStarted(arg, { queryFulfilled }) {
        await queryFulfilled.catch(error => {
            if (error?.meta?.response?.status === 401) {
              removeCookie('token')
              window.location.replace('/auth/login')
            }
          }
        )
      }
    }),

  })
})


export const {
  useLoginMutation,
  useRegisterMutation,
  useLazyGetProfileQuery,
} = extendedApi