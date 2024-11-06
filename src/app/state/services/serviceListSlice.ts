import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Service {
    service_code: string;
    service_name: string;
    service_icon: string;
    service_tariff: number;
}

interface ServicesState {
    services: Service[];
    on_route: string;
}

const initialState: ServicesState = {
    services: [],
    on_route: ''
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
      },
      setServiceRoute: (state, action) => {
        state.on_route = action.payload;
      }
    },
  });
  
  export const { setServices, clearServices, setServiceRoute } = serviceListSlice.actions;
  export default serviceListSlice.reducer;