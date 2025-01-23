import { axiosInstance } from '../utils/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import type { User } from '../interfaces/User';

const fetchUser = async (id?: number): Promise<User> => {
  const response = await axiosInstance.get<User>(`/api/users/user/${id || ''}`, {});
  return response.data;
};

export const useSingleUserQuery = (id?: number) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => fetchUser(id),


  });
};
