// import { configureStore } from '@reduxjs/toolkit';
// import { applyMiddleware, combineReducers } from 'redux';
// import { legacy_createStore } from 'redux';
// import thunk from 'redux-thunk';
// import { authReducer } from '../reducers/Reducer';

// const rootReducer = combineReducers({
//     auth: authReducer

// })
// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
// import { applyMiddleware, combineReducers } from 'redux';
// import { legacy_createStore as createStore } from 'redux';
// import thunk from 'redux-thunk';
// import { authReducer } from '../reducers/Reducer';

// const rootReducer = combineReducers({
//     auth: authReducer,
// });

// export const store = createStore(rootReducer, applyMiddleware(thunk));

// export type RootState = ReturnType<typeof rootReducer>;
import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../reducers/Reducer';

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// import { configureStore } from '@reduxjs/toolkit';
// import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
// import thunk from 'redux-thunk';
// import { authReducer } from '../reducers/Reducer';

// const rootReducer = combineReducers({
//     auth: authReducer,
// });

// export const store = configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;



// // Combine reducers into a rootReducer
// const rootReducer = combineReducers({
//     transactions: transactionReducer,
// });

// // Create a Redux store using the rootReducer
// const store = configureStore({
//     reducer: rootReducer,
// });

// // Define RootState and AppDispatch types for use in your application
// export type RootState = ReturnType<typeof rootReducer>;
// export type AppDispatch = typeof store.dispatch;

// export default store;



