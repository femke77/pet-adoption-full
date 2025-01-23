import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../utils/axiosConfig';
import type { Pet } from '../interfaces/Pet';
import type { User } from '../interfaces/User';

const removeFavoriteApi = async (petId: number): Promise<string> => {
  const response = await axiosInstance.delete<string>(
    `/api/users/favorite/${petId}`,
  );
  return response.data;
};

export const useRemoveFavorites = () => {
    const queryClient = useQueryClient();
  
    const mutation = useMutation({
      mutationFn: (petId: number) => removeFavoriteApi(petId),
  
      onMutate: async (petId: number) => {
        // Cancel ongoing refetches
        await queryClient.cancelQueries({ queryKey: ['pets'] });
        await queryClient.cancelQueries({ queryKey: ['user'] });
  
        // Snapshot previous values
        const previousPets = queryClient.getQueryData<Pet[]>(['pets']);
        const previousUser = queryClient.getQueryData<User>(['user']);
  
        // Optimistically update pets list
        queryClient.setQueryData<Pet[]>(['pets'], (old = []) =>
          old.map((pet) =>
            pet.id === petId
              ? {
                  ...pet,
                  isFavorited: false,
                  num_users: Math.max(0, pet.num_users - 1),
                }
              : pet
          )
        );
  
        // Optimistically update user favorites
        queryClient.setQueryData<User>(['user'], (old) => {
          if (!old) return old;
          return {
            ...old,
            favoritePets: old.favoritePets.filter((pet) => pet.id !== petId),
          };
        });
  
        return { previousPets, previousUser };
      },
  
      onError: (_err, _petId, context) => {
        if (context?.previousPets) {
          queryClient.setQueryData(['pets'], context.previousPets);
        }
        if (context?.previousUser) {
          queryClient.setQueryData(['user'], context.previousUser);
        }
      },
  
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['pets'] });
        queryClient.invalidateQueries({ queryKey: ['user'] });
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
  