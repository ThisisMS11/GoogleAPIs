import { createSlice } from '@reduxjs/toolkit'
export const userSlice = createSlice({
    name: 'User',
    initialState: {
        user: null,
        isAuthenticated: false,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setIsAuthenticated: (state, action) => {
            state.isAuthenticated = action.payload;
        }
    }
})
export const { setUser, setIsAuthenticated } = userSlice.actions;