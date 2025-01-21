import PetCard from './/PetCard';
import { usePetQuery } from '../hooks/usePetQuery';
import type { Pet } from '../interfaces/Pet';

const PetList = () => {
  const { data: pets, isLoading,error } = usePetQuery();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching pets.</div>;

  return (
    <div className='flex flex-wrap justify-center'>
      {pets ? (
        pets?.map((pet: Pet) => <PetCard key={pet.id} pet={pet} />)
      ) : (
        <p>No Pets Found</p>
      )}
    </div>
  );
};

export default PetList;
