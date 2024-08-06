import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { removeCookie } from '@/utils'



export const layoutSlice = createSlice({
  name: 'layout',
  initialState: {
    isWebsiteLoading: true,
    isLoggedIn: false
  },
  reducers: {
    handleLayoutState: (state, action: PayloadAction<{ isWebsiteLoading: boolean, isLoggedIn: boolean }>) => {
      state.isWebsiteLoading = action.payload.isWebsiteLoading
      state.isLoggedIn = action.payload.isLoggedIn
    },
  }
})


export const {
  handleLayoutState,
} = layoutSlice.actions