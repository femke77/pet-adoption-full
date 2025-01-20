import { useSaveFavorites } from '../hooks/useSaveFavorites';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

interface PetProps {
  id: number;
  name: string;
  image: string;
  breed: string;
  age: number;
  type: string;
  location: string;
  size: string;
  gender: string;
  num_users: number;
  isFavorited: boolean;
}

const SIZE_MAPPINGS = {
  S: 'small',
  M: 'medium',
  L: 'large',
  XL: 'extra large',
} as const;

const PetCard = ({ pet }: { pet: PetProps }) => {
  const loggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );
  const { saveFavorite, error } = useSaveFavorites();
  const { id, name, image, breed, age, type, location, size, num_users, isFavorited } = pet;
  const sizeName =
    type === 'dog' ? SIZE_MAPPINGS[size as keyof typeof SIZE_MAPPINGS] : '';

  const handleFavorite = (id: number) => {
    saveFavorite(id);
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
            // <span
            //   role='button'
            //   onClick={() => handleFavorite(id)}
            //   className='inline-block bg-pink-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'
            // >
            //   Add to favorites
            //   <i className='fa-solid fa-heart fa-2xl text-red-500'></i>
            //   <i className='far fa-heart fa-2xl'></i>
            // </span>
            <div>
              {isFavorited? ( <i className='fa-solid fa-heart fa-2xl text-red-500'></i>):(<i className='far fa-heart fa-2xl' role='button' onClick={() => handleFavorite(id)}  ></i>)}
              </div>
          ) : (
            <Link to='/login'>Login to favorite.</Link>
          )}
          {error &&
            loggedIn &&
            toast.error('There was a problem saving the favorite')}
          <span className='inline-block bg-pink-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2'>
            {num_users > 1 ? `${num_users} favorites` : `${num_users} favorite`}
          </span>
        </div>
      </div>
    </>
  );
};

export default PetCard;
