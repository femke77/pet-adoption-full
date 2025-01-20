import { useLogout } from '../hooks/useLogout';

const LogoutButton: React.FC = () => {
  const logout = useLogout();
  const handleClick = () => {
    logout.mutate();
  };

  return (
    <button
      className='flex w-20 mx-10 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
      onClick={handleClick}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
