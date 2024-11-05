import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Service {
    service_code: string;
    service_name: string;
    service_icon: string;
    service_tariff: number;
}

interface ServicesState {
    services: Service[];
}

const initialState: ServicesState = {
    services: [],
};

const serviceListSlice = createSlice({
    name: 'serviceList',
    initialState,
    reducers: {
      setServices: (state, action: PayloadAction<Service[]>) => {
        state.services = action.payload
      },
      clearServices: (state) => {
        state.services = [];
      }
    },
  });
  
  export const { setServices, clearServices } = serviceListSlice.actions;
  export default serviceListSlice.reducer;