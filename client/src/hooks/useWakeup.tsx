import { axiosInstance } from '../utils/axiosConfig';

const wakeUpServer = async (): Promise<string> => {
  const response = await axiosInstance.post<string>('/api/wake-up', {});
  return response.data;
};

export const useWakeUp = () => {
  wakeUpServer();
};
