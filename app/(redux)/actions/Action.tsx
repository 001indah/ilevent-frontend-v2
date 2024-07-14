// import axios from 'axios';
// import { API_BASE_URL } from '@/app/config/apiConfig';
// import { REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from './ActionType';

// const registerRequest = () => ({ type: 'REGISTER_REQUEST' });
// const registerSuccess = (user) => ({ type: 'REGISTER_SUCCESS', payload: user });
// const registerFailure = (error) => ({ type: 'REGISTER_FAILURE', payload: error });


// export const register = (userData) => async (dispatch) => {
//     dispatch(registerRequest());
//     try {
//         const response = await axios.post(`${API_BASE_URL}/users/register', userData`);
//         const user = response.data;
//         if (user.jwt) {
//             localStorage.setItem('jwt', user.jwt);
//         }
//         dispatch(registerSuccess(user.jwt));
//     } catch (error) {
//         dispatch(registerFailure(error.message));
//     }
// }

// const loginRequest = () => ({ type: 'LOGIN_REQUEST' });
// const loginSuccess = (user) => ({ type: 'LOGIN_SUCCESS', payload: user });
// const loginFailure = (error) => ({ type: 'LOGIN_FAILURE', payload: error });
// export const login = (userData) => async (dispatch) => {

//     dispatch(loginRequest());
//     try {
//         const response = await axios.post(`${API_BASE_URL}/auth/login', userData`);
//         const user = response.data;
//         if (user.jwt) {
//             localStorage.setItem('jwt', user.jwt);
//         }
//         dispatch(loginSuccess(user.jwt));
//     } catch (error) {
//         dispatch(loginFailure(error.message));
//     }
// }

// const getUserRequest = () => ({ type: 'GET_USER_REQUEST' });
// const getUserSuccess = (user) => ({ type: 'GET_USER_SUCCESS', payload: user });
// const getUserFailure = (error) => ({ type: 'GET_USER_FAILURE', payload: error });
// export const getUser = (userData) => async (dispatch) => {

//     dispatch(getUserRequest());
//     try {
//         const response = await axios.get(`${API_BASE_URL}/users/profile`, {
//             headers: {
//                 "Authorization": `Bearer ${token}`
//             }
//         });
//         const user = response.data;


//         dispatch(getUserSuccess(user));
//     } catch (error) {
//         dispatch(getUserFailure(error.message));
//     }
// }

// export const logout = () => (dispatch) => {
//     dispatch({ type: 'LOGOUT' });
// }

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { authRequest, authSuccess, authFailure, getUserSuccess, logout } from '../reducers/Reducer';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://ilevent-backend-utzhltu6pq-as.a.run.app/api/v1';

export const register = createAsyncThunk(
    'auth/register',
    async (userData: any, { dispatch }) => {
        dispatch(authRequest());
        try {
            const response = await axios.post(`${API_BASE_URL}/users/register`, userData);
            const { jwt } = response.data;
            localStorage.setItem('jwt', jwt);
            dispatch(authSuccess(jwt));
            return jwt;
        } catch (error: any) {
            dispatch(authFailure(error.message));
            throw error;
        }
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (userData: any, { dispatch }) => {
        dispatch(authRequest());
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
            const { jwt } = response.data;
            localStorage.setItem('jwt', jwt);
            dispatch(authSuccess(jwt));
            return jwt;
        } catch (error: any) {
            dispatch(authFailure(error.message));
            throw error;
        }
    }
);

export const getUser = createAsyncThunk(
    'auth/getUser',
    async (_, { dispatch, getState }) => {
        dispatch(authRequest());
        try {
            const { auth } = getState() as { auth: { jwt: string } };
            const response = await axios.get(`${API_BASE_URL}/users/profile`, {
                headers: {
                    "Authorization": `Bearer ${auth.jwt}`
                }
            });
            dispatch(getUserSuccess(response.data));
            return response.data;
        } catch (error: any) {
            dispatch(authFailure(error.message));
            throw error;
        }
    }
);

export const logoutAction = () => (dispatch: any) => {
    localStorage.removeItem('jwt');
    dispatch(logout());
};
// import axios from 'axios';
// import { Dispatch } from 'redux';
// import {
//     REGISTER_REQUEST,
//     REGISTER_SUCCESS,
//     REGISTER_FAILURE,
//     LOGIN_REQUEST,
//     LOGIN_SUCCESS,
//     LOGIN_FAILURE,
//     GET_USER_REQUEST,
//     GET_USER_SUCCESS,
//     GET_USER_FAILURE,
//     LOGOUT,
// } from './ActionType';

// interface UserData {
//     email: string;
//     password: string;
//     name?: string;
// }

// interface AuthResponse {
//     jwt: string;
// }

// const registerRequest = () => ({ type: REGISTER_REQUEST });
// const registerSuccess = (jwt: string) => ({ type: REGISTER_SUCCESS, payload: jwt });
// const registerFailure = (error: string) => ({ type: REGISTER_FAILURE, payload: error });

// export const register = (userData: UserData) => async (dispatch: Dispatch) => {
//     dispatch(registerRequest());
//     try {
//         const response = await axios.post<AuthResponse>(`${API_BASE_URL}/users/register`, userData);
//         const { jwt } = response.data;
//         if (jwt) {
//             localStorage.setItem('jwt', jwt);
//         }
//         dispatch(registerSuccess(jwt));
//     } catch (error: any) {
//         dispatch(registerFailure(error.message));
//     }
// };

// const loginRequest = () => ({ type: LOGIN_REQUEST });
// const loginSuccess = (jwt: string) => ({ type: LOGIN_SUCCESS, payload: jwt });
// const loginFailure = (error: string) => ({ type: LOGIN_FAILURE, payload: error });

// export const login = (userData: UserData) => async (dispatch: Dispatch) => {
//     dispatch(loginRequest());
//     try {
//         const response = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/login`, userData);
//         const { jwt } = response.data;
//         if (jwt) {
//             localStorage.setItem('jwt', jwt);
//         }
//         dispatch(loginSuccess(jwt));
//     } catch (error: any) {
//         dispatch(loginFailure(error.message));
//     }
// };

// const getUserRequest = () => ({ type: GET_USER_REQUEST });
// const getUserSuccess = (user: any) => ({ type: GET_USER_SUCCESS, payload: user });
// const getUserFailure = (error: string) => ({ type: GET_USER_FAILURE, payload: error });

// export const getUser = (token: string) => async (dispatch: Dispatch) => {
//     dispatch(getUserRequest());
//     try {
//         const response = await axios.get(`${API_BASE_URL}/users/profile`, {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//             },
//         });
//         const user = response.data;
//         dispatch(getUserSuccess(user));
//     } catch (error: any) {
//         dispatch(getUserFailure(error.message));
//     }
// };

// export const logout = () => (dispatch: Dispatch) => {
//     localStorage.removeItem('jwt');
//     dispatch({ type: LOGOUT });
// };
