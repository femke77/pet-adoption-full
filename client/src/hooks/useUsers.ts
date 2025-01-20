import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '../utils/axiosConfig';
import type { User } from '../interfaces/User';

const fetchUsers = async (): Promise<User[]> => {
  const response = await axiosInstance.get<User[]>('/api/users', {});
  return response.data;
};

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    placeholderData: (previousData) => previousData,
  });
};
