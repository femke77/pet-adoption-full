import Pets from '../assets/images/sunshine-pets.webp';
import { useWakeUp } from '../hooks/useWakeup';

export default function Main() {
  // render.com server is very slow, try to wake it while user is on the main page.
  useWakeUp();

  return (
    <div className=''>
      <h1 className='font-cuteCat text-6xl md:text-7xl lg:text-8xl text-center font-bold mt-3 pt-2 mb-2'>
        Pawsome Pets Adoption
      </h1>
      <img loading='lazy' src={Pets} alt='Sunshine Pets' />
      <p className='font-cuteCat text-center text-3xl md:text-5xl  my-5 font-bold'>
        Find your new best friend today!
      </p>
      <p className='px-8 md:px-14 mb-14 font-poppins '>
        Adopting a puppy, dog, cat, or kitten from Pawsome Pets is not just
        about finding a pet; it's about welcoming a new family member into your
        home. We are dedicated to ensuring that every animal finds a loving
        forever home, and we take pride in our customized adoption process.
        Whether you have a specific pet in mind or are just beginning to explore
        your options, our knowledgeable Adoption Counselors are here to assist
        you every step of the way. They will help you identify the perfect match
        based on your lifestyle and preferences, ensuring that both you and your
        new pet can thrive together. Thank you for opting to adopt versus
        shopping for a pet with a breeder.
      </p>
      <p></p>
    </div>
  );
}
