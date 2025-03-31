import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/store";
import axios from "axios";
import {jwtDecode} from "jwt-decode";

interface UserState {
    userId: string | null;
    username: string | null;
    permission?: string | null;
    token: string | null;
}

const initialState: UserState = {
    userId: null,
    username: null,
    permission: null,
    token: null,
};

export const checkAuth = createAsyncThunk<UserState, void>(
    "auth/checkAuth",
    async (_, { rejectWithValue, getState }) => {
        try {
            const state = getState() as RootState;
            const token = state.auth.token || localStorage.getItem("token");
            if (!token) {
                return rejectWithValue("No token found");
            }

            const response = await axios.get('/api/auth/proxy', {
                headers: {
                    Authorization: `${token}`,
                },
            });

            if (response.status !== 200) {
                return rejectWithValue("Invalid status");
            }

            const decoded: { username: string; userID: string } = jwtDecode(token);

            return { userId: decoded.userID, username: decoded.username, permission: null, token };
        } catch (error) {
            console.error("Auth check failed:", error);
            return rejectWithValue("Auth check failed");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<UserState>) => {
            state.userId = action.payload.userId;
            state.username = action.payload.username;
            state.permission = action.payload.permission;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.userId = null;
            state.username = null;
            state.permission = null;
            state.token = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.fulfilled, (state, action: PayloadAction<UserState>) => {
                state.userId = action.payload.userId;
                state.username = action.payload.username;
                state.permission = action.payload.permission;
                state.token = action.payload.token;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.userId = null;
                state.username = null;
                state.permission = null;
                state.token = null;
            });
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authSlice.reducer;
