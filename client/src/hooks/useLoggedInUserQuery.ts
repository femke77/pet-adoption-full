import { axiosInstance } from '../utils/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import type { User } from '../interfaces/User';

const fetchUser = async (): Promise<User> => {
  const response = await axiosInstance.get<User>(`/api/users/me`, {});
  return response.data;
};

export const useSingleUserQuery = () => {
  return useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUser(),
  });
};
