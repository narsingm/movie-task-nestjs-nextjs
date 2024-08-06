import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { api } from '../api/api.config'
import { rtkQueryLogger } from '../api/api.util'
import { layoutSlice } from '../slice/layout.slice'



export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [layoutSlice.name]: layoutSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware, rtkQueryLogger),
})

setupListeners(store.dispatch)


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch