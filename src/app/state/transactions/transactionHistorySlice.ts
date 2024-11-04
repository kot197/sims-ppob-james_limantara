import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Transaction {
  invoice_number: string;
  transaction_type: string;
  description: string;
  total_amount: number;
  created_on: string;
}

interface TransactionsState {
    transactions: Transaction[];
}

const initialState: TransactionsState = {
    transactions: [],
};

const transactionHistorySlice = createSlice({
    name: 'transactionHistory',
    initialState,
    reducers: {
      addTransactions: (state, action: PayloadAction<Transaction[]>) => {
        state.transactions = [...state.transactions, ...action.payload]
      },
      clearTransactions: (state) => {
        state.transactions = [];
      }
    },
  });
  
  export const { addTransactions, clearTransactions } = transactionHistorySlice.actions;
  export default transactionHistorySlice.reducer;