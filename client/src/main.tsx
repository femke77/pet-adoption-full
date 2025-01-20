import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { StrictMode } from 'react';
import App from './App.tsx';
import Main from './pages/Main.tsx';
import Error from './pages/Error.tsx';
import AuthGuard from './components/AuthGuard.tsx';
import { Provider } from 'react-redux';
import { store } from './state/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Test from './pages/Test.tsx';
import Login from './pages/Login.tsx';
import Register from './pages/Register.tsx';
import Adopt from './pages/Adopt.tsx';
import Pets from './pages/Pets.tsx';
const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/adopt',
        element: <Adopt />,
      },
      {
        path: '/meet',
        element: <Pets />,
      },
      {
        path: '/test',
        element: (
          <AuthGuard>
            <Test />
          </AuthGuard>
        ),
      },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Provider>
    </StrictMode>,
  );
}
