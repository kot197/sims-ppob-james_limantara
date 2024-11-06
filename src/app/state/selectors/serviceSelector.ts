import { RootState } from '../store';

export const selectServiceByCode = (state: RootState, code: string) =>
  state.reducer.serviceList.services.find(service => service.service_code === code);