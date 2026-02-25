import { createSlice, PayloadAction  } from "@reduxjs/toolkit";

interface AuthState {
    firstName: string | null,
    email: string | null,
    userId: string | null,
    role: string | null
}

const initialState : AuthState = {
    firstName:null,
    email:null,
    userId:null,
    role:null,
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser: (state, action:PayloadAction<AuthState>) => {
            state.firstName = action.payload.firstName,
            state.email = action.payload.email,
            state.userId = action.payload.userId,
            state.role = action.payload.role
        },
        clearUser: (state) => {
            state.firstName = state.email = state.userId = state.role = null;
        }
    }
})

export const {setUser, clearUser}  = authSlice.actions
export default authSlice.reducer