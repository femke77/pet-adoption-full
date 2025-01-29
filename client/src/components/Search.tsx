import { useState } from 'react';
import { usePetQuery } from '../hooks/usePetQuery';
import PetList from './PetList';
import { classNames } from '../utils/helpers';

const PetSelection = () => {
  const [selected, setSelected] = useState<string>('');

  const { data: pets, isLoading, error } = usePetQuery(selected);

  const handleDogOrCat = (pet: string) => {
    if (selected === pet) {
      setSelected('');
    } else {
      setSelected(pet);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching pets.</div>;

  return (
    <div>
      <div className='flex justify-center space-x-4'>
        <button
          onClick={() => handleDogOrCat('Dog')}
          className={classNames(
            `px-4 py-2 rounded outline transition-colors duration-200 ${
              selected === 'Dog'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-black'
            }`,
          )}
        >
          Dog
        </button>
        <button
          onClick={() => handleDogOrCat('Cat')}
          className={classNames(
            `px-4 py-2 rounded outline transition-colors duration-200 ${
              selected === 'Cat'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-black'
            }`,
          )}
        >
          Cat
        </button>
      </div>
      <PetList pets={pets} />
    </div>
  );
};

export default PetSelection;
