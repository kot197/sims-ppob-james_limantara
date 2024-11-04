import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const balanceSlice = createSlice({
    name: 'balance',
    initialState: { amount: 0 },
    reducers: {
        setBalance: (state, action: PayloadAction<number>) => {
            state.amount = action.payload;
        },
        incrementBalanceByAmount: (state, action: PayloadAction<number>) => {
            state.amount += action.payload;
        },
        clearBalance: (state) => {
            state.amount = 0;
        }
    }
});

export const { setBalance, incrementBalanceByAmount, clearBalance } = balanceSlice.actions;
export default balanceSlice.reducer;