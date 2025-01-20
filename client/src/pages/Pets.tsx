import PetList from '../components/PetList';

const Pets = () => {
  return (
    <>
      <h2 className='font-cuteCat text-6xl md:text-7xl lg:text-8xl text-center font-bold mt-3 pt-2 mb-2'>
        Meet the Pets!
      </h2>
      <div className='flex flex-wrap justify-center mb-14'>
        <PetList />
      </div>
    </>
  );
};

export default Pets;
