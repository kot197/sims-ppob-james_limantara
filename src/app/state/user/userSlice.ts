import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
    email: string;
    first_name: string;
    last_name: string;
    profile_image: string;
}

const initialState: UserState = {
    email: '',
    first_name: '',
    last_name: '',
    profile_image: ''
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<UserState>) {
            console.log("Payload in setUser:", action.payload);
            // Set all user data at once
            state.email = action.payload.email;
            state.first_name = action.payload.first_name;
            state.last_name = action.payload.last_name;
            state.profile_image = action.payload.profile_image;
        },
    }
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;