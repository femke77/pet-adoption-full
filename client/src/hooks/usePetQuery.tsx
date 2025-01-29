import { axiosInstance } from '../utils/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import type { Pet } from '../interfaces/Pet';

const fetchPets = async (type?: string): Promise<Pet[]> => {
  const response = await axiosInstance.get<Pet[]>(
    `/api/pets/multi/${type?.toLowerCase() || ''}`,
    {},
  );
  return response.data;
};

export const usePetQuery = (type = '') => {
  return useQuery({
    queryKey: ['pets', type],
    queryFn: () => fetchPets(type),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 10,
    placeholderData: (previousData) => previousData ?? [],
  });
};
