import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage/LoginFormPage';
import * as sessionActions from './store/session';
import HeroPage from './components/HeroPage/HeroPage';
// import './LoginForm.css';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      {isLoaded && <Outlet />}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HeroPage />
      },
      {
        path: '/login',
        element: <LoginFormPage />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

