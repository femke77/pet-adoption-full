import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../utils/axiosConfig';
import type { Pet } from '../interfaces/Pet';

const saveFavoriteApi = async (petId: number): Promise<string> => {
  const response = await axiosInstance.post<string>(`/api/users/favorite/${petId}`);
  return response.data;
};

export const useSaveFavorites = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (petId: number) => saveFavoriteApi(petId),
    
    onMutate: async (petId: number) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['pets'] });

      // Snapshot the previous value
      const previousPets = queryClient.getQueryData<Pet[]>(['pets']);

      // Optimistically update both isFavorited and num_users
      queryClient.setQueryData<Pet[]>(['pets'], (old = []) => {
        return old.map(pet => {
          if (pet.id === petId) {
            const willBeFavorited = !pet.isFavorited;
            return {
              ...pet,
              isFavorited: willBeFavorited,
              num_users: pet.num_users + (willBeFavorited ? 1 : -1)
            };
          }
          return pet;
        });
      });

      return { previousPets };
    },

    onError: (_err, _petId, context) => {
      // Revert to the previous state on error
      queryClient.setQueryData(['pets'], context?.previousPets);
    },

    onSettled: () => {
      // Refetch to ensure consistency
      queryClient.invalidateQueries({ queryKey: ['pets'] });
    },
  });

  return {
    saveFavorite: mutation.mutateAsync,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
    isPending: mutation.isPending,
    error: mutation.error,
  };
};