import { api } from './api.config'



export const extendedApi = api.injectEndpoints({
  endpoints: (builder) => ({

    uploadFile: builder.mutation<{ filePath: string }, File>({
      query: (file) => {

        const formData = new FormData()
        formData.append('file', file)

        return {
          url: '/uploadfile',
          method: 'POST',
          formData: true,
          body: formData,
          headers: { hideToast: 'true' },
        }
      }
    })

  })
})


export const {
  useUploadFileMutation,
} = extendedApi