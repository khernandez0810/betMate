import {configureStore, combineReducers} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducers'

const rootReducer = combineReducers({
    auth: authReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk]
});


export default store;