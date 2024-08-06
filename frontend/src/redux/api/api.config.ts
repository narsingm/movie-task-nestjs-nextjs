import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'



export const api = createApi({
  reducerPath: 'apis',
  tagTypes: ['movie', 'profile'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: 'include',
  }),
  endpoints: () => ({}),
})