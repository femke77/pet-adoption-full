import { useState, useEffect } from 'react';
import { useRegister } from '../hooks/useRegister';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { z } from 'zod';
import type { RegisterSchema } from '../schemas/RegisterSchema';
import registerSchema from '../schemas/RegisterSchema';
import HeartPaw from '../assets/images/heart-paws.png';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { mutateAsync: register } = useRegister();

  const [formState, setFormState] = useState<RegisterSchema>({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    username: '',
  });

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    first_name?: string;
    last_name?: string;
    username?: string;
    message?: string;
  }>({});

  const loggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      registerSchema.parse(formState);
      await register(formState);
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        setErrors({
          message:
            error.response.data.message ||
            'An error occurred processing your request, try again later.',
        });
      }
    }
  };

  useEffect(() => {
    if (loggedIn) {
      navigate('/meet');
    }
  }, [loggedIn]);

  return (
    <div>
      <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <img
            alt='Pawsome Pets Logo - A heart with paw prints inside'
            src={HeartPaw}
            className='mx-auto h-20 w-auto'
          />
          <h2 className='mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900'>
            Register for an account
          </h2>
        </div>
        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label
                htmlFor='email'
                className='block text-sm/6 font-medium text-gray-900'
              >
                Email address
              </label>
              <div className='mt-2'>
                <input
                  className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                  type='text'
                  name='email'
                  required
                  placeholder='john_doe@gmail.com'
                  onChange={(e) => {
                    setFormState({ ...formState, email: e.target.value });
                    setErrors({ ...errors, email: undefined });
                  }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='username'
                className='block text-sm/6 font-medium text-gray-900'
              >
                Username
              </label>
              <div className='mt-2'>
                <input
                  className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                  type='text'
                  placeholder='luckydog123'
                  name='username'
                  required
                  onChange={(e) => {
                    setFormState({ ...formState, username: e.target.value });
                    setErrors({ ...errors, username: undefined });
                  }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='first_name'
                className='block text-sm/6 font-medium text-gray-900'
              >
                First Name
              </label>
              <div className='mt-2'>
                <input
                  className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                  type='text'
                  placeholder='Mary'
                  name='first_name'
                  required
                  onChange={(e) => {
                    setFormState({ ...formState, first_name: e.target.value });
                    setErrors({ ...errors, first_name: undefined });
                  }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='last_name'
                className='block text-sm/6 font-medium text-gray-900'
              >
                Last Name
              </label>
              <div className='mt-2'>
                <input
                  className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                  type='text'
                  placeholder='Jones'
                  name='last_name'
                  required
                  onChange={(e) => {
                    setFormState({ ...formState, last_name: e.target.value });
                    setErrors({ ...errors, last_name: undefined });
                  }}
                />
              </div>
            </div>

            <div>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='block text-sm/6 font-medium text-gray-900'
                >
                  Password
                </label>
                <div className='text-sm'>
                  <a
                    href='#'
                    className='font-semibold text-indigo-600 hover:text-indigo-500'
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className='mt-2'>
                <input
                  id='password'
                  type='password'
                  name='password'
                  required
                  placeholder='password'
                  onChange={(e) => {
                    setFormState({ ...formState, password: e.target.value });
                    setErrors({ ...errors, password: undefined });
                  }}
                  autoComplete='current-password'
                  className='block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6'
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Sign in
              </button>
            </div>
          </form>

          <p className='mt-10 text-center text-sm/6 text-gray-500'>
            <Link
              to='/login'
              className='font-semibold text-indigo-600 hover:text-indigo-500'
            >
              Already have an account?{' '}
            </Link>
          </p>
        </div>
        {errors.email && <div>{errors.email}</div>}
        {errors.password && <div>{errors.password}</div>}
        {errors.message && <div>{errors.message}</div>}
      </div>
    </div>
  );
};

export default Register;
