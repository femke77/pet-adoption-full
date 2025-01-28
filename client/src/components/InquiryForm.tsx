import { useForm } from 'react-hook-form';
import { Description, Field, Fieldset, Input, Label, Legend, Select, Textarea } from '@headlessui/react'
import { classNames } from '../utils/helpers';
import DogEyes from '../assets/images/dog-eyes-sml.jpg';
import DogCat from '../assets/images/cat-on-dog.jpg';
import { useWindowSize } from '../hooks/useWindowSize';

interface FormInput {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    pets: string;
    preferredContact: string;
}

const InquiryForm = () => {
    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm<FormInput>();
    const onSubmit: (data: FormInput) => void = (data: FormInput) => { console.log("onSubmit", data); }
    console.log(errors);
    const { width } = useWindowSize();


    return (
        <div className='flex flex-1 flex-wrap'>
            
            <div className="basis-full md:basis-1/2 lg:basis-1/3">
                {width >= 768 ? <img src={DogCat} alt="Dog and Cat" className="w-full h-auto p-6 object-cover mt-12  " />
                    : <img src={DogEyes} alt="Dog and Cat" className="w-full h-auto p-6 object-cover mt-12  " />}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4 basis-full md:basis-1/2 lg:basis-2/3">
                <Fieldset className="space-y-6 rounded-xl bg-white/5 p-6 sm:p-10">
                    <Legend className="text-base/7 font-semibold text-black">Please provide your details.</Legend>
                    <Field>
                        <Label className="text-sm/6 font-medium text-black">First Name</Label>
                        <Input
                            {...register("firstName", { required: true, maxLength: 80 })}
                            className={classNames(
                                'outline-2 mt-3 block w-full rounded-lg border-none bg-gray-200 py-1.5 px-3 text-sm/6 text-black',
                                'focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25'
                            )}
                        />
                    </Field>
                </Fieldset>
                {/* <input type="text" placeholder="First name" onClick={()=>clearErrors("firstName")} {...register("firstName", { required: true, maxLength: 80 })} /> */}
                <input type="text" placeholder="Last name" onClick={() => clearErrors("lastName")} {...register("lastName", { required: true, maxLength: 100 })} />
                <input type="text" placeholder="Email" onClick={() => clearErrors("email")} {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                <input type="tel" placeholder="Mobile number" onClick={() => clearErrors("phoneNumber")} {...register("phoneNumber", { required: true, minLength: 6, maxLength: 12 })} />
                <input type="text" placeholder="Pets You Like" onClick={() => clearErrors("pets")} {...register("pets")} />
                <div className="flex space-x-2">
                    <label htmlFor="email">Email</label>
                    <input {...register("preferredContact", { required: true })} type="radio" value="email" />
                    <label htmlFor="phone">Phone</label>
                    <input {...register("preferredContact", { required: true })} type="radio" value="phone" />
                </div>
                <input type="submit" />
                {errors && Object.keys(errors).map((key) => {
                    let message;
                    switch (key) {
                        case "firstName":
                            message = "First name is required and should be less than 80 characters.";
                            break;
                        case "lastName":
                            message = "Last name is required and should be less than 100 characters.";
                            break;
                        case "email":
                            message = "A valid email is required.";
                            break;
                        case "phoneNumber":
                            message = "Phone number is required and should be between 6 and 12 characters.";
                            break;
                        case "preferredContact":
                            message = "Preferred contact method is required.";
                            break;
                        default:
                            message = `${key} is required.`;
                    }
                    return <p className="text-red-500" key={key}>{message}</p>;
                })}

            </form>

        </div>

    );
}

export default InquiryForm;