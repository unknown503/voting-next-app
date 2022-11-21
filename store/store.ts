import { configureStore } from '@reduxjs/toolkit'
// import { createWrapper } from 'next-redux-wrapper'
import userSlice from './user/userSlice'

export const store = configureStore({
    reducer: {
        user: userSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// export type AppStore = ReturnType<typeof store>;
// export type AppState = ReturnType<AppStore['getState']>;

// export const wrapper = createWrapper<AppStore>(store)