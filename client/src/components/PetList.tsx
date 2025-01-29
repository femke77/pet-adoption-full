import PetCard from './/PetCard';
import type { Pet } from '../interfaces/Pet';

// currently all pets show on page load, which might be a drag on performance if there are
// alot of pets, but that could be remedied easily by having it blank until the user clicks
// on dog or cat. Also could do featured or random in place of all. or could just add pagination

interface PetListProps {
  pets: Pet[] | undefined;
}

const PetList = ({ pets }: PetListProps) => {
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
