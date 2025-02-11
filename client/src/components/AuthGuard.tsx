import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';

const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isLoggedIn = useSelector(
    (state: RootState) => state.auth.isAuthenticated,
  );

  if (!isLoggedIn) {
    return <Navigate to='/login' />;
  }

  return <>{children}</>;
};

export default AuthGuard;
