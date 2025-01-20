import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../utils/axiosConfig';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure, startLoading } from '../state/authSlice';

interface LoginCredentials {
  email: string;
  password: string;
}

const loginUser = async (credentials: LoginCredentials) => {
  const response = await axiosInstance.post('/auth/login', credentials);
  return response.data;
};

export const useLogin = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: loginUser,
    onMutate: () => {
      dispatch(startLoading());
    },
    onSuccess: (data) => {
      dispatch(loginSuccess(data));
    },
    /* eslint-disable @typescript-eslint/no-explicit-any */
    onError: (error: any) => {
      dispatch(loginFailure(error.response.data.message));
    },
  });
};
