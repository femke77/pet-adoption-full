// hooks/useAuth.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../state/authSlice';
import { axiosInstance } from '../utils/axiosConfig';

export const useLogout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return axiosInstance.post('/auth/logout');
    },
    onSuccess: () => {
      // Clear Redux state
      dispatch(logout());
      // Clear React Query cache
      queryClient.clear();
      // Navigate to home
      navigate('/');
    },
    onError: (error) => {
      console.error('Logout failed:', error);
      // Still clear state and navigate even if server logout fails
      dispatch(logout());
      queryClient.clear();
      navigate('/');
    },
  });

  return logoutMutation;
};
