import { useForm } from 'react-hook-form';
import {
  Field,
  Fieldset,
  Input,
  Label,
  Legend,
  Textarea,
} from '@headlessui/react';
import { classNames } from '../utils/helpers';
import DogEyes from '../assets/images/dog-eyes-sml.jpg';
import DogCat from '../assets/images/cat-on-dog.jpg';
import { useWindowSize } from '../hooks/useWindowSize';
import { useState } from 'react';

interface FormInput {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  pets: string;
  preferredContact: string;
}

const InquiryForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset,
  } = useForm<FormInput>();
  const [sent, setSent] = useState(false);

  const onSubmit = (data: FormInput) => {
    // not really sending this anywhere yet. probably set up emailjs
    console.log('onSubmit', data);
    setSent(true);
    setTimeout(() => {
      setSent(false);
    }, 5000);
    reset();
  };

  const { width } = useWindowSize();

  return (
    <div className='flex flex-1 flex-wrap'>
      <div className='basis-full md:basis-1/3 '>
        {width >= 768 ? (
          <img
            src={DogCat}
            alt='Dog and Cat'
            className='w-full h-auto p-6 object-cover mt-12  '
          />
        ) : (
          <img
            src={DogEyes}
            alt='Dog and Cat'
            className='w-full h-auto p-6 object-cover  '
          />
        )}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col  basis-full md:basis-2/3 '
      >
        <Fieldset className='space-y-2 rounded-xl bg-white/5 p-6 sm:p-10'>
          <Legend className='text-base/7 font-semibold text-black'>
            Please provide your details.
          </Legend>

          <Field>
            <Label className='text-sm/6 font-medium text-black'>
              First Name
            </Label>
            <Input
              {...register('firstName', { required: true, maxLength: 80 })}
              onClick={() => clearErrors('firstName')}
              className={classNames(
                'outline outline-gray-400 mt-3 block w-full rounded-lg border-none bg-gray-200 py-1.5 px-3 text-sm/6 text-black',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25',
              )}
            />
          </Field>
          <Field>
            <Label className='text-sm/6 font-medium text-black'>
              Last Name
            </Label>
            <Input
              {...register('lastName', { required: true, maxLength: 100 })}
              onClick={() => clearErrors('lastName')}
              className={classNames(
                'outline outline-gray-400 mt-3 block w-full rounded-lg border-none bg-gray-200 py-1.5 px-3 text-sm/6 text-black',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25',
              )}
            />
          </Field>
          <Field>
            <Label className='text-sm/6 font-medium text-black'>Email</Label>
            <Input
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
              onClick={() => clearErrors('email')}
              className={classNames(
                'outline outline-gray-400 mt-3 block w-full rounded-lg border-none bg-gray-200 py-1.5 px-3 text-sm/6 text-black',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25',
              )}
            />
          </Field>
          <Field>
            <Label className='text-sm/6 font-medium text-black'>
              Phone Number
            </Label>
            <Input
              {...register('phoneNumber', { required: true })}
              onClick={() => clearErrors('phoneNumber')}
              className={classNames(
                'outline outline-gray-400 mt-3 block w-full rounded-lg border-none bg-gray-200 py-1.5 px-3 text-sm/6 text-black',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25',
              )}
            />
          </Field>
          <Field>
            <Label className='text-sm/6 font-medium text-black'>
              Pets You Like, Questions, or Comments
            </Label>
            <Textarea
              {...register('pets')}
              onClick={() => clearErrors('pets')}
              className={classNames(
                'outline outline-gray-400 mt-3 block w-full rounded-lg border-none bg-gray-200 py-1.5 px-3 text-sm/6 text-black',
                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25',
              )}
            ></Textarea>
          </Field>
        </Fieldset>

        <div className='flex items-center justify-between px-6 mb-2'>
          <div className='flex space-x-2'>
            <label htmlFor='email'>Email</label>
            <input
              {...register('preferredContact', { required: true })}
              type='radio'
              value='email'
            />
            <label htmlFor='phone'>Phone</label>
            <input
              {...register('preferredContact', { required: true })}
              type='radio'
              value='phone'
            />
          </div>

          <input
            type='submit'
            className='flex w-20 my-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          />
        </div>
        <div className='px-6 pb-4'>
          {sent && (
            <p className='text-green-600 font-bold'>
              Your inquiry has been sent.
            </p>
          )}
          {errors &&
            Object.keys(errors).map((key) => {
              let message;
              switch (key) {
                case 'firstName':
                  message =
                    'First name is required and should be less than 80 characters.';
                  break;
                case 'lastName':
                  message =
                    'Last name is required and should be less than 100 characters.';
                  break;
                case 'email':
                  message = 'A valid email is required.';
                  break;
                case 'phoneNumber':
                  message = 'Phone number is required.';
                  break;
                case 'preferredContact':
                  message = 'Preferred contact method is required.';
                  break;
                default:
                  message = `${key} is required.`;
              }
              return (
                <p className='text-red-500' key={key}>
                  {message}
                </p>
              );
            })}
        </div>
      </form>
    </div>
  );
};

export default InquiryForm;
