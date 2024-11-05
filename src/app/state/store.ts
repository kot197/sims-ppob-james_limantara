import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import userReducer from './user/userSlice';
import counterReducer from './counter/counterSlice';
import balanceReducer from './balance/balanceSlice';
import transactionHistoryReducer from './transactions/transactionHistorySlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

const persistConfig = {
  key: "root",
  storage
}

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  counter: counterReducer,
  balance: balanceReducer,
  transactionHistory: transactionHistoryReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const makeStore = () => {
  return configureStore({
    reducer: {
      reducer: persistedReducer,
    },
  });
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']