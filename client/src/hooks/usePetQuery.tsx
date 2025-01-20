import { axiosInstance } from '../utils/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import type { Pet } from '../interfaces/Pet';

const fetchPets = async (): Promise<Pet[]> => {
  const response = await axiosInstance.get<Pet[]>('/api/pets/multi', {});
  return response.data;
};

export const usePetQuery = () => {
  return useQuery({
    queryKey: ['pets'],
    queryFn: () => fetchPets(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    placeholderData: (previousData) => previousData ?? [],
  });
};
