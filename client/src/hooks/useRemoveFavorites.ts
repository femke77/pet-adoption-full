import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../utils/axiosConfig';
import type { Pet } from '../interfaces/Pet';

const removeFavoriteApi = async (petId: number): Promise<string> => {
  const response = await axiosInstance.delete<string>(`/api/users/favorite/${petId}`);
  return response.data;
};

export const useRemoveFavorites = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (petId: number) => removeFavoriteApi(petId),
    
    // Optimistic update configuration
    onMutate: async (petId: number) => {
      // Cancel any outgoing refetches to avoid overwriting our optimistic update
      await queryClient.cancelQueries({ queryKey: ['pets'] });

      // Snapshot the previous value
      const previousPets = queryClient.getQueryData<Pet[]>(['pets']);

      // Optimistically update the pets data
      queryClient.setQueryData<Pet[]>(['pets'], (old = []) => {
        return old.map(pet => 
          pet.id === petId 
            ? { 
                ...pet, 
                isFavorited: !pet.isFavorited ,
                num_users: pet.num_users + (pet.isFavorited ? -1 : 1)
            }
            : pet
        );
      });

      // Return the snapshot for rollback in case of error
      return { previousPets };
    },

    // If mutation fails, use the context returned from onMutate to roll back
    onError: (_err, _petId, context) => {
      queryClient.setQueryData(['pets'], context?.previousPets);
    },

    // After success or failure, refetch to ensure server/client state consistency
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] });
    },
  });

  return {
    removeFavorite: mutation.mutateAsync,
    isSuccess: mutation.isSuccess,
    data: mutation.data,
    isPending: mutation.isPending,
    error: mutation.error,
  };
};