import { useSaveFavorites } from '../hooks/useSaveFavorites';
import { useRemoveFavorites } from '../hooks/useRemoveFavorites';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { Pet } from '../interfaces/Pet';

const SIZE_MAPPINGS = {
  S: 'small',
  M: 'medium',
  L: 'large',
  XL: 'extra large',
} as const;

const PetCard = ({ pet }: { pet: Pet }) => {
  const loggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const { saveFavorite, error } = useSaveFavorites();
  const { removeFavorite } = useRemoveFavorites();
  const {
    id,
    name,
    image,
    breed,
    age,
    type,
    location,
    size,
    num_users,
    isFavorited,
  } = pet;

  const sizeName =
    type === 'dog' ? SIZE_MAPPINGS[size as keyof typeof SIZE_MAPPINGS] : '';

  const handleFavorite = (id: number) => {
    saveFavorite(id);
  };

  const handleRemoveFavorite = (id: number) => {
    removeFavorite(id);

  };

  return (
    <>
      <div className='w-96 rounded overflow-hidden shadow-lg m-3'>
        <div className='w-full h-48 flex justify-center items-center '>
          <img
            src={image ? image : 'https://via.placeholder.com/300'}
            className='w-64 h-48 object-contain'
            alt={`${name} the ${breed} ${type}`}
            loading='lazy'
          />
        </div>
        <div className='px-6 py-4'>
          <div className='font-bold text-xl mb-2'>{name}</div>
          <p className='text-gray-700 text-base'>
            {age} year old {breed} from {location}.{' '}
            {type === 'dog' ? <span> Dog's size is {sizeName}.</span> : null}
          </p>
        </div>
        <div className='px-6 pt-4 pb-2 flex justify-between'>
          {loggedIn ? (
            <div>
              {isFavorited ? (
                <i
                  className='fa-solid fa-heart fa-2xl text-red-500'
                  role='button'
                  onClick={() => handleRemoveFavorite(id)}
                ></i>
              ) : (
                <i
                  className='far fa-heart fa-2xl'
                  role='button'
                  onClick={() => handleFavorite(id)}
                ></i>
              )}
            </div>
          ) : (
            <Link to='/login'>Login to favorite.</Link>
          )}
          {error &&
            loggedIn &&
            toast.error('There was a problem saving the favorite.')}
          <span className='inline-block bg-pink-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
            {(num_users !== 1) ? `${num_users} favorites` : `${num_users} favorite`}
          </span>
        </div>
      </div>
    </>
  );
};

export default PetCard;
