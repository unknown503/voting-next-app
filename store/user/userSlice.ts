import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export const initialState: IUserState = {
    id: "",
    name: "",
    vote: null,
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserState: (state, action: PayloadAction<IUserState>) => {
            state.id = action.payload.id
            state.name = action.payload.name
            state.vote = action.payload.vote
        },
        setUserVote: (state, action: PayloadAction<string>) => {
            state.vote = action.payload
        },
    }
})

export const { setUserState, setUserVote } = userSlice.actions

export default userSlice.reducer