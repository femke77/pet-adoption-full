import { useStatusCheck } from '../hooks/useStatusCheck';
import { useParams } from 'react-router-dom';

const Success = () => {
  const { session_id } = useParams<{ session_id: string }>();
  const { data, isLoading, isError } = useStatusCheck(session_id!);
  const { payment_status, amount_total, customer_details } = data || {};
  const amount = amount_total ? Math.round(amount_total / 100).toFixed(2) : '0.00';

  if (isLoading)
    return (
      <div className='text-center text-lg text-indigo-800'>Loading...</div>
    );
  if (isError)
    return (
      <div className='text-red-500 ml-12'>
        An error has occurred. Try again later.
      </div>
    );

  return (
    <>
      {data && payment_status === 'paid' ? (
        <div className='success'>
          <h2 className='font-cuteCat mt-4 text-3xl/[1.5] md:text-5xl/[1.5] lg:text-6xl/[1.5] text-center font-bold pt-3 mx-12  mb-2 px-2'>
            Your donation of ${amount} has been received. <br />
            Thank you for your donation, {customer_details?.name}! 🐾
          </h2>
        </div>
      ) : (
        <p className='text-red-700'>Oh, no. Something went wrong with your payment.</p>
      )}
    </>
  );
};

export default Success;
