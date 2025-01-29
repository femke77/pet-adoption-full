import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../utils/axiosConfig";


const stripeCheckoutApi = async (amount: string): Promise<string> => {
  const response = await axiosInstance.post(`/api/pets/donate`, {
    amount,
  });
  return response.data;
};

export const useStripeCheckout = () => {
  const mutation =  useMutation({
    mutationFn: stripeCheckoutApi

   

  });
  return { checkout: mutation.mutateAsync, isPending: mutation.isPending };};
