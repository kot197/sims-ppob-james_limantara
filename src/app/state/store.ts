import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import userReducer from './user/userSlice';
import counterReducer from './counter/counterSlice';
import balanceReducer from './balance/balanceSlice';
import transactionHistoryReducer from './transactions/transactionHistorySlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      user: userReducer,
      counter: counterReducer,
      balance: balanceReducer,
      transactionHistory: transactionHistoryReducer,
    },
  });
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']