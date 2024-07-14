// import { error } from "console"
// import { GET_USER_REQUEST, GET_USER_SUCCESS, lOGIN_FAILURE, lOGIN_REQUEST, lOGIN_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS, LOGOUT, GET_USER_FAILURE } from "../actions/ActionType"

// const initialState = {
//     user: null,
//     isLoading: false,
//     isError: false,
//     jwt: null
// }
// export const authReducer = (state = initialState, action) => {
//     switch (action.type) {
//         case REGISTER_REQUEST:
//         case lOGIN_REQUEST:
//         case GET_USER_REQUEST:
//             return {
//                 ...state,
//                 isLoading: true, error: null
//             }

//         case REGISTER_SUCCESS:
//         case lOGIN_SUCCESS:
//             return {
//                 ...state,
//                 isLoading: false,
//                 error: null,
//                 jwt: action.payload
//             }
//         case GET_USER_SUCCESS:
//             return { ...state, isLoading: false, error: null, user: action.payload }
//         case REGISTER_FAILURE:
//         case lOGIN_FAILURE:
//         case GET_USER_FAILURE:
//             return {
//                 ...state,
//                 isLoading: false,
//                 error: action.payload
//             }
//         case LOGOUT:
//             return {
//                 ...initialState
//             }
//         default:
//             return state;

//     }

// }

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    user: any | null;
    isLoading: boolean;
    error: string | null;
    jwt: string | null;
}

const initialState: AuthState = {
    user: null,
    isLoading: false,
    error: null,
    jwt: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authRequest: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        authSuccess: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = null;
            state.jwt = action.payload;
        },
        getUserSuccess: (state, action: PayloadAction<any>) => {
            state.isLoading = false;
            state.error = null;
            state.user = action.payload;
        },
        authFailure: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        logout: (state) => {
            return initialState;
        },
    },
});

export const { authRequest, authSuccess, getUserSuccess, authFailure, logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
// import {
//     GET_USER_REQUEST,
//     GET_USER_SUCCESS,
//     LOGIN_FAILURE,
//     LOGIN_REQUEST,
//     LOGIN_SUCCESS,
//     REGISTER_FAILURE,
//     REGISTER_REQUEST,
//     REGISTER_SUCCESS,
//     LOGOUT,
//     GET_USER_FAILURE
// } from '../actions/ActionType';

// interface AuthState {
//     user: User | null;
//     isLoading: boolean;
//     isError: boolean;
//     error: string | null;
//     jwt: string | null;
// }

// interface User {
//     id: string;
//     name: string;
//     email: string;
// }

// interface AuthAction {
//     type: string;
//     payload?: any;
// }

// const initialState: AuthState = {
//     user: null,
//     isLoading: false,
//     isError: false,
//     error: null,
//     jwt: null,
// };

// export const authReducer = (state = initialState, action: AuthAction): AuthState => {
//     switch (action.type) {
//         case REGISTER_REQUEST:
//         case LOGIN_REQUEST:
//         case GET_USER_REQUEST:
//             return {
//                 ...state,
//                 isLoading: true,
//                 isError: false,
//                 error: null,
//             };
//         case REGISTER_SUCCESS:
//         case LOGIN_SUCCESS:
//             return {
//                 ...state,
//                 isLoading: false,
//                 isError: false,
//                 jwt: action.payload,
//                 error: null,
//             };
//         case GET_USER_SUCCESS:
//             return {
//                 ...state,
//                 isLoading: false,
//                 isError: false,
//                 user: action.payload,
//                 error: null,
//             };
//         case REGISTER_FAILURE:
//         case LOGIN_FAILURE:
//         case GET_USER_FAILURE:
//             return {
//                 ...state,
//                 isLoading: false,
//                 isError: true,
//                 error: action.payload,
//             };
//         case LOGOUT:
//             return initialState;
//         default:
//             return state;
//     }
// };
