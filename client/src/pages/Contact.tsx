import InquiryForm from '../components/InquiryForm';

const Contact = () => {
  return (
    <div>
      <h2 className='font-cuteCat text-6xl md:text-7xl lg:text-8xl text-center font-bold mt-3 pt-2 mb-2 px-2'>
        Inquire About a Pet
      </h2>
      <h3 className='font-cuteCat text-center text-3xl md:text-5xl my-5 font-bold px-2'>
        Use this form to contact us for any reason
      </h3>
      <InquiryForm />
    </div>
  );
};
export default Contact;
