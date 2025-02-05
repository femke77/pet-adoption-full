import { axiosInstance } from '../utils/axiosConfig';
import { useQuery } from '@tanstack/react-query';

const fetchStatusCheck = async (session_id: string) => {
  try {
    const response = await axiosInstance.get(
      `/api/pets/donate/status-check/${session_id}`,
    );
    return response.data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const useStatusCheck = (session_id: string) => {
  return useQuery({
    queryKey: ['statusCheck', session_id],
    queryFn: () => fetchStatusCheck(session_id),
  });
};
