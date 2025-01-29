import PetList from '../components/PetList';
import { useSingleUserQuery } from '../hooks/useLoggedInUserQuery';

const Favorites = () => {
  const { data: user, isLoading, isError } = useSingleUserQuery();
  const favoritePets = user?.favoritePets || [];

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  return (
    <div>
      <h2 className='font-cuteCat text-6xl md:text-7xl lg:text-8xl text-center font-bold mt-3 pt-2 mb-2 px-2'>
        My Favorite Pets
      </h2>
      <PetList pets={favoritePets} />
    </div>
  );
};
export default Favorites;
