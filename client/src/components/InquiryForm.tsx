import { useForm } from 'react-hook-form';



const InquiryForm = () => {
    const { register, handleSubmit, formState: { errors }, clearErrors } = useForm();
    const onSubmit = (data: any) => { console.log("onSubmit", data); }
    console.log(errors);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4 m-10">
            <input type="text" placeholder="First name" onClick={()=>clearErrors("First Name")} {...register("First Name", { required: true, maxLength: 80 })} />
            <input type="text" placeholder="Last name" {...register("Last Name", { required: true, maxLength: 100 })} />
            <input type="text" placeholder="Email" {...register("Email", { required: true, pattern: /^\S+@\S+$/i })} />
            <input type="tel" placeholder="Mobile number" {...register("Phone Number", { required: true, minLength: 6, maxLength: 12 })} />
            <input type="text" placeholder="Pets You Like" {...register("pets")} />
            <div className="flex space-x-2">
                <label htmlFor="email">Email</label>
                <input {...register("Preferred Contact", { required: true })} type="radio" value="email" />
                <label htmlFor="phone">Phone</label>
                <input {...register("Preferred Contact", { required: true })} type="radio" value="phone" />
            </div>
            <input type="submit" />
            {errors && Object.keys(errors).map((key) => {
                return <p className="text-red-600" key={key}>{key} is required.</p>

            })}

        </form>
    );
}

export default InquiryForm;