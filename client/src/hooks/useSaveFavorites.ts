import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../utils/axiosConfig';
import type { Pet } from '../interfaces/Pet';

// direct interaction with cache was overkill since I'm only updating in one spot
const saveFavoriteApi = async (petId: number): Promise<string> => {
  const response = await axiosInstance.post<string>(
    `/api/users/favorite/${petId}`,
  );
  return response.data;
};

export const useSaveFavorites = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (petId: number) => saveFavoriteApi(petId),

    onMutate: async (petId: number) => {
      // Cancel outgoing refetches for all pet queries
      await queryClient.cancelQueries({ queryKey: ['pets'] });

      // Snapshot previous values for all types
      const previousPetsByType: Record<string, Pet[]> = {};
      queryClient
        .getQueryCache()
        .findAll({ queryKey: ['pets'] })
        .forEach((query) => {
          const type = query.queryKey[1] as string;
          previousPetsByType[type || ''] = (query.state.data as Pet[]) || [];
        });

      // Optimistically update all pet queries
      queryClient
        .getQueryCache()
        .findAll({ queryKey: ['pets'] })
        .forEach((query) => {
          const type = query.queryKey[1] as string;
          queryClient.setQueryData<Pet[]>(['pets', type || ''], (old = []) =>
            old.map((pet) =>
              pet.id === petId
                ? {
                    ...pet,
                    isFavorited: !pet.isFavorited,
                    num_users: pet.num_users + (!pet.isFavorited ? 1 : -1),
                  }
                : pet,
            ),
          );
        });

      // Return snapshots for rollback
      return { previousPetsByType };
    },

    onError: (_err, _petId, context) => {
      // Roll back cache updates on error
      Object.entries(context?.previousPetsByType || {}).forEach(
        ([type, pets]) => {
          queryClient.setQueryData(['pets', type], pets);
        },
      );
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
