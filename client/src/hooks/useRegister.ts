import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../utils/axiosConfig';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure, startLoading } from '../state/authSlice';

interface RegisterCredentials {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  username: string;
}

const registerUser = async (credentials: RegisterCredentials) => {
  const response = await axiosInstance.post('/auth/register', credentials);
  return response.data;
};

export const useRegister = () => {
  const dispatch = useDispatch();

  return useMutation({
    mutationFn: registerUser,
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
