import { api } from './api.config'
import { MovieDTO } from '@/dto/Movie.dto'
import { PaginationApiResponse } from '@/types/PaginationApiResponse.type'



export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({

    addMovie: builder.mutation<void, Partial<MovieDTO>>({
      query: (body) => ({ url: '/movies', method: 'POST', body }),
      invalidatesTags: (result, error) => !error ? [{ type: 'movie', id: 'LIST' }] : [],
    }),

    updateMovie: builder.mutation<void, Partial<MovieDTO>>({
      query: ({ id, ...body }) => ({ url: `/movies/${id}`, method: 'PUT', body }),
      invalidatesTags: (result, error, { id }) => !error ? [{ type: 'movie', id }] : [],
    }),

    deleteMovie: builder.mutation<void, string>({
      query: (id) => ({ url: `/movies/${id}`, method: 'DELETE' }),
      invalidatesTags: (result, error, id) => !error ? [{ type: 'movie', id }, { type: 'movie', id: 'LIST' }] : [],
    }),

    getMovie: builder.query<MovieDTO, string>({
      query: (id) => `/movies/${id}`,
      providesTags: (result, error, id) => !error ? [{ type: 'movie', id }] : []
    }),

    getMovieList: builder.query<PaginationApiResponse<MovieDTO>, { page: number, limit: number }>({
      query: (params) => ({ url: '/movies/all', params }),
      providesTags: (result, error) => !error ? [...result!.list.map(({ id }) => ({ type: 'movie' as const, id })), { type: 'movie', id: 'LIST' }] : [{ type: 'movie', id: 'LIST' }]
    }),

  })
})


export const {
  useAddMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
  useGetMovieQuery,
  useGetMovieListQuery,
} = extendedApi