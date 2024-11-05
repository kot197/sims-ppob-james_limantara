import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Banner {
  banner_name: string;
  banner_image: string;
  description: string;
}

interface BannersState {
    banners: Banner[];
}

const initialState: BannersState = {
    banners: [],
};

const promoSlice = createSlice({
    name: 'promo',
    initialState,
    reducers: {
      setBanners: (state, action: PayloadAction<Banner[]>) => {
        state.banners = action.payload
      },
      clearBanners: (state) => {
        state.banners = [];
      }
    },
  });
  
  export const { setBanners, clearBanners } = promoSlice.actions;
  export default promoSlice.reducer;