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
        clearErrors
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

    const onSubmit = async (data: FormInput) => {
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
        <div className="donate-container flex flex-col items-center  px-4 ">
            <h2 className='font-cuteCat text-6xl md:text-7xl lg:text-8xl text-center font-bold pt-3  mb-2 px-2'>
                Donate to the Pets! </h2>
            
                <p className='max-w-sm text-xl mt-6 mb-12 text-center'>Pawsome Pets Adoption is a volunteer-powered 501(c)(3) non-profit. We carefully guard every resource we have to maximize the number of animals we can save. Adoption fees do not cover all of the costs associated with our rescues, and we never want to turn away a dog or cat based on cost alone. Instead, we rely on generous donors to fund our lifesaving efforts and ensure that we can keep rescuing animals in need. Join our mission today and be a part of this incredible journey of compassion and hope.</p>
               
            <form className="mb-32 flex flex-col items-center justify-center" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex space-x-4 mb-8">
                    <label>Amount </label>
                    <p className='text-right'>$</p>
                    <input
                        className='text-right rounded-md border-gray-700 shadow-md focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                        type='text'
                        placeholder='Enter amount '
                        {...register('amount', { required: true })}
                        onClick={() => clearErrors('amount')}
                        onChange={handleAmountChange}
                        onBlur={(e) => setValue('amount', formatAmount(e.target.value))}
                    />
                </div>
                <button
                    className='flex w-24 mx-10justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'

                    type='submit' disabled={isPending}>
                    {isPending ? 'Processing...' : 'Donate'}
                </button>
                {errors.amount && <span className='text-red-500 font-bold mt-8'>This field is required.</span>}
            </form>
        </div>
    );
};

export default Donate;
