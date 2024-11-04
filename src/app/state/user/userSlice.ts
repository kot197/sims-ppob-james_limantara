import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
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
        updateUser(state, action: PayloadAction<Partial<UserState>>) {
            // Update specific user fields
            Object.assign(state, action.payload);
        },
        clearUser(state) {
            // Clear user data
            Object.assign(state, initialState);
        }
    }
});

export const { setUser, updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;