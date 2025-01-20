import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../utils/axiosConfig';

const saveFavorite = async (petId: number): Promise<string> => {
  const response = await axiosInstance.post<string>(
    `/api/users/favorite/${petId}`,
  );
  return response.data;
};

export const useSaveFavorites = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (petId: number) => saveFavorite(petId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['pets'],
      });
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
