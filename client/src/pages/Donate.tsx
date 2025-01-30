import { useForm } from 'react-hook-form';
import { useStripeCheckout } from '../hooks/useStripeCheckout';
import { loadStripe } from '@stripe/stripe-js';

const key = import.meta.env.VITE_STRIPE_PUBLIC_KEY!;
console.log(key);

const stripePromise = loadStripe(key);

interface FormInput {
  amount: string;
}

const Donate = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInput>();

  const { checkout, isPending } = useStripeCheckout();

  const formatAmount = (value: string) => {
    const num = parseFloat(value);
    return isNaN(num) ? '' : num.toFixed(2);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(rawValue)) {
        setValue("amount", rawValue, { shouldValidate: true });
    }
};

  const onSubmit: (data: FormInput) => void = async (data: FormInput) => {
    const stripe = await stripePromise;
    if (!stripe) return;

    try {
      const sessionId = await checkout(data.amount);
      console.log('sessionId', sessionId);

      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Checkout failed', error);
    }
  };
  return (
    <div>
      <h1>Donate</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Amount </label> 
        $<input
          type='text'
          placeholder='Enter amount'
          {...register('amount', { required: true })}
          onChange={handleAmountChange} 
          onBlur={(e) => setValue('amount', formatAmount(e.target.value))}
        />
        <button type='submit' disabled={isPending}>
          {isPending ? 'Processing...' : 'Donate'}
        </button>
      </form>
      {errors.amount && <span>This field is required.</span>}
    </div>
  );
};

export default Donate;
