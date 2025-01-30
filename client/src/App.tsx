import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from './state/authSlice';
import { axiosInterceptor } from './utils/axiosConfig';
import { useLogout } from './hooks/useLogout';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CryptoJS from 'crypto-js';
import { useEffect } from 'react';
import Navigation from './components/NavBar';
import Footer from './components/Footer';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const App = () => {
  const logout = useLogout();
  const dispatch = useDispatch();

  useEffect(() => {
    axiosInterceptor(logout.mutate);
  }, []);

  useEffect(() => {
    const data = sessionStorage.getItem('ud');
    if (data) {
      const secretKey = import.meta.env.VITE_SECRET_KEY;
      const bytes = CryptoJS.AES.decrypt(data, secretKey);
      const decryptedUserDetails = JSON.parse(
        bytes.toString(CryptoJS.enc.Utf8),
      );
      dispatch(loginSuccess(decryptedUserDetails));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ToastContainer
        position='top-center'
        transition={Zoom}
        theme='colored'
        autoClose={2500}
      />
      <ReactQueryDevtools />
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default App;
