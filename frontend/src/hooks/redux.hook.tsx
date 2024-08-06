import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/redux/store/store'



export const useReduxDispatch: () => AppDispatch = useDispatch
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector